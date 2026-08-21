import type { CardArtTheme } from '../../domain/types.ts'

export const DECK_PUBLIC_PREFIX = '/lumina-tarot/decks'

export function deckImageUrl(theme: Exclude<CardArtTheme, 'minimal'>, id: string): string {
  return `${DECK_PUBLIC_PREFIX}/${theme}/${id}.webp`
}
