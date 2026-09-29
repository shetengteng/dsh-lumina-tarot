import type { LuminaConfig } from './client/defaults.ts'
import { DEFAULT_CONFIG } from './client/defaults.ts'
import { importDsh } from './host-resolve.ts'

export type { LuminaConfig }
export { DEFAULT_CONFIG }

export const LUMINA_NS = 'lumina-tarot'

type SettingsScope = {
  get: () => LuminaConfig
  watch: (listener: () => void) => () => void
}

type SettingsService = {
  register: (
    ns: string,
    schema: unknown,
    options: { base: LuminaConfig; applies?: 'live' | 'restart' },
  ) => SettingsScope
}

export async function installLuminaSettings(
  ctx: { inject: Function },
  live: { current: LuminaConfig },
): Promise<boolean> {
  const schemastery = await importDsh<{ default: { object: Function; union: Function; boolean: Function; number: Function } }>(
    '@deepseek-ai/schemastery',
    'lib/index.mjs',
  )
  const z = schemastery?.default
  if (!z) {
    console.warn('[lumina-tarot] schemastery not found; using composition defaults')
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
    panelOpacity: z.number().min(0.2).max(0.8).default(0.8),
    defaultSpread: z.union(['single', 'three-card', 'cross', 'celtic-lite']).default('three-card'),
    reversedRate: z.number().min(0).max(1).default(0.35),
    historyLimit: z.number().step(1).min(1).max(500).default(100),
  })

  ctx.inject(['settings'], (scoped: { settings: SettingsService; effect: (setup: () => () => void) => void }) => {
    if (typeof scoped.settings?.register !== 'function') {
      console.warn('[lumina-tarot] settings.register missing; using composition defaults')
      return
    }
    const scope = scoped.settings.register(LUMINA_NS, Config, { base: DEFAULT_CONFIG, applies: 'live' })
    let source = () => scope.get()
    const apply = () => {
      live.current = { ...DEFAULT_CONFIG, ...source() }
    }
    scoped.effect(() => () => {
      source = () => DEFAULT_CONFIG
      apply()
    })
    apply()
    scope.watch(apply)
  })
  return true
}
