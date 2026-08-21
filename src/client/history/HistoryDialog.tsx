import { useEffect, useRef, useState } from 'react'
import { IconCloseOutline16 } from '@deepseek-ai/dsh-client-ui-primitives'
import { ModalDust } from '../fx/ModalDust.tsx'
import { scrimFill } from '../fx/scrim.ts'
import { LUMINA_HISTORY_CLEARED } from '../overlay/commands.ts'
import type { LuminaConfig } from '../defaults.ts'
import type { Tx } from '../i18n.ts'
import type { AnimationLevel, HistoryListItem, LocaleId } from '../../domain/types.ts'
import { monthlyCount } from './format.ts'
import { HistoryList } from './HistoryList.tsx'

export function HistoryDialog(props: {
  tx: Tx
  locale: LocaleId
  opacity: number
  animationLevel: AnimationLevel
  config: LuminaConfig
  load: () => Promise<HistoryListItem[]>
  onClose: () => void
}) {
  const { tx, locale, load, onClose, config } = props
  const scrollerRef = useRef<HTMLDivElement>(null)
  const [items, setItems] = useState<HistoryListItem[]>([])
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading')
  const [errorText, setErrorText] = useState('')

  useEffect(() => {
    let alive = true
    const refresh = async () => {
      setStatus('loading')
      setErrorText('')
      try {
        const next = await load()
        if (!alive) return
        setItems(next)
        setStatus('ready')
      } catch (error) {
        if (!alive) return
        const text = error instanceof Error ? error.message : String(error)
        setErrorText(text)
        setStatus('error')
      }
    }
    void refresh()
    const onCleared = () => {
      setItems([])
      setStatus('ready')
      setErrorText('')
    }
    window.addEventListener(LUMINA_HISTORY_CLEARED, onCleared)
    return () => {
      alive = false
      window.removeEventListener(LUMINA_HISTORY_CLEARED, onCleared)
    }
  }, [load])

  let body
  if (status === 'loading') {
    body = <p className="dsh-lumina-history-status">{tx('historyLoading')}</p>
  } else if (status === 'error') {
    body = (
      <p className="dsh-lumina-history-status is-error">
        {errorText === 'need-session' ? tx('historyNeedSession') : errorText}
      </p>
    )
  } else if (items.length === 0) {
    body = (
      <div className="dsh-lumina-history-empty">
        <span className="dsh-lumina-history-empty-mark" aria-hidden="true">◌</span>
        <p className="dsh-lumina-history-empty-title">{tx('historyEmptyTitle')}</p>
        <p className="dsh-lumina-history-status">{tx('historyKeepHint')}</p>
      </div>
    )
  } else {
    body = (
      <HistoryList
        items={items}
        locale={locale}
        tx={tx}
        config={config}
        scrollerRef={scrollerRef}
      />
    )
  }

  const countText = status === 'ready' && items.length > 0
    ? tx('historyCountMonthly')
      .replace('{n}', String(items.length))
      .replace('{m}', String(monthlyCount(items)))
    : tx('historyKeepHint')

  return (
    <div
      className="dsh-lumina-ask-modal"
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <div className="dsh-lumina-scrim" style={scrimFill(props.opacity)} />
      <ModalDust level={props.animationLevel} />
      <section
        className="dsh-lumina-history"
        onPointerDown={(event) => event.stopPropagation()}
      >
        <div className="dsh-lumina-history-head">
          <div>
            <h2 className="dsh-lumina-history-title">{tx('historyTitle')}</h2>
            <p className="dsh-lumina-history-count">{countText}</p>
          </div>
          <button
            type="button"
            className="dsh-lumina-iconbtn"
            aria-label={tx('close')}
            title={tx('close')}
            onClick={onClose}
          >
            <IconCloseOutline16 size={16} />
          </button>
        </div>
        <div ref={scrollerRef} className="dsh-lumina-history-body">{body}</div>
      </section>
    </div>
  )
}
