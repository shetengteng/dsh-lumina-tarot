import type { CardRank, CardSuit, ReadingPayload, SpreadId, ToolCardView, ToolReadingView } from './types.ts'

export type { ToolCardView, ToolReadingView }

const SPREADS: SpreadId[] = ['single', 'three-card', 'cross', 'celtic-lite']

export function toToolReading(reading: ReadingPayload): ToolReadingView {
  return {
    id: reading.id,
    createdAt: reading.createdAt,
    spreadId: reading.spreadId,
    spreadName: reading.spreadName,
    kind: reading.kind,
    question: reading.question,
    cards: reading.cards.map((card) => ({
      cardId: card.cardId,
      name: card.name,
      nameEn: card.nameEn,
      symbol: card.symbol,
      number: card.number,
      arcana: card.arcana,
      suit: card.suit,
      rank: card.rank,
      reversed: card.reversed,
      positionIndex: card.positionIndex,
      positionName: card.positionName,
      positionRole: card.positionRole,
      keywords: card.keywords,
      meaning: card.meaning,
    })),
  }
}

export function summarizeReading(value: ToolReadingView): string {
  const faces = value.cards.map((card) => `${card.name}${card.reversed ? '（逆）' : ''}`).join(' · ')
  return `${value.spreadName} · ${faces}`
}

export function readingFromToolView(value: ToolReadingView): ReadingPayload {
  return {
    id: value.id,
    createdAt: value.createdAt,
    spreadId: value.spreadId,
    spreadName: value.spreadName,
    kind: value.kind,
    question: value.question,
    cards: value.cards.map((card) => ({
      ...card,
      summary: '',
      love: '',
      career: '',
      advice: '',
    })),
  }
}

function asString(value: unknown): string | undefined {
  return typeof value === 'string' ? value : undefined
}

function asNumber(value: unknown): number | undefined {
  return typeof value === 'number' && Number.isFinite(value) ? value : undefined
}

function asBoolean(value: unknown): boolean | undefined {
  return typeof value === 'boolean' ? value : undefined
}

function asStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) return []
  return value.filter((item): item is string => typeof item === 'string')
}

const SUITS: CardSuit[] = ['wands', 'cups', 'swords', 'pentacles']
const RANKS: CardRank[] = [
  'ace', '2', '3', '4', '5', '6', '7', '8', '9', '10',
  'page', 'knight', 'queen', 'king',
]

function asSuit(value: unknown): CardSuit | undefined {
  return typeof value === 'string' && SUITS.includes(value as CardSuit) ? value as CardSuit : undefined
}

function asRank(value: unknown): CardRank | undefined {
  return typeof value === 'string' && RANKS.includes(value as CardRank) ? value as CardRank : undefined
}

function parseCard(value: unknown): ToolCardView | null {
  if (!value || typeof value !== 'object') return null
  const rec = value as Record<string, unknown>
  const cardId = asString(rec.cardId)
  const name = asString(rec.name)
  const reversed = asBoolean(rec.reversed)
  const positionIndex = asNumber(rec.positionIndex)
  if (!cardId || !name || reversed === undefined || positionIndex === undefined) return null
  return {
    cardId,
    name,
    nameEn: asString(rec.nameEn) ?? '',
    symbol: asString(rec.symbol) ?? '',
    number: asNumber(rec.number) ?? 0,
    arcana: rec.arcana === 'minor' ? 'minor' : 'major',
    suit: asSuit(rec.suit),
    rank: asRank(rec.rank),
    reversed,
    positionIndex,
    positionName: asString(rec.positionName) ?? `位 ${positionIndex + 1}`,
    positionRole: asString(rec.positionRole) ?? '',
    keywords: asStringArray(rec.keywords),
    meaning: asString(rec.meaning) ?? '',
  }
}

export function parseToolReading(value: unknown): ToolReadingView | null {
  if (!value || typeof value !== 'object') return null
  const rec = value as Record<string, unknown>
  const id = asString(rec.id)
  const spreadId = asString(rec.spreadId)
  const kind = rec.kind === 'today' ? 'today' : rec.kind === 'draw' ? 'draw' : undefined
  if (!id || !spreadId || !kind || !SPREADS.includes(spreadId as SpreadId) || !Array.isArray(rec.cards)) return null
  const cards = rec.cards.map(parseCard)
  if (cards.some((card) => !card)) return null
  return {
    id,
    createdAt: asNumber(rec.createdAt) ?? 0,
    spreadId: spreadId as SpreadId,
    spreadName: asString(rec.spreadName) ?? spreadId,
    kind,
    question: asString(rec.question),
    cards: cards as ToolCardView[],
  }
}

export function parseReadingText(text: string | undefined): ToolReadingView | null {
  if (!text) return null
  try {
    return parseToolReading(JSON.parse(text))
  } catch {
    return null
  }
}

export const LUMINA_READING_EVENT = 'dsh-lumina-reading'
