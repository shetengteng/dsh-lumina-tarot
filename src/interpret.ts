import { buildInterpretPrompt } from './domain/interpret-prompt.ts'
import type { ReadingPayload } from './domain/types.ts'

export { buildInterpretPrompt }

export type FollowupAgent = {
  followup: (message: unknown) => void
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
