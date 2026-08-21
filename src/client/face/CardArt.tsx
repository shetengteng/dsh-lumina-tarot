import { useEffect, useState, type ReactNode } from 'react'
import type { Arcana, CardArtTheme, CardRank, CardSuit, MinorStyle } from '../../domain/types.ts'
import { deckImageUrl } from '../decks/url.ts'
import { RANK_LABEL } from './layout.ts'
import { MinorArt } from './MinorArt.tsx'

export function cornerLabel(arcana: Arcana | undefined, number: number | undefined, rank: CardRank | undefined): string {
  if (arcana === 'minor' && rank) return RANK_LABEL[rank]
  if (typeof number === 'number') return String(number).padStart(2, '0')
  return ''
}

function FacePhoto(props: {
  theme: Exclude<CardArtTheme, 'minimal'>
  cardId: string
  fallback: ReactNode
}) {
  const [failed, setFailed] = useState(false)
  useEffect(() => {
    setFailed(false)
  }, [props.theme, props.cardId])
  if (failed) return <>{props.fallback}</>
  return (
    <img
      className={props.theme === 'rws' ? 'is-rws' : undefined}
      src={deckImageUrl(props.theme, props.cardId)}
      alt=""
      decoding="async"
      onError={() => setFailed(true)}
    />
  )
}

export function CardArt(props: {
  symbol: string
  reversed?: boolean
  arcana?: Arcana
  suit?: CardSuit
  rank?: CardRank
  minorStyle: MinorStyle
  cardId?: string
  artTheme?: CardArtTheme
}) {
  const cls = props.reversed ? 'art is-reversed' : 'art'
  const fallback = props.arcana === 'minor' && props.suit && props.rank
    ? <MinorArt suit={props.suit} rank={props.rank} style={props.minorStyle} />
    : <span className="sym">{props.symbol}</span>
  const photo = props.cardId && (props.artTheme === 'rws' || props.artTheme === 'aquatic')
    ? <FacePhoto theme={props.artTheme} cardId={props.cardId} fallback={fallback} />
    : fallback
  return <div className={cls}>{photo}</div>
}
