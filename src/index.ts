import { DEFAULT_CONFIG, installLuminaSettings } from './settings-schema.ts'
import { registerLuminaCommands, type LuminaState } from './commands.ts'
import { createHistory } from './history.ts'
import { installDeckStatic } from './host/deck-static.ts'
import { registerLuminaPrompt, registerLuminaSkill } from './skill.ts'
import { registerLuminaTools } from './tools.ts'

export const name = 'dsh-lumina-tarot'

export function apply(ctx: {
  logger?: { info: (msg: string) => void }
  inject: (deps: string[], callback: (scoped: unknown) => void) => void
}): void {
  const state: LuminaState = {
    current: { ...DEFAULT_CONFIG },
    lastReading: null,
    history: createHistory(),
  }

  console.log('[lumina-tarot] host loaded')
  ctx.logger?.info('[lumina-tarot] host loaded')

  void installLuminaSettings(ctx, state).catch((error) => {
    console.warn('[lumina-tarot] settings not mounted', error)
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
