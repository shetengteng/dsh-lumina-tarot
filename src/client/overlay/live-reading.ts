import type { LuminaConfig } from '../defaults.ts'
import { minShuffleMs } from '../defaults.ts'
import { LUMINA_READING_EVENT, parseToolReading, readingFromToolView } from '../../domain/tool-reading.ts'
import type { ReadingPayload } from '../../domain/types.ts'

type Phase = 'idle' | 'loading' | 'result' | 'error'

export function listenToolReading(opts: {
  drawingRef: { current: boolean }
  phaseRef: { current: Phase }
  animationLevel: LuminaConfig['animationLevel']
  setBusy: (value: boolean) => void
  setMenu: (value: boolean) => void
  setAsk: (value: boolean) => void
  setHistoryOpen?: (value: boolean) => void
  setPhase: (value: Phase) => void
  setErrorText: (value: string) => void
  setReading: (value: ReadingPayload) => void
}): () => void {
  const onReading = (event: Event) => {
    const parsed = parseToolReading((event as CustomEvent).detail)
    if (!parsed) return
    if (opts.phaseRef.current === 'idle') return
    if (opts.drawingRef.current) return
    opts.drawingRef.current = true
    opts.setBusy(true)
    opts.setMenu(false)
    opts.setAsk(false)
    opts.setHistoryOpen?.(false)
    opts.setPhase('loading')
    opts.setErrorText('')
    const waitMs = minShuffleMs(opts.animationLevel === 'off' ? 'off' : 'lite')
    window.setTimeout(() => {
      opts.setReading(readingFromToolView(parsed))
      opts.setPhase('result')
      opts.drawingRef.current = false
      opts.setBusy(false)
    }, waitMs)
  }
  window.addEventListener(LUMINA_READING_EVENT, onReading)
  return () => window.removeEventListener(LUMINA_READING_EVENT, onReading)
}
