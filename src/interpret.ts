import type { ReadingPayload } from './domain/types.ts'

const FOLLOWUP_GUARD = '__dshLuminaFollowupGuard'
const DEDUPE_MS = 2000

export type FollowupAgent = {
  followup: (message: unknown) => void
}

type FollowupClaim = {
  readingId: string
  at: number
  commandId?: string
}

function cardLine(card: ReadingPayload['cards'][number]): string {
  const mark = card.reversed ? '（逆）' : ''
  return `- ${card.positionName} · ${card.name}${mark}：${card.meaning}`
}

export function buildInterpretPrompt(reading: ReadingPayload): string {
  const lines = [
    '请根据下面已经抽好的牌面撰写解读。遵守 lumina-interpret skill。禁止改牌、重抽、再调用抽牌工具。',
    '结构：总览 → 按牌位 → 综合 → 可执行建议。语气克制、不宿命论；不提供医疗或法律建议。',
  ]
  if (reading.question) lines.push(`问题：${reading.question}`)
  lines.push(`${reading.spreadName}：`, ...reading.cards.map(cardLine))
  return lines.join('\n')
}

function claimFollowup(readingId: string, commandId?: string): boolean {
  const bag = globalThis as Record<string, FollowupClaim | undefined>
  const prev = bag[FOLLOWUP_GUARD]
  const now = Date.now()
  if (prev) {
    if (commandId && prev.commandId === commandId) return false
    if (prev.readingId === readingId && now - prev.at < DEDUPE_MS) return false
  }
  bag[FOLLOWUP_GUARD] = { readingId, at: now, commandId }
  return true
}

async function buildFollowupMessage(text: string, source: unknown): Promise<unknown> {
  try {
    const mod = await import('@deepseek-ai/dsh-llm') as {
      createUserMessage?: (input: { content: unknown[]; source: unknown }) => unknown
    }
    if (typeof mod.createUserMessage === 'function') {
      return mod.createUserMessage({
        content: [{ type: 'text', text }],
        source,
      })
    }
  } catch {
    /* Host 未暴露 helper 时走结构兼容的 user message */
  }
  return {
    id: crypto.randomUUID(),
    role: 'user' as const,
    content: [{ type: 'text' as const, text }],
    source,
  }
}

export async function followupInterpret(
  agent: FollowupAgent,
  reading: ReadingPayload,
  commandId?: string,
): Promise<void> {
  if (!claimFollowup(reading.id, commandId)) return
  const text = buildInterpretPrompt(reading)
  const summary = reading.question
    ? `请解读「${reading.question}」`
    : `请解读刚才的${reading.spreadName}`
  const source = {
    kind: 'plugin' as const,
    plugin: 'dsh-lumina-tarot',
    form: 'notice' as const,
    summary: summary.slice(0, 120),
  }
  agent.followup(await buildFollowupMessage(text, source))
}
