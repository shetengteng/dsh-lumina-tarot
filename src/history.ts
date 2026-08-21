import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { homedir } from 'node:os'
import { dirname, join } from 'node:path'
import { toReading } from './domain/draw.ts'
import { getSpreadById } from './domain/spreads.ts'
import type { DrawnCard, HistoryListItem, ReadingPayload, ReadingRecord } from './domain/types.ts'

export type HistoryExport = {
  exportedAt: string
  theme: string
  history: ReadingRecord[]
}

export type HistoryStore = {
  file: string
  append: (record: ReadingRecord, limit: number) => Promise<void>
  list: () => Promise<ReadingRecord[]>
  latest: () => Promise<ReadingRecord | undefined>
  clear: () => Promise<void>
  exportBundle: (theme: string) => Promise<HistoryExport>
}

function defaultHistoryFile(): string {
  if (process.env.LUMINA_HISTORY_FILE) return process.env.LUMINA_HISTORY_FILE
  const home = process.env.DSH_HOME || join(homedir(), '.dsh')
  return join(home, 'data', 'lumina-tarot', 'history.jsonl')
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

function parseCard(value: unknown): DrawnCard | null {
  if (!value || typeof value !== 'object') return null
  const rec = value as Record<string, unknown>
  const cardId = asString(rec.cardId)
  const reversed = asBoolean(rec.reversed)
  const positionIndex = asNumber(rec.positionIndex)
  if (!cardId || reversed === undefined || positionIndex === undefined) return null
  return { cardId, reversed, positionIndex }
}

export function parseRecord(value: unknown): ReadingRecord | null {
  if (!value || typeof value !== 'object') return null
  const rec = value as Record<string, unknown>
  const id = asString(rec.id)
  const createdAt = asNumber(rec.createdAt)
  const spreadId = asString(rec.spreadId)
  if (!id || createdAt === undefined || !spreadId || !Array.isArray(rec.cards)) return null
  const cards = rec.cards.map(parseCard)
  if (cards.some((card) => !card)) return null
  return {
    id,
    createdAt,
    spreadId,
    question: asString(rec.question),
    mood: asString(rec.mood),
    cards: cards as DrawnCard[],
    note: asString(rec.note),
  }
}

export function recordFromPayload(reading: ReadingPayload): ReadingRecord {
  return {
    id: reading.id,
    createdAt: reading.createdAt,
    spreadId: reading.spreadId,
    question: reading.question,
    cards: reading.cards.map((card) => ({
      cardId: card.cardId,
      reversed: card.reversed,
      positionIndex: card.positionIndex,
    })),
  }
}

export function payloadFromRecord(record: ReadingRecord): ReadingPayload {
  const spread = getSpreadById(record.spreadId)
  if (!spread) throw new Error(`unknown spread: ${record.spreadId}`)
  const payload = toReading(spread.id, record.cards, 'draw')
  return {
    ...payload,
    id: record.id,
    createdAt: record.createdAt,
    question: record.question,
  }
}

export function listItemFromRecord(record: ReadingRecord): HistoryListItem | null {
  try {
    const payload = payloadFromRecord(record)
    return {
      id: record.id,
      createdAt: record.createdAt,
      spreadId: record.spreadId,
      spreadName: payload.spreadName,
      question: record.question,
      cards: payload.cards.map((card) => ({
        cardId: card.cardId,
        name: card.name,
        nameEn: card.nameEn,
        reversed: card.reversed,
        positionIndex: card.positionIndex,
        positionName: card.positionName,
        positionRole: card.positionRole,
        symbol: card.symbol,
        number: card.number,
        arcana: card.arcana,
        suit: card.suit,
        rank: card.rank,
        keywords: card.keywords,
        summary: card.summary,
        meaning: card.meaning,
      })),
    }
  } catch {
    return null
  }
}

export function recordsToHistoryItems(records: ReadingRecord[]): HistoryListItem[] {
  const items: HistoryListItem[] = []
  for (let i = records.length - 1; i >= 0; i--) {
    const item = listItemFromRecord(records[i])
    if (item) items.push(item)
  }
  return items
}

async function readLines(file: string): Promise<ReadingRecord[]> {
  let raw = ''
  try {
    raw = await readFile(file, 'utf8')
  } catch (error) {
    const code = (error as { code?: string }).code
    if (code === 'ENOENT') return []
    throw error
  }
  const out: ReadingRecord[] = []
  for (const line of raw.split('\n')) {
    const trimmed = line.trim()
    if (!trimmed) continue
    try {
      const parsed = parseRecord(JSON.parse(trimmed))
      if (parsed) out.push(parsed)
    } catch { /* skip corrupt line */ }
  }
  return out
}

async function writeLines(file: string, records: ReadingRecord[]): Promise<void> {
  await mkdir(dirname(file), { recursive: true })
  const body = records.map((record) => JSON.stringify(record)).join('\n')
  await writeFile(file, body ? `${body}\n` : '', 'utf8')
}

export function createHistory(file = defaultHistoryFile()): HistoryStore {
  let queue = Promise.resolve()
  const run = <T>(op: () => Promise<T>): Promise<T> => {
    const next = queue.then(op, op)
    queue = next.then(() => undefined, () => undefined)
    return next
  }

  const list = () => run(() => readLines(file))

  return {
    file,
    list,
    append: (record, limit) => run(async () => {
      const cap = Math.max(1, Math.min(500, Math.floor(limit) || 100))
      const current = await readLines(file)
      const next = [...current.filter((item) => item.id !== record.id), record]
      await writeLines(file, next.length > cap ? next.slice(next.length - cap) : next)
    }),
    latest: async () => {
      const records = await list()
      return records[records.length - 1]
    },
    clear: () => run(() => writeLines(file, [])),
    exportBundle: async (theme) => {
      const records = await list()
      return {
        exportedAt: new Date().toISOString(),
        theme,
        history: [...records].reverse(),
      }
    },
  }
}

export async function persistReading(
  state: {
    lastReading: ReadingPayload | null
    current: { historyLimit: number }
    history: HistoryStore
  },
  reading: ReadingPayload,
): Promise<void> {
  state.lastReading = reading
  try {
    await state.history.append(recordFromPayload(reading), state.current.historyLimit)
  } catch (error) {
    console.warn('[lumina-tarot] history not saved', error)
  }
}
