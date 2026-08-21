import type { LuminaConfig } from './client/defaults.ts'
import { DEFAULT_CONFIG } from './client/defaults.ts'
import { drawReading, todayReading } from './domain/draw.ts'
import { getSpreadById } from './domain/spreads.ts'
import type { ReadingPayload, SpreadId } from './domain/types.ts'
import { payloadFromRecord, persistReading, recordsToHistoryItems, type HistoryStore } from './history.ts'
import { followupInterpret, type FollowupAgent } from './interpret.ts'

export interface LuminaState {
  current: LuminaConfig
  lastReading: ReadingPayload | null
  history: HistoryStore
}

type CommandInvocation = {
  commandId?: string
  rawInput: string
  agent?: FollowupAgent
  signal?: { aborted?: boolean; throwIfAborted?: () => void }
}

function attachQuestion(reading: ReadingPayload, question: string | undefined): ReadingPayload {
  if (!question) return reading
  return { ...reading, question }
}

function parseDrawArgs(rest: string[], fallback: SpreadId): { spreadId: SpreadId; question?: string } {
  const token = rest[0]
  const known = token ? getSpreadById(token)?.id : undefined
  if (known) {
    const question = rest.slice(1).join(' ').trim()
    return { spreadId: known, question: question || undefined }
  }
  const question = rest.join(' ').trim()
  return { spreadId: fallback, question: question || undefined }
}

async function resolveLast(state: LuminaState): Promise<ReadingPayload> {
  if (state.lastReading) return state.lastReading
  const record = await state.history.latest()
  if (!record) throw new Error('还没有抽牌结果。')
  const reading = payloadFromRecord(record)
  state.lastReading = reading
  return reading
}

export function registerLuminaCommands(
  ctx: { commands: { register: (def: unknown) => () => void } },
  state: LuminaState,
): void {
  ctx.commands.register({
    name: 'lumina',
    description: 'Lumina 塔罗：draw / today / last / history / interpret / export / clear',
    input: { hint: 'draw [spreadId] [question] | today | last | history | interpret | export | clear' },
    recordInput: false,
    handler: async ({ commandId, rawInput, agent, signal }: CommandInvocation) => {
      signal?.throwIfAborted?.()
      const parts = rawInput.trim().split(/\s+/).filter(Boolean)
      const sub = (parts[0] ?? 'draw').toLowerCase()
      try {
        if (sub === 'today') {
          const question = parts.slice(1).join(' ').trim() || undefined
          await persistReading(state, attachQuestion(todayReading(state.current.reversedRate), question))
          return { kind: 'success' as const, text: JSON.stringify(state.lastReading) }
        }
        if (sub === 'last') {
          return { kind: 'success' as const, text: JSON.stringify(await resolveLast(state)) }
        }
        if (sub === 'history') {
          return { kind: 'success' as const, text: JSON.stringify(recordsToHistoryItems(await state.history.list())) }
        }
        if (sub === 'export') {
          return { kind: 'success' as const, text: JSON.stringify(await state.history.exportBundle(state.current.theme)) }
        }
        if (sub === 'clear') {
          await state.history.clear()
          state.lastReading = null
          return { kind: 'success' as const, text: '已清空全部历史。' }
        }
        if (sub === 'interpret') {
          const reading = await resolveLast(state)
          if (!agent?.followup) return { kind: 'error' as const, text: '当前会话无法发起解读。' }
          await followupInterpret(agent, reading, commandId)
          return { kind: 'success' as const }
        }
        if (sub === 'draw' || sub === '') {
          const parsed = parseDrawArgs(parts.slice(sub === 'draw' ? 1 : 0), state.current.defaultSpread)
          await persistReading(state, attachQuestion(
            drawReading(parsed.spreadId, state.current.reversedRate),
            parsed.question,
          ))
          return { kind: 'success' as const, text: JSON.stringify(state.lastReading) }
        }
        return { kind: 'error' as const, text: '用法：/lumina draw [spreadId] · /lumina today · /lumina interpret · /lumina last · /lumina history · /lumina export · /lumina clear' }
      } catch (error) {
        return {
          kind: 'error' as const,
          text: error instanceof Error ? error.message : String(error),
        }
      }
    },
  })
}

export { DEFAULT_CONFIG }
