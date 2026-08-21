import data from '../../domain/cards.json'
import type { Arcana, CardRank, CardSuit } from '../../domain/types.ts'

export type CardArtRef = {
  symbol: string
  arcana: Arcana
  number: number
  suit?: CardSuit
  rank?: CardRank
}

type CardRow = CardArtRef & { id: string }

const INDEX = new Map<string, CardArtRef>(
  (data as CardRow[]).map((card) => [
    card.id,
    {
      symbol: card.symbol,
      arcana: card.arcana,
      number: card.number,
      suit: card.suit,
      rank: card.rank,
    },
  ]),
)

export function artOf(cardId: string | undefined): CardArtRef | undefined {
  if (!cardId) return undefined
  return INDEX.get(cardId)
}
