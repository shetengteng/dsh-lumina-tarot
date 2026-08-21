import type { CardRank, CardSuit, MinorStyle } from '../../domain/types.ts'
import { CourtMark, SuitGlyph } from './glyphs.tsx'
import { COURT_RANKS, MINOR_LAYOUTS } from './layout.ts'

export function MinorArt(props: {
  suit: CardSuit
  rank: CardRank
  style: MinorStyle
}) {
  const slots = MINOR_LAYOUTS[props.rank] ?? MINOR_LAYOUTS.ace
  const court = COURT_RANKS.includes(props.rank)
  return (
    <svg viewBox="0 0 100 130" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
      {court ? (
        <g className="court-frame">
          <path d="M22 32 Q50 14 78 32" fill="none" stroke="currentColor" strokeWidth={0.6} opacity={0.55} />
          <CourtMark rank={props.rank} />
        </g>
      ) : null}
      {slots.map((slot, index) => (
        <g
          key={`${props.suit}-${props.rank}-${index}`}
          transform={`translate(${slot.x}, ${slot.y}) scale(${slot.scale ?? 1})`}
        >
          <SuitGlyph suit={props.suit} style={props.style} />
        </g>
      ))}
    </svg>
  )
}
