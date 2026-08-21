import { useEffect } from 'react'
import { ReadingChatCard } from './reading/ReadingChatCard.tsx'
import {
  LUMINA_READING_EVENT,
  parseReadingText,
  parseToolReading,
  type ToolReadingView,
} from '../domain/tool-reading.ts'

type ToolBlock = {
  kind?: string
  isError?: boolean
  content?: Array<{ type?: string; text?: string }>
  meta?: unknown
}

const announced = new Set<string>()

function firstText(content: ToolBlock['content']): string {
  if (!Array.isArray(content)) return ''
  for (const block of content) {
    if (block?.type === 'text' && typeof block.text === 'string') return block.text
  }
  return ''
}

function readingFromBlock(block: ToolBlock | undefined): ToolReadingView | null {
  if (!block || block.kind !== 'tool-result' || block.isError) return null
  return parseToolReading(block.meta) ?? parseReadingText(firstText(block.content))
}

function announce(reading: ToolReadingView): void {
  if (announced.has(reading.id)) return
  announced.add(reading.id)
  if (typeof window === 'undefined') return
  window.dispatchEvent(new CustomEvent(LUMINA_READING_EVENT, { detail: reading }))
}

export function LuminaDrawView(props: { toolName?: string; block?: ToolBlock }) {
  const block = props.block
  const running = !block || block.kind !== 'tool-result'
  const failed = block?.kind === 'tool-result' && Boolean(block.isError)
  const reading = readingFromBlock(block)

  useEffect(() => {
    if (reading) announce(reading)
  }, [reading?.id])

  return (
    <ReadingChatCard
      running={running}
      reading={reading}
      error={failed ? (firstText(block?.content) || '抽牌失败') : undefined}
    />
  )
}
