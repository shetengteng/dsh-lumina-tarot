import { DEFAULT_CONFIG, mergeConfig, type LuminaConfig } from './defaults.ts'

let current: LuminaConfig = { ...DEFAULT_CONFIG }
const listeners = new Set<() => void>()
let writesInFlight = 0
let echo: Partial<LuminaConfig> = {}

function emit(): void {
  for (const listener of listeners) listener()
}

function pruneEcho(snap: Partial<LuminaConfig>): void {
  for (const key of Object.keys(echo) as Array<keyof LuminaConfig>) {
    const local = echo[key]
    const remote = snap[key]
    if (remote === local || (remote === undefined && local === DEFAULT_CONFIG[key])) delete echo[key]
  }
}

export function luminaConfig(): LuminaConfig {
  return current
}

export function watchLuminaConfig(listener: () => void): () => void {
  listeners.add(listener)
  return () => {
    listeners.delete(listener)
  }
}

export function hydrateLuminaConfig(value: Partial<LuminaConfig> | undefined): void {
  current = mergeConfig({ ...value, ...echo })
  emit()
}

export function patchLuminaConfig(partial: Partial<LuminaConfig>): void {
  echo = { ...echo, ...partial }
  current = { ...current, ...partial }
  emit()
}

export type SettingsHandle = {
  getSnapshot: () => {
    status?: 'loading' | 'ready' | 'unavailable'
    value?: Partial<LuminaConfig>
    writable?: boolean
  }
  subscribe: (listener: () => void) => () => void
  set: (field: string, value: unknown) => Promise<boolean>
  unset: (field: string) => Promise<boolean>
}

export function bindLuminaScope(scope: SettingsHandle | undefined): () => void {
  if (!scope?.subscribe) return () => undefined
  const sync = () => {
    if (writesInFlight > 0) return
    const snap = scope.getSnapshot()
    if (!snap?.value) return
    pruneEcho(snap.value)
    hydrateLuminaConfig(snap.value)
  }
  sync()
  return scope.subscribe(sync)
}

export function persistLuminaField(
  scope: SettingsHandle | undefined,
  field: keyof LuminaConfig,
  value: LuminaConfig[keyof LuminaConfig],
): Promise<void> {
  return persistLuminaPatch(scope, { [field]: value } as Partial<LuminaConfig>)
}

export async function persistLuminaPatch(
  scope: SettingsHandle | undefined,
  partial: Partial<LuminaConfig>,
): Promise<void> {
  if (!scope?.set) {
    console.warn('[lumina-tarot] settings form unavailable; change not saved')
    return
  }

  const previous = current
  const previousEcho = echo
  patchLuminaConfig(partial)
  writesInFlight += 1
  let accepted = true
  try {
    for (const [field, value] of Object.entries(partial)) {
      try {
        const result = await scope.set(field, value)
        if (result !== true) accepted = false
      } catch (error) {
        accepted = false
        console.warn('[lumina-tarot] settings write skipped', field, error)
      }
    }
  } finally {
    writesInFlight -= 1
    if (writesInFlight === 0) {
      const snap = scope.getSnapshot?.()
      if (snap?.value) {
        pruneEcho(snap.value)
        hydrateLuminaConfig(snap.value)
      } else if (!accepted) {
        echo = previousEcho
        current = previous
        emit()
      }
    }
  }
}

export async function unsetLuminaField(scope: SettingsHandle | undefined, field: keyof LuminaConfig): Promise<void> {
  if (!scope?.unset) {
    console.warn('[lumina-tarot] settings form unavailable; reset not saved')
    return
  }
  try {
    const result = await scope.unset(String(field))
    if (result !== true) {
      const snap = scope.getSnapshot?.()
      if (snap?.value) hydrateLuminaConfig(snap.value)
    }
  } catch (error) {
    console.warn('[lumina-tarot] settings unset skipped', field, error)
    const snap = scope.getSnapshot?.()
    if (snap?.value) hydrateLuminaConfig(snap.value)
  }
}
