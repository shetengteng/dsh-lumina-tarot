export type ThemeId = 'mystic' | 'minimal' | 'nature'
export type CardBackVariant = 'classic' | 'celestial' | 'sacred' | 'floral' | 'eye'
export type CardArtTheme = 'minimal' | 'rws' | 'aquatic'
export type AnimationLevel = 'off' | 'lite' | 'full'
export type SpreadId = 'single' | 'three-card' | 'cross' | 'celtic-lite'
export type MinorStyle = 'symbol' | 'geometric'
export type LocaleId = 'zh-CN' | 'en-US'
export type Arcana = 'major' | 'minor'
export type CardSuit = 'wands' | 'cups' | 'swords' | 'pentacles'
export type CardRank =
  | 'ace' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10'
  | 'page' | 'knight' | 'queen' | 'king'

export interface SpreadPosition {
  index: number
  name: string
  role: string
}

export interface SpreadDef {
  id: SpreadId
  name: string
  subtitle: string
  description: string
  count: number
  positions: SpreadPosition[]
}

export interface DrawnCard {
  cardId: string
  reversed: boolean
  positionIndex: number
}

export interface ReadingRecord {
  id: string
  createdAt: number
  spreadId: string
  question?: string
  mood?: string
  cards: DrawnCard[]
  note?: string
}

export interface CardFace {
  meaning: string
  love: string
  career: string
  advice: string
}

export interface TarotCardDef {
  id: string
  number: number
  name: string
  nameEn: string
  arcana: Arcana
  suit?: CardSuit
  rank?: CardRank
  keywords: string[]
  symbol: string
  summary: string
  upright: CardFace
  reversed: CardFace
  element?: string
  planet?: string
  zodiac?: string
}

export interface ReadingCardView extends DrawnCard {
  positionName: string
  positionRole: string
  name: string
  nameEn: string
  symbol: string
  number: number
  arcana: Arcana
  suit?: CardSuit
  rank?: CardRank
  keywords: string[]
  summary: string
  meaning: string
  love: string
  career: string
  advice: string
}

export interface ReadingPayload {
  id: string
  createdAt: number
  spreadId: SpreadId
  spreadName: string
  kind: 'draw' | 'today'
  question?: string
  cards: ReadingCardView[]
}

export interface HistoryListCard {
  cardId: string
  name: string
  nameEn: string
  reversed: boolean
  positionIndex: number
  positionName: string
  positionRole: string
  symbol: string
  number: number
  arcana: Arcana
  suit?: CardSuit
  rank?: CardRank
  keywords: string[]
  summary: string
  meaning: string
}

export interface HistoryListItem {
  id: string
  createdAt: number
  spreadId: string
  spreadName: string
  question?: string
  cards: HistoryListCard[]
}

export interface ToolCardView {
  cardId: string
  name: string
  nameEn: string
  symbol: string
  number: number
  arcana: Arcana
  suit?: CardSuit
  rank?: CardRank
  reversed: boolean
  positionIndex: number
  positionName: string
  positionRole: string
  keywords: string[]
  meaning: string
}

export interface ToolReadingView {
  id: string
  createdAt: number
  spreadId: SpreadId
  spreadName: string
  kind: 'draw' | 'today'
  question?: string
  cards: ToolCardView[]
}
