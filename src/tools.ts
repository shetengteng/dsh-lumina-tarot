import type { LuminaState } from './commands.ts'
import {
  drawReading,
  findCard,
  randFromSeed,
  todayReading,
} from './domain/draw.ts'
import { persistReading } from './history.ts'
import { SPREADS, requireSpreadId } from './domain/spreads.ts'
import { parseToolReading, summarizeReading, toToolReading } from './domain/tool-reading.ts'
import type { SpreadId } from './domain/types.ts'

type Json = Record<string, unknown>

type ToolCtx = {
  tools: { register: (def: unknown) => () => void }
}

function asRecord(args: unknown): Json {
  return args && typeof args === 'object' && !Array.isArray(args) ? args as Json : {}
}

function spreadFromArgs(args: unknown, fallback: SpreadId): SpreadId {
  const raw = asRecord(args).spreadId
  if (raw === undefined || raw === '') return fallback
  if (typeof raw !== 'string') throw new Error('spreadId must be a string')
  return requireSpreadId(raw)
}

const DRAW_OUTPUT = {
  type: 'object' as const,
  properties: {
    id: { type: 'string' as const },
    createdAt: { type: 'number' as const },
    spreadId: { type: 'string' as const },
    spreadName: { type: 'string' as const },
    kind: { type: 'string' as const },
    cards: { type: 'array' as const },
  },
}

function text(value: string) {
  return [{ type: 'text' as const, text: value }]
}

export function registerLuminaTools(ctx: ToolCtx, state: LuminaState): void {
  ctx.tools.register({
    name: 'lumina_list_spreads',
    description: '列出 Lumina 塔罗可用的四种牌阵（id、名称、张数）。抽牌前先调用本工具确认 spreadId。',
    parameters: { type: 'object' },
    output: {
      schema: { type: 'object', properties: { spreads: { type: 'array' } } },
      render: (_args: unknown, value: unknown) => {
        const spreads = (value as { spreads?: Array<{ id: string; count: number }> })?.spreads ?? []
        return text(spreads.map((item) => `${item.id} (${item.count})`).join(' · ') || 'no spreads')
      },
    },
    isConcurrencySafe: () => true,
    execute: async () => ({
      spreads: SPREADS.map((spread) => ({
        id: spread.id,
        name: spread.name,
        subtitle: spread.subtitle,
        count: spread.count,
      })),
    }),
  })

  ctx.tools.register({
    name: 'lumina_draw',
    description: '按指定牌阵抽牌，返回牌位、正逆、关键词与正逆位含义。禁止编造牌 id；解读留给后续对话，不要把占卜叙事写进本工具。',
    parameters: {
      type: 'object',
      properties: {
        spreadId: {
          type: 'string',
          description: '牌阵 id：single | three-card | cross | celtic-lite。省略则用设置里的默认牌阵。',
        },
        seed: {
          type: 'string',
          description: '可选。相同 seed 可复现同一抽牌。',
        },
      },
    },
    output: {
      schema: DRAW_OUTPUT,
      render: (_args: unknown, value: unknown) => {
        const parsed = parseToolReading(value)
        return text(parsed ? summarizeReading(parsed) : 'draw complete')
      },
      presentationMeta: (_args: unknown, value: unknown) => value as Json,
    },
    presentCall: () => ({ card: 'generic', title: 'Lumina 抽牌' }),
    presentResult: (_args: unknown, result: { isError: boolean }) => (
      result.isError
        ? { card: 'generic', title: '抽牌失败' }
        : { card: 'generic', title: 'Lumina 抽牌' }
    ),
    execute: async (args: unknown) => {
      const spreadId = spreadFromArgs(args, state.current.defaultSpread)
      const seed = asRecord(args).seed
      const reading = drawReading(spreadId, state.current.reversedRate, randFromSeed(seed))
      await persistReading(state, reading)
      return toToolReading(reading)
    },
  })

  ctx.tools.register({
    name: 'lumina_lookup_card',
    description: '按牌 id、中文名或英文名查询一张塔罗牌的结构化字段，不是替用户解读。',
    parameters: {
      type: 'object',
      properties: {
        query: {
          type: 'string',
          description: '例如 fool、愚者、The Fool',
        },
      },
      required: ['query'],
    },
    output: {
      schema: { type: 'object' },
      render: (_args: unknown, value: unknown) => {
        const card = value as { name?: string; nameEn?: string; keywords?: string[] }
        const keys = Array.isArray(card.keywords) ? card.keywords.slice(0, 4).join('、') : ''
        return text([card.name, card.nameEn, keys].filter(Boolean).join(' · ') || 'not found')
      },
    },
    isConcurrencySafe: () => true,
    execute: async (args: unknown) => {
      const query = asRecord(args).query
      if (typeof query !== 'string' || !query.trim()) throw new Error('query is required')
      const card = findCard(query)
      if (!card) throw new Error(`unknown card: ${query.trim()}`)
      return {
        id: card.id,
        number: card.number,
        name: card.name,
        nameEn: card.nameEn,
        arcana: card.arcana,
        suit: card.suit,
        rank: card.rank,
        keywords: card.keywords,
        symbol: card.symbol,
        summary: card.summary,
        upright: card.upright,
        reversed: card.reversed,
      }
    },
  })

  ctx.tools.register({
    name: 'lumina_today',
    description: '抽取今日一牌。同一自然日结果稳定。返回牌位、正逆、关键词与正逆位含义，不含解读散文。',
    parameters: { type: 'object' },
    output: {
      schema: DRAW_OUTPUT,
      render: (_args: unknown, value: unknown) => {
        const parsed = parseToolReading(value)
        return text(parsed ? summarizeReading(parsed) : 'draw complete')
      },
      presentationMeta: (_args: unknown, value: unknown) => value as Json,
    },
    presentCall: () => ({ card: 'generic', title: 'Lumina 今日一牌' }),
    presentResult: (_args: unknown, result: { isError: boolean }) => (
      result.isError
        ? { card: 'generic', title: '今日一牌失败' }
        : { card: 'generic', title: 'Lumina 今日一牌' }
    ),
    execute: async () => {
      const reading = todayReading(state.current.reversedRate)
      await persistReading(state, reading)
      return toToolReading(reading)
    },
  })
}
