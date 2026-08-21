import { CardArt, cornerLabel } from '../face/CardArt.tsx'
import { artOf } from '../face/art-of.ts'
import { cardName, positionLabel } from './format.ts'
import type { Tx } from '../i18n.ts'
import type { LuminaConfig } from '../defaults.ts'
import type { HistoryListCard, LocaleId } from '../../domain/types.ts'

export function HistoryThumb(props: {
  card: HistoryListCard
  locale: LocaleId
  tx: Tx
  config: LuminaConfig
  radius: number
}) {
  const { card, locale, tx, config } = props
  const art = artOf(card.cardId)
  const name = cardName(card, locale) || card.cardId
  const pos = positionLabel(card, locale)
  const ori = card.reversed ? tx('reversed') : tx('upright')
  const photo = config.cardArtTheme === 'rws' || config.cardArtTheme === 'aquatic'
  const picture = (
    <CardArt
      symbol={card.symbol || art?.symbol || ''}
      reversed={card.reversed}
      arcana={card.arcana || art?.arcana}
      suit={card.suit ?? art?.suit}
      rank={card.rank ?? art?.rank}
      minorStyle={config.minorStyle}
      cardId={card.cardId}
      artTheme={config.cardArtTheme}
    />
  )
  if (photo) {
    return (
      <div
        className="dsh-lumina-hcard is-photo"
        style={{ borderRadius: props.radius }}
        title={`${pos} · ${name} · ${ori}`}
      >
        {picture}
        {card.reversed ? <span className="dsh-lumina-hcard-rev">{tx('historyRevBadge')}</span> : null}
        <span className="dsh-lumina-hcard-caption">{name}</span>
      </div>
    )
  }
  const corner = cornerLabel(card.arcana || art?.arcana, card.number ?? art?.number, card.rank ?? art?.rank)
  return (
    <div
      className="dsh-lumina-face"
      style={{ borderRadius: props.radius }}
      title={`${pos} · ${name} · ${ori}`}
    >
      <div className="meta row">
        <span>{pos}</span>
        {corner ? <span>{corner}</span> : null}
      </div>
      {picture}
      <div className="nm">{name}</div>
      <div className="meta">{ori}</div>
    </div>
  )
}
