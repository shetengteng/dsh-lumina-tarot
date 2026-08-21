import { useCallback, useState } from 'react'
import { Button } from '@deepseek-ai/dsh-client-ui-primitives'
import { HistoryDialog } from '../history/HistoryDialog.tsx'
import { unwrapCommandResult, LUMINA_HISTORY_CLEARED, parseHistory } from '../overlay/commands.ts'
import { mirroredSession } from '../overlay/session-source.ts'
import type { Tx } from '../i18n.ts'
import type { LuminaConfig } from '../defaults.ts'
import type { AnimationLevel, LocaleId, ThemeId } from '../../domain/types.ts'

type Remote = {
  commands?: { execute: (sessionId: string, line: string, images: readonly unknown[], signal?: AbortSignal) => Promise<unknown> }
}

async function runLine(remote: Remote | undefined, line: string): Promise<string> {
  const execute = remote?.commands?.execute
  const sessionId = mirroredSession()
  if (typeof execute !== 'function') throw new Error('当前环境没有命令通道')
  if (!sessionId) throw new Error('need-session')
  const result = unwrapCommandResult(await execute(sessionId, line, []))
  if (result.kind === 'error') throw new Error(result.text || '命令失败')
  return result.text ?? ''
}

function downloadJson(text: string): void {
  const blob = new Blob([text], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `lumina-tarot-export-${Date.now()}.json`
  a.click()
  URL.revokeObjectURL(url)
}

export function DataBlock(props: {
  tx: Tx
  locale: LocaleId
  theme: ThemeId
  opacity: number
  animationLevel: AnimationLevel
  config: LuminaConfig
  remote?: Remote
  note: string
  setNote: (value: string) => void
}) {
  const [historyOpen, setHistoryOpen] = useState(false)
  const loadHistory = useCallback(
    () => runLine(props.remote, '/lumina history').then(parseHistory),
    [props.remote],
  )
  const busyLabel = (error: unknown) => {
    const text = error instanceof Error ? error.message : String(error)
    return text === 'need-session' ? props.tx('dataNeedSession') : text
  }

  return (
    <div className="lumina-set-block">
      <div className="lumina-set-title">{props.tx('data')}</div>
      <p className="lumina-set-desc">{props.tx('dataDesc')}</p>
      <div className="lumina-set-actions">
        <Button type="button" variant="outline" size="sm" onClick={() => setHistoryOpen(true)}>
          {props.tx('viewHistory')}
        </Button>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={async () => {
            try {
              const text = await runLine(props.remote, '/lumina export')
              const pretty = JSON.stringify(JSON.parse(text), null, 2)
              downloadJson(pretty)
              props.setNote(props.tx('exportDone'))
            } catch (error) {
              props.setNote(busyLabel(error))
            }
          }}
        >
          {props.tx('exportJSON')}
        </Button>
        <Button
          type="button"
          variant="destructive"
          size="sm"
          onClick={async () => {
            if (typeof window !== 'undefined' && !window.confirm(props.tx('clearConfirm'))) return
            try {
              const text = await runLine(props.remote, '/lumina clear')
              if (typeof window !== 'undefined') {
                window.dispatchEvent(new Event(LUMINA_HISTORY_CLEARED))
              }
              props.setNote(text || props.tx('clearAll'))
            } catch (error) {
              props.setNote(busyLabel(error))
            }
          }}
        >
          {props.tx('clearAll')}
        </Button>
      </div>
      {props.note ? <p className="lumina-set-desc">{props.note}</p> : null}
      {historyOpen
        ? (
          <div className="dsh-lumina" data-theme={props.theme}>
            <HistoryDialog
              tx={props.tx}
              locale={props.locale}
              opacity={props.opacity}
              animationLevel={props.animationLevel}
              config={props.config}
              load={loadHistory}
              onClose={() => setHistoryOpen(false)}
            />
          </div>
        )
        : null}
    </div>
  )
}
