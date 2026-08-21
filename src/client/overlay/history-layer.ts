import { useCallback, useState } from 'react'
import type { HistoryListItem } from '../../domain/types.ts'
import { parseHistory } from './commands.ts'

type LineResult = { text?: string }

export function useHistoryLayer(executeLine: (line: string) => Promise<LineResult>): {
  open: boolean
  setOpen: (value: boolean) => void
  load: () => Promise<HistoryListItem[]>
} {
  const [open, setOpen] = useState(false)
  const load = useCallback(async () => {
    return parseHistory((await executeLine('/lumina history')).text)
  }, [executeLine])
  return { open, setOpen, load }
}
