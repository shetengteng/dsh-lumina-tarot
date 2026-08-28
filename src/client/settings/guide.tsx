import { useState, type ReactNode } from 'react'
import { IconChevronDownOutline14 } from '@deepseek-ai/dsh-client-ui-primitives'
import type { LocaleId } from '../../domain/types.ts'
import { spreadLabel } from '../i18n.ts'
import { guideCopy, type GuideCopy } from './guide-copy.ts'

function quote(locale: LocaleId, line: string): string {
  return locale === 'en-US' ? `“${line}”` : `「${line}」`
}

function countLabel(n: number, copy: GuideCopy, locale: LocaleId): string {
  if (locale !== 'en-US') return `${n} ${copy.cardsUnit}`
  return n === 1 ? '1 card' : `${n} cards`
}

function GuideToggle(props: { open: boolean; label: string; onToggle: () => void }) {
  return (
    <button
      type="button"
      className="lumina-set-guide-toggle"
      aria-expanded={props.open}
      aria-label={props.label}
      onClick={props.onToggle}
    >
      <IconChevronDownOutline14 className={props.open ? 'lumina-set-guide-chevron is-open' : 'lumina-set-guide-chevron'} />
    </button>
  )
}

function GuideFold(props: {
  className: string
  headClassName: string
  label: string
  summary: ReactNode
  children: ReactNode
}) {
  const [open, setOpen] = useState(false)
  return (
    <div className={props.className}>
      <div className={props.headClassName}>
        {props.summary}
        <GuideToggle open={open} label={props.label} onToggle={() => setOpen((value) => !value)} />
      </div>
      {open ? props.children : null}
    </div>
  )
}

export function GuideBlock(props: { locale: LocaleId }) {
  const copy = guideCopy(props.locale)
  return (
    <GuideFold
      className="lumina-set-guide"
      headClassName="lumina-set-guide-head"
      label={copy.title}
      summary={(
        <div className="lumina-set-row-text">
          <div className="lumina-set-title">{copy.title}</div>
          <p className="lumina-set-desc">{copy.hint}</p>
        </div>
      )}
    >
      <div className="lumina-set-guide-body">
        <div className="lumina-set-guide-h">{copy.chatTitle}</div>
        <p className="lumina-set-desc">{copy.chatLead}</p>
        <ul className="lumina-set-guide-says">
          {copy.examples.map((line) => (
            <li key={line}>{quote(props.locale, line)}</li>
          ))}
        </ul>
        <p className="lumina-set-desc">{copy.chatHint}</p>
        <div className="lumina-set-guide-h">{copy.floatTitle}</div>
        <ul className="lumina-set-guide-list">
          {copy.floatItems.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <div className="lumina-set-guide-h">{copy.spreadsTitle}</div>
        <p className="lumina-set-desc">{copy.spreadsLead}</p>
        <div className="lumina-set-guide-spreads">
          {copy.spreads.map((spread) => (
            <GuideFold
              key={spread.id}
              className="lumina-set-guide-spread"
              headClassName="lumina-set-guide-spread-head"
              label={spreadLabel(props.locale, spread.id)}
              summary={(
                <>
                  <span className="lumina-set-guide-spread-name">{spreadLabel(props.locale, spread.id)}</span>
                  <span className="lumina-set-guide-spread-meta">{countLabel(spread.count, copy, props.locale)}</span>
                </>
              )}
            >
              <p className="lumina-set-desc">{spread.when}</p>
              <ul className="lumina-set-guide-pos">
                {spread.positions.map((pos) => (
                  <li key={pos.name}>
                    <b>{pos.name}</b>
                    <span>{pos.hint}</span>
                  </li>
                ))}
              </ul>
            </GuideFold>
          ))}
          <GuideFold
            className="lumina-set-guide-spread"
            headClassName="lumina-set-guide-spread-head"
            label={copy.todayTitle}
            summary={(
              <>
                <span className="lumina-set-guide-spread-name">{copy.todayTitle}</span>
                <span className="lumina-set-guide-spread-meta">{countLabel(1, copy, props.locale)}</span>
              </>
            )}
          >
            <p className="lumina-set-desc">{copy.todayBody}</p>
          </GuideFold>
        </div>
        <div className="lumina-set-guide-h">{copy.afterTitle}</div>
        <p className="lumina-set-desc">{copy.afterBody}</p>
      </div>
    </GuideFold>
  )
}
