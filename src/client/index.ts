import { createSettingsSection } from './settings/Section.tsx'
import { ensureStyles } from './styles.ts'
import {
  bindLuminaScope,
  luminaConfig,
  type SettingsHandle,
} from './store.ts'
import { resolveUiLocale, t, type LocaleHandle } from './i18n.ts'
import { installLuminaNavIcon } from './nav-icon.ts'
import { LuminaDrawView } from './toolview.tsx'
import { LuminaCommandView } from './commandview.tsx'
import { createLuminaOverlay } from './overlay/LuminaOverlay.tsx'
import { bindSessionActions, type SessionsHandle, type WorkspacesHandle } from './overlay/session-source.ts'

export const name = 'dsh-lumina-tarot'
export const inject = ['slots', 'remote', 'remote.commands', 'settingsScope', 'locale', 'sessions', 'workspaces']

export function apply(ctx: {
  slots: {
    inject: (name: string, factory: () => unknown) => void
    register: (meta: Record<string, unknown>, component: unknown) => unknown
  }
  effect?: (setup: () => (() => void) | void) => void
  settingsScope?: { bind: (spec: { namespace: string }) => SettingsHandle }
  locale?: LocaleHandle
  remote?: { commands?: { execute: (sessionId: string, line: string, images: readonly unknown[], signal?: AbortSignal) => Promise<unknown> } }
  sessions?: SessionsHandle
  workspaces?: WorkspacesHandle
}): void {
  ensureStyles()
  console.log('[lumina-tarot] client loaded')

  const scope = ctx.settingsScope?.bind?.({ namespace: 'lumina-tarot' }) as SettingsHandle | undefined
  bindLuminaScope(scope)

  const sectionLabel = () => t(resolveUiLocale(luminaConfig(), ctx.locale?.getSnapshot?.()?.active), 'pageTitle')
  if (typeof ctx.effect === 'function') {
    ctx.effect(() => installLuminaNavIcon(sectionLabel, ctx.locale))
  } else {
    installLuminaNavIcon(sectionLabel, ctx.locale)
  }

  ctx.slots.inject('shell.overlay', () => ctx.slots.register({
    name: 'shell.overlay',
    id: 'dsh-lumina-tarot',
    order: 1000,
    registrant: 'dsh-lumina-tarot',
    inject: () => bindSessionActions(ctx),
  }, createLuminaOverlay(ctx, scope)))

  ctx.slots.inject('tool.call.toolview', () => {
    ctx.slots.register({
      name: 'tool.call.toolview',
      key: 'lumina_draw',
      registrant: 'dsh-lumina-tarot',
    }, LuminaDrawView)
    return ctx.slots.register({
      name: 'tool.call.toolview',
      key: 'lumina_today',
      registrant: 'dsh-lumina-tarot',
    }, LuminaDrawView)
  })

  ctx.slots.inject('conversation.chat.commandview', () => ctx.slots.register({
    name: 'conversation.chat.commandview',
    key: 'lumina',
    registrant: 'dsh-lumina-tarot',
  }, LuminaCommandView))

  ctx.slots.inject('settings.section', () => ctx.slots.register({
    name: 'settings.section',
    id: 'lumina-tarot',
    order: 70,
    label: () => sectionLabel(),
    registrant: 'dsh-lumina-tarot',
  }, createSettingsSection(scope, ctx.locale, ctx.remote)))
}
