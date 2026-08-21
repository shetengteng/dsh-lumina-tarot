import data from './cards.json'
import type { TarotCardDef } from './types.ts'

export const ALL_CARDS = data as TarotCardDef[]

export function getCardById(id: string): TarotCardDef | undefined {
  return ALL_CARDS.find((card) => card.id === id)
}

export function findCard(query: string): TarotCardDef | undefined {
  const q = query.trim().toLowerCase()
  if (!q) return undefined
  return ALL_CARDS.find((card) => (
    card.id.toLowerCase() === q
    || card.name.toLowerCase() === q
    || card.nameEn.toLowerCase() === q
  ))
}
