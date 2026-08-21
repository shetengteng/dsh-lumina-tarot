import { useEffect, useRef } from 'react'
import { spreadLabel, type Tx } from '../i18n.ts'
import type { LocaleId, SpreadId } from '../../domain/types.ts'

export function AskForm(props: {
  tx: Tx
  locale: LocaleId
  pendingSpread: SpreadId
  question: string
  busy: boolean
  onQuestion: (value: string) => void
  onSubmit: () => void
  onClose: () => void
}) {
  const areaRef = useRef<HTMLTextAreaElement>(null)
  const canAsk = props.question.trim().length > 0

  useEffect(() => {
    areaRef.current?.focus()
  }, [])

  return (
    <div
      className="dsh-lumina-ask"
      onPointerDown={(event) => event.stopPropagation()}
    >
      <h2 className="dsh-lumina-ask-title">{props.tx('askTitle')}</h2>
      <p className="dsh-lumina-ask-sub">{props.tx('askSub')}</p>
      <p className="dsh-lumina-ask-spread">
        {props.tx('askSpread')}
        <b>{spreadLabel(props.locale, props.pendingSpread)}</b>
      </p>
      <label className="dsh-lumina-ask-label" htmlFor="dsh-lumina-ask-q">{props.tx('askLabel')}</label>
      <textarea
        ref={areaRef}
        id="dsh-lumina-ask-q"
        className="dsh-lumina-ask-input"
        rows={5}
        maxLength={280}
        placeholder={props.tx('askPlaceholder')}
        value={props.question}
        onChange={(event: { target: { value: string } }) => props.onQuestion(event.target.value.slice(0, 280))}
      />
      <div className="dsh-lumina-ask-meta">
        <span>{props.tx('askHint')}</span>
        <span>{`${props.question.length} / 280`}</span>
      </div>
      <div className="dsh-lumina-actions">
        <button
          type="button"
          className="dsh-lumina-cta is-ghost"
          onClick={props.onClose}
        >
          {props.tx('close')}
        </button>
        <button
          type="button"
          className="dsh-lumina-cta"
          disabled={!canAsk || props.busy}
          onClick={() => {
            if (!canAsk || props.busy) return
            props.onSubmit()
          }}
        >
          {props.tx('askNext')}
        </button>
      </div>
    </div>
  )
}
