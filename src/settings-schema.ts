import type { LuminaConfig } from './client/defaults.ts'
import { DEFAULT_CONFIG } from './client/defaults.ts'
import { importDsh } from './host-resolve.ts'

export type { LuminaConfig }
export { DEFAULT_CONFIG }

export const LUMINA_NS = 'lumina-tarot'

export async function installLuminaSettings(
  ctx: { inject: Function },
  live: { current: LuminaConfig },
): Promise<boolean> {
  const settings = await importDsh<{
    installSettingsSection: Function
    settingsNamespace: (value: string) => unknown
  }>('@deepseek-ai/dsh-settings', 'lib/index.js')
  const schemastery = await importDsh<{ default: { object: Function; union: Function; boolean: Function; number: Function } }>(
    '@deepseek-ai/schemastery',
    'lib/index.mjs',
  )
  const z = schemastery?.default
  if (!settings?.installSettingsSection || !settings.settingsNamespace || !z) {
    console.warn('[lumina-tarot] settings packages not found; using composition defaults')
    return false
  }

  const Config = z.object({
    theme: z.union(['mystic', 'minimal', 'nature']).default('mystic'),
    followDshLocale: z.boolean().default(true),
    locale: z.union(['zh-CN', 'en-US']).default('zh-CN'),
    cardArtTheme: z.union(['minimal', 'rws', 'aquatic']).default('minimal'),
    cardBack: z.union(['classic', 'celestial', 'sacred', 'floral', 'eye']).default('classic'),
    minorStyle: z.union(['symbol', 'geometric']).default('symbol'),
    animationLevel: z.union(['off', 'lite', 'full']).default('full'),
    showFloatCard: z.boolean().default(true),
    floatX: z.number().min(0).max(1).default(0.92),
    floatY: z.number().min(0).max(1).default(0.82),
    panelOpacity: z.number().min(0.2).max(0.8).default(0.5),
    defaultSpread: z.union(['single', 'three-card', 'cross', 'celtic-lite']).default('three-card'),
    reversedRate: z.number().min(0).max(1).default(0.35),
    historyLimit: z.number().step(1).min(1).max(500).default(100),
  })

  let source = () => live.current
  settings.installSettingsSection(ctx, settings.settingsNamespace(LUMINA_NS), Config, DEFAULT_CONFIG, {
    setSource: (current: () => LuminaConfig) => {
      source = current
    },
    onChange: () => {
      live.current = { ...DEFAULT_CONFIG, ...source() }
    },
  })
  return true
}
