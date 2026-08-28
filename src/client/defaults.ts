import type {
  AnimationLevel,
  CardArtTheme,
  CardBackVariant,
  LocaleId,
  MinorStyle,
  SpreadId,
  ThemeId,
} from '../domain/types.ts'

export interface LuminaConfig {
  theme: ThemeId
  followDshLocale: boolean
  locale: LocaleId
  cardArtTheme: CardArtTheme
  cardBack: CardBackVariant
  minorStyle: MinorStyle
  animationLevel: AnimationLevel
  showFloatCard: boolean
  floatX: number
  floatY: number
  panelOpacity: number
  defaultSpread: SpreadId
  reversedRate: number
  historyLimit: number
}

export const DEFAULT_CONFIG: LuminaConfig = {
  theme: 'mystic',
  followDshLocale: true,
  locale: 'zh-CN',
  cardArtTheme: 'minimal',
  cardBack: 'classic',
  minorStyle: 'symbol',
  animationLevel: 'full',
  showFloatCard: true,
  floatX: 0.92,
  floatY: 0.82,
  panelOpacity: 0.8,
  defaultSpread: 'three-card',
  reversedRate: 0.35,
  historyLimit: 100,
}

export const CARD_W = 48
export const CARD_H = Math.round(48 * (8.6 / 5))
export const DRAG_THRESHOLD = 6

export const SPREAD_OPTIONS: Array<{ id: SpreadId; label: string }> = [
  { id: 'single', label: '单张指引' },
  { id: 'three-card', label: '三牌时间线' },
  { id: 'cross', label: '十字' },
  { id: 'celtic-lite', label: '凯尔特精简' },
]

export const ART_OPTIONS: Array<{ id: CardArtTheme; label: string }> = [
  { id: 'minimal', label: '极简' },
  { id: 'rws', label: '经典韦特' },
  { id: 'aquatic', label: '水彩重绘' },
]

export const THEME_OPTIONS: Array<{ id: ThemeId; label: string }> = [
  { id: 'mystic', label: '神秘暗黑' },
  { id: 'minimal', label: '现代极简' },
  { id: 'nature', label: '疗愈自然' },
]

export const BACK_OPTIONS: Array<{ id: CardBackVariant; label: string }> = [
  { id: 'classic', label: '经典' },
  { id: 'celestial', label: '星图' },
  { id: 'sacred', label: '神圣几何' },
  { id: 'floral', label: '生命之花' },
  { id: 'eye', label: '神秘之眼' },
]

export const ANIMATION_OPTIONS: Array<{ id: AnimationLevel; label: string; desc: string }> = [
  { id: 'off', label: '关闭', desc: '无洗牌动画 · 适合低端机' },
  { id: 'lite', label: '轻量', desc: '简化动画 · 平衡' },
  { id: 'full', label: '完整', desc: '沉浸洗牌 · 完整体验' },
]

export const MINOR_OPTIONS: Array<{ id: MinorStyle; label: string; desc: string }> = [
  { id: 'symbol', label: '符号系', desc: '杖 · 杯 · 剑 · 五芒钱' },
  { id: 'geometric', label: '几何系', desc: '线 · 环 · 三角 · 菱形' },
]

export function radiusFor(theme: ThemeId): number {
  if (theme === 'mystic') return 2
  if (theme === 'nature') return 8
  return 5
}

export function minShuffleMs(level: AnimationLevel): number {
  if (level === 'full') return 1800
  if (level === 'lite') return 700
  return 120
}

export function effectiveCardBack(config: LuminaConfig): CardBackVariant {
  if (config.cardArtTheme === 'minimal') return config.cardBack
  return 'classic'
}

export function mergeConfig(value: Partial<LuminaConfig> | undefined): LuminaConfig {
  return { ...DEFAULT_CONFIG, ...(value ?? {}) }
}
