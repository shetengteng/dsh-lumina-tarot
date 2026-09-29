import z from '@deepseek-ai/schemastery'
import type { LuminaConfig } from './client/defaults.ts'
import { DEFAULT_CONFIG, mergeConfig } from './client/defaults.ts'

export type { LuminaConfig }
export { DEFAULT_CONFIG }

export const LUMINA_NS = 'lumina-tarot'

/**
 * Live settings exposed through DSH's 0.1.7 configuration-form projection.
 * Every field is volatile so edits update the running Host fiber without a restart.
 */
export const Config = z.object({
  theme: z.union(['mystic', 'minimal', 'nature']).default('mystic').volatile(),
  followDshLocale: z.boolean().default(true).volatile(),
  locale: z.union(['zh-CN', 'en-US']).default('zh-CN').volatile(),
  cardArtTheme: z.union(['minimal', 'rws', 'aquatic']).default('minimal').volatile(),
  cardBack: z.union(['classic', 'celestial', 'sacred', 'floral', 'eye']).default('classic').volatile(),
  minorStyle: z.union(['symbol', 'geometric']).default('symbol').volatile(),
  animationLevel: z.union(['off', 'lite', 'full']).default('full').volatile(),
  showFloatCard: z.boolean().default(true).volatile(),
  floatX: z.number().min(0).max(1).default(0.92).volatile(),
  floatY: z.number().min(0).max(1).default(0.82).volatile(),
  panelOpacity: z.number().min(0.2).max(0.8).default(0.8).volatile(),
  defaultSpread: z.union(['single', 'three-card', 'cross', 'celtic-lite']).default('three-card').volatile(),
  reversedRate: z.number().min(0).max(1).default(0.35).volatile(),
  historyLimit: z.number().step(1).min(1).max(500).default(100).volatile(),
})

type VolatileValue = { get: () => unknown }

function unwrap(value: unknown): unknown {
  if (value && typeof value === 'object' && 'get' in value && typeof (value as VolatileValue).get === 'function') {
    return (value as VolatileValue).get()
  }
  return value
}

/** Read the immutable snapshots passed to a Host plugin's apply(ctx, config). */
export function resolveLuminaConfig(config?: Record<string, unknown>): LuminaConfig {
  const value = Object.fromEntries(
    Object.entries(config ?? {}).map(([key, item]) => [key, unwrap(item)]),
  ) as Partial<LuminaConfig>
  return mergeConfig(value)
}
