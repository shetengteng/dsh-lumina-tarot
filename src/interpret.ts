import type { ReadingPayload } from './domain/types.ts'

export type FollowupAgent = {
  followup: (message: unknown) => void
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
): Promise<void> {
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
