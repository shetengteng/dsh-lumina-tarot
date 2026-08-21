import { ALL_CARDS, getCardById } from './cards.ts'
import { getSpreadById } from './spreads.ts'
import type { DrawnCard, ReadingCardView, ReadingPayload, SpreadId } from './types.ts'

export { ALL_CARDS, findCard, getCardById } from './cards.ts'

function randomUnit(): number {
  const cryptoObj = globalThis.crypto
  if (cryptoObj && typeof cryptoObj.getRandomValues === 'function') {
    const buf = new Uint32Array(1)
    cryptoObj.getRandomValues(buf)
    return buf[0] / 0xffffffff
  }
  return Math.random()
}

function shuffle<T>(arr: readonly T[], rand: () => number = randomUnit): T[] {
  const out = arr.slice()
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1))
    const tmp = out[i]
    out[i] = out[j]
    out[j] = tmp
  }
  return out
}

function isReversed(reversedRate: number, rand: () => number = randomUnit): boolean {
  return rand() < reversedRate
}

function mulberry32(seed: number): () => number {
  let a = seed >>> 0
  return () => {
    a |= 0
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function dateSeed(date = new Date()): number {
  const y = date.getFullYear()
  const m = date.getMonth() + 1
  const d = date.getDate()
  return y * 10000 + m * 100 + d
}

export function randFromSeed(seed: unknown): () => number {
  if (seed === undefined || seed === null || seed === '') return randomUnit
  if (typeof seed === 'number' && Number.isFinite(seed)) return mulberry32(seed >>> 0)
  const text = String(seed)
  let h = 2166136261
  for (let i = 0; i < text.length; i++) {
    h ^= text.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return mulberry32(h >>> 0)
}

export function drawCards(spreadId: SpreadId, reversedRate = 0.35, rand: () => number = randomUnit): DrawnCard[] {
  const spread = getSpreadById(spreadId)
  if (!spread) throw new Error(`unknown spread: ${spreadId}`)
  const pool = shuffle(ALL_CARDS.map((card) => card.id), rand)
  return pool.slice(0, spread.count).map((cardId, index) => ({
    cardId,
    reversed: isReversed(reversedRate, rand),
    positionIndex: index,
  }))
}

export function toReading(
  spreadId: SpreadId,
  drawn: DrawnCard[],
  kind: ReadingPayload['kind'] = 'draw',
): ReadingPayload {
  const spread = getSpreadById(spreadId)
  if (!spread) throw new Error(`unknown spread: ${spreadId}`)
  const cards: ReadingCardView[] = drawn.map((item) => {
    const def = getCardById(item.cardId)
    if (!def) throw new Error(`unknown card: ${item.cardId}`)
    const pos = spread.positions[item.positionIndex]
    const face = item.reversed ? def.reversed : def.upright
    return {
      ...item,
      positionName: pos?.name ?? `位 ${item.positionIndex + 1}`,
      positionRole: pos?.role ?? '',
      name: def.name,
      nameEn: def.nameEn,
      symbol: def.symbol,
      number: def.number,
      arcana: def.arcana,
      suit: def.suit,
      rank: def.rank,
      keywords: def.keywords,
      summary: def.summary,
      meaning: face.meaning,
      love: face.love,
      career: face.career,
      advice: face.advice,
    }
  })
  return {
    id: `${Date.now().toString(36)}-${Math.floor(randomUnit() * 1e6).toString(36)}`,
    createdAt: Date.now(),
    spreadId,
    spreadName: spread.name,
    kind,
    cards,
  }
}

export function drawReading(
  spreadId: SpreadId,
  reversedRate = 0.35,
  rand: () => number = randomUnit,
): ReadingPayload {
  return toReading(spreadId, drawCards(spreadId, reversedRate, rand), 'draw')
}

export function todayReading(reversedRate = 0.35, date = new Date()): ReadingPayload {
  const rand = mulberry32(dateSeed(date))
  return toReading('single', drawCards('single', reversedRate, rand), 'today')
}
