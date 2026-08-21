import data from './spreads.json'
import type { SpreadDef, SpreadId } from './types.ts'

export const SPREAD_IDS: SpreadId[] = ['single', 'three-card', 'cross', 'celtic-lite']

export const SPREADS = data as SpreadDef[]

export function getSpreadById(id: string): SpreadDef | undefined {
  return SPREADS.find((spread) => spread.id === id)
}

export function parseSpreadId(raw: string | undefined, fallback: SpreadId): SpreadId {
  const token = (raw ?? '').trim()
  return getSpreadById(token)?.id ?? fallback
}

export function requireSpreadId(raw: string | undefined): SpreadId {
  const token = (raw ?? '').trim()
  const found = getSpreadById(token)
  if (!found) throw new Error(`unknown spread: ${token || '(empty)'}`)
  return found.id
}
