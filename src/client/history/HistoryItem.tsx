import { useState, type KeyboardEvent } from 'react'
import { radiusFor, type LuminaConfig } from '../defaults.ts'
import { spreadLabel, type Tx } from '../i18n.ts'
import type { HistoryListItem, LocaleId } from '../../domain/types.ts'
import { cardName, formatWhen, periodKey, positionLabel, summarize } from './format.ts'
import { HistoryThumb } from './HistoryThumb.tsx'

function toggleKey(event: KeyboardEvent<HTMLDivElement>, toggle: () => void): void {
  if (event.key !== 'Enter' && event.key !== ' ') return
  event.preventDefault()
  toggle()
}

export function HistoryItem(props: {
  item: HistoryListItem
  locale: LocaleId
  tx: Tx
  config: LuminaConfig
}) {
  const { item, locale, tx, config } = props
  const [open, setOpen] = useState(false)
  const period = periodKey(item.createdAt)
  const radius = Math.max(4, radiusFor(config.theme))
  const toggle = () => setOpen((value) => !value)
  return (
    <li>
      <div
        className={`dsh-lumina-history-item${open ? ' is-open' : ''}`}
        role="button"
        tabIndex={0}
        aria-expanded={open}
        onClick={toggle}
        onKeyDown={(event) => toggleKey(event, toggle)}
      >
        <div className="dsh-lumina-history-meta">
          <span>{`${formatWhen(item.createdAt, locale)} · ${spreadLabel(locale, item.spreadId)}`}</span>
          {period ? <span className="dsh-lumina-history-period">{tx(period)}</span> : null}
        </div>
        <p className="dsh-lumina-history-q">
          <span aria-hidden="true">「</span>
          {item.question || tx('historyUnnamed')}
          <span aria-hidden="true">」</span>
        </p>
        <p className="dsh-lumina-history-sum">{summarize(item, locale, tx)}</p>
        {item.cards.length > 0
          ? (
            <div className="dsh-lumina-history-thumbs">
              {item.cards.map((card) => (
                <HistoryThumb
                  key={`${card.positionIndex}-${card.cardId}`}
                  card={card}
                  locale={locale}
                  tx={tx}
                  config={config}
                  radius={radius}
                />
              ))}
            </div>
          )
          : null}
        {open
          ? (
            <div className="dsh-lumina-history-detail">
              {item.cards.map((card) => (
                <p key={`${card.positionIndex}-${card.cardId}-d`}>
                  {`${positionLabel(card, locale)} · ${cardName(card, locale)}${card.reversed ? tx('reversedShort') : ''}`}
                  {card.keywords?.length ? ` · ${card.keywords.slice(0, 3).join(' · ')}` : ''}
                  {card.meaning ? `：${card.meaning}` : ''}
                </p>
              ))}
            </div>
          )
          : null}
      </div>
    </li>
  )
}
