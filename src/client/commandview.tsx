import { ReadingChatCard } from './reading/ReadingChatCard.tsx'
import { parseReadingText } from '../domain/tool-reading.ts'

type Outcome = { kind?: 'success' | 'error'; text?: string } | null

type CommandNode = {
  outcome?: Outcome
  data?: CommandNode
  node?: CommandNode
}

function commandOf(input: CommandNode | undefined): CommandNode | undefined {
  if (!input) return undefined
  if (input.outcome !== undefined) return input
  return commandOf(input.data) ?? commandOf(input.node)
}

export function LuminaCommandView(props: { node?: CommandNode }) {
  const node = commandOf(props.node)
  const outcome = node?.outcome
  if (!outcome) return null
  if (outcome.kind === 'error') return <ReadingChatCard error={outcome.text || '命令失败'} />
  const reading = parseReadingText(outcome.text)
  if (!reading) return null
  return <ReadingChatCard reading={reading} />
}
