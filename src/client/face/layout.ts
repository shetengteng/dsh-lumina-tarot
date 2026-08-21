import type { CardRank } from '../../domain/types.ts'

export interface GlyphSlot {
  x: number
  y: number
  scale?: number
}

export const RANK_LABEL: Record<CardRank, string> = {
  ace: 'A',
  '2': 'II',
  '3': 'III',
  '4': 'IV',
  '5': 'V',
  '6': 'VI',
  '7': 'VII',
  '8': 'VIII',
  '9': 'IX',
  '10': 'X',
  page: 'P',
  knight: 'Kn',
  queen: 'Q',
  king: 'K',
}

export const COURT_RANKS: CardRank[] = ['page', 'knight', 'queen', 'king']

export const MINOR_LAYOUTS: Record<CardRank, GlyphSlot[]> = {
  ace: [{ x: 50, y: 65, scale: 2.6 }],
  '2': [
    { x: 50, y: 32 },
    { x: 50, y: 98 },
  ],
  '3': [
    { x: 50, y: 28 },
    { x: 30, y: 92 },
    { x: 70, y: 92 },
  ],
  '4': [
    { x: 30, y: 32 },
    { x: 70, y: 32 },
    { x: 30, y: 98 },
    { x: 70, y: 98 },
  ],
  '5': [
    { x: 30, y: 30 },
    { x: 70, y: 30 },
    { x: 50, y: 65 },
    { x: 30, y: 100 },
    { x: 70, y: 100 },
  ],
  '6': [
    { x: 30, y: 28 },
    { x: 70, y: 28 },
    { x: 30, y: 65 },
    { x: 70, y: 65 },
    { x: 30, y: 102 },
    { x: 70, y: 102 },
  ],
  '7': [
    { x: 30, y: 26 },
    { x: 70, y: 26 },
    { x: 50, y: 50 },
    { x: 30, y: 78 },
    { x: 70, y: 78 },
    { x: 30, y: 108 },
    { x: 70, y: 108 },
  ],
  '8': [
    { x: 30, y: 24 },
    { x: 70, y: 24 },
    { x: 30, y: 54 },
    { x: 70, y: 54 },
    { x: 30, y: 84 },
    { x: 70, y: 84 },
    { x: 30, y: 114 },
    { x: 70, y: 114 },
  ],
  '9': [
    { x: 26, y: 28 },
    { x: 50, y: 28 },
    { x: 74, y: 28 },
    { x: 26, y: 65 },
    { x: 50, y: 65 },
    { x: 74, y: 65 },
    { x: 26, y: 102 },
    { x: 50, y: 102 },
    { x: 74, y: 102 },
  ],
  '10': [
    { x: 26, y: 22 },
    { x: 50, y: 22 },
    { x: 74, y: 22 },
    { x: 26, y: 50 },
    { x: 50, y: 50 },
    { x: 74, y: 50 },
    { x: 26, y: 80 },
    { x: 50, y: 80 },
    { x: 74, y: 80 },
    { x: 50, y: 108 },
  ],
  page: [{ x: 50, y: 80, scale: 2.4 }],
  knight: [{ x: 50, y: 80, scale: 2.4 }],
  queen: [{ x: 50, y: 80, scale: 2.4 }],
  king: [{ x: 50, y: 80, scale: 2.4 }],
}
