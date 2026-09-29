import {
  Config,
  DEFAULT_CONFIG,
  resolveLuminaConfig,
} from './settings-schema.ts'
import { registerLuminaCommands, type LuminaState } from './commands.ts'
import { createHistory } from './history.ts'
import { installDeckStatic } from './host/deck-static.ts'
import { registerLuminaPrompt, registerLuminaSkill } from './skill.ts'
import { registerLuminaTools } from './tools.ts'

export { Config }
export const name = 'dsh-lumina-tarot'

type SettingsForms = {
  configure: (presentation: { auto?: boolean }, owner?: unknown) => () => void
}

type HostContext = {
  fiber?: unknown
  logger?: { info: (msg: string) => void }
  on?: (event: string, listener: () => void) => () => boolean
  inject: (deps: string[], callback: (scoped: {
    settings: SettingsForms
    effect: (setup: () => (() => void) | void) => unknown
  }) => void) => void
}

export function apply(ctx: HostContext, config?: Record<string, unknown>): void {
  const state: LuminaState = {
    current: resolveLuminaConfig(config),
    lastReading: null,
    history: createHistory(),
  }

  const updateConfig = () => {
    state.current = resolveLuminaConfig(config)
  }
  ctx.on?.('loader/volatile-update', updateConfig)

  console.log('[lumina-tarot] host loaded')
  ctx.logger?.info('[lumina-tarot] host loaded')

  ctx.inject(['settings'], (scoped) => {
    scoped.effect(() => scoped.settings.configure({ auto: false }, ctx.fiber))
  })

  ctx.inject(['commands'], (scoped) => {
    registerLuminaCommands(scoped as { commands: { register: (def: unknown) => () => void } }, state)
  })

  ctx.inject(['tools'], (scoped) => {
    registerLuminaTools(scoped as { tools: { register: (def: unknown) => () => void } }, state)
  })

  ctx.inject(['skills'], (scoped) => {
    registerLuminaSkill(scoped as { skills?: { register: (skill: unknown) => () => void } })
  })

  ctx.inject(['systemPrompt'], (scoped) => {
    registerLuminaPrompt(scoped as { systemPrompt?: { section: (section: unknown) => () => void } })
  })

  ctx.inject(['webServer'], (scoped) => {
    installDeckStatic(scoped as Parameters<typeof installDeckStatic>[0])
  })
}
