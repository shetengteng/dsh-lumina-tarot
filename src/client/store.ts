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
  set: (field: string, value: unknown) => Promise<void>
  unset: (field: string) => Promise<void>
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

export async function persistLuminaField(
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
  patchLuminaConfig(partial)
  writesInFlight += 1
  try {
    for (const [field, value] of Object.entries(partial)) {
      try {
        await scope?.set?.(field, value)
      } catch (error) {
        console.warn('[lumina-tarot] settings write skipped', field, error)
      }
    }
  } finally {
    writesInFlight -= 1
    if (writesInFlight === 0) {
      const snap = scope?.getSnapshot?.()
      hydrateLuminaConfig({ ...snap?.value, ...partial })
    }
  }
}

export async function unsetLuminaField(scope: SettingsHandle | undefined, field: keyof LuminaConfig): Promise<void> {
  try {
    await scope?.unset?.(String(field))
  } catch (error) {
    console.warn('[lumina-tarot] settings unset skipped', field, error)
  }
}
