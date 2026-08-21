import type { CardArtTheme, CardBackVariant } from '../domain/types.ts'
import { deckImageUrl } from './decks/url.ts'

function Classic() {
  return (
    <>
      <rect key="r" x={6} y={6} width={88} height={148} rx={4} fill="none" stroke="currentColor" strokeWidth={0.5} opacity={0.4} />
      <circle key="c1" cx={50} cy={80} r={32} fill="none" stroke="currentColor" strokeWidth={0.7} opacity={0.5} />
      <circle key="c2" cx={50} cy={80} r={22} fill="none" stroke="currentColor" strokeWidth={0.5} opacity={0.7} />
      <path key="star" d="M50 60 L52 78 L70 80 L52 82 L50 100 L48 82 L30 80 L48 78 Z" fill="currentColor" opacity={0.95} />
      <circle key="dot" cx={50} cy={80} r={2} fill="hsl(var(--lumina-card))" />
    </>
  )
}

function Celestial() {
  return (
    <>
      <rect key="r" x={6} y={6} width={88} height={148} rx={4} fill="none" stroke="currentColor" strokeWidth={0.4} opacity={0.3} />
      <g key="const" opacity={0.85}>
        <line x1={20} y1={40} x2={32} y2={48} stroke="currentColor" strokeWidth={0.4} opacity={0.5} />
        <line x1={32} y1={48} x2={44} y2={58} stroke="currentColor" strokeWidth={0.4} opacity={0.5} />
        <line x1={44} y1={58} x2={56} y2={62} stroke="currentColor" strokeWidth={0.4} opacity={0.5} />
        <line x1={56} y1={62} x2={68} y2={58} stroke="currentColor" strokeWidth={0.4} opacity={0.5} />
        <line x1={68} y1={58} x2={78} y2={50} stroke="currentColor" strokeWidth={0.4} opacity={0.5} />
        <line x1={78} y1={50} x2={86} y2={40} stroke="currentColor" strokeWidth={0.4} opacity={0.5} />
        <circle cx={20} cy={40} r={1.6} fill="currentColor" />
        <circle cx={32} cy={48} r={1.3} fill="currentColor" />
        <circle cx={44} cy={58} r={1.4} fill="currentColor" />
        <circle cx={56} cy={62} r={1.5} fill="currentColor" />
        <circle cx={68} cy={58} r={1.3} fill="currentColor" />
        <circle cx={78} cy={50} r={1.4} fill="currentColor" />
        <circle cx={86} cy={40} r={1.7} fill="currentColor" />
      </g>
      <path key="moon" d="M50 90 A20 20 0 1 0 50 130 A14 20 0 1 1 50 90 Z" fill="currentColor" opacity={0.85} />
    </>
  )
}

function Sacred() {
  const dots = Array.from({ length: 12 }, (_, i) => {
    const a = ((i * Math.PI * 2) / 12) - Math.PI / 2
    return (
      <circle
        key={`z-${i}`}
        cx={50 + 38 * Math.cos(a)}
        cy={80 + 38 * Math.sin(a)}
        r={1.2}
        fill="currentColor"
      />
    )
  })
  return (
    <>
      <circle key="o1" cx={50} cy={80} r={38} fill="none" stroke="currentColor" strokeWidth={0.5} opacity={0.4} />
      <g key="z" opacity={0.7}>{dots}</g>
      <circle key="o2" cx={50} cy={80} r={26} fill="none" stroke="currentColor" strokeWidth={0.4} opacity={0.5} />
      <polygon key="p1" points="50,55 72,90 28,90" fill="none" stroke="currentColor" strokeWidth={0.7} opacity={0.9} />
      <polygon key="p2" points="50,105 28,70 72,70" fill="none" stroke="currentColor" strokeWidth={0.7} opacity={0.9} />
      <circle key="dot" cx={50} cy={80} r={2} fill="currentColor" />
    </>
  )
}

function Floral() {
  return (
    <>
      <g key="flower" opacity={0.75} stroke="currentColor" strokeWidth={0.55} fill="none">
        <circle cx={50} cy={80} r={14} />
        <circle cx={50} cy={66} r={14} />
        <circle cx={50} cy={94} r={14} />
        <circle cx={62.12} cy={73} r={14} />
        <circle cx={62.12} cy={87} r={14} />
        <circle cx={37.88} cy={73} r={14} />
        <circle cx={37.88} cy={87} r={14} />
      </g>
      <circle key="ring" cx={50} cy={80} r={34} fill="none" stroke="currentColor" strokeWidth={0.4} opacity={0.4} />
      <circle key="dot" cx={50} cy={80} r={1.5} fill="currentColor" opacity={0.95} />
    </>
  )
}

function Eye() {
  const rays = Array.from({ length: 12 }, (_, i) => {
    const a = ((i * Math.PI * 2) / 12) - Math.PI / 2
    return (
      <line
        key={`r-${i}`}
        x1={50 + 26 * Math.cos(a)}
        y1={80 + 26 * Math.sin(a)}
        x2={50 + 32 * Math.cos(a)}
        y2={80 + 32 * Math.sin(a)}
      />
    )
  })
  return (
    <>
      <circle key="o1" cx={50} cy={80} r={34} fill="none" stroke="currentColor" strokeWidth={0.5} opacity={0.4} />
      <circle key="o2" cx={50} cy={80} r={22} fill="none" stroke="currentColor" strokeWidth={0.55} opacity={0.5} />
      <g key="rays" opacity={0.5} stroke="currentColor" strokeWidth={0.4}>{rays}</g>
      <path key="eye" d="M30 80 Q50 60 70 80 Q50 100 30 80 Z" fill="none" stroke="currentColor" strokeWidth={0.7} opacity={0.95} />
      <circle key="iris" cx={50} cy={80} r={6.5} fill="currentColor" opacity={0.85} />
      <circle key="pupil" cx={50} cy={80} r={2.4} fill="hsl(var(--lumina-card))" />
    </>
  )
}

function pattern(variant: CardBackVariant) {
  if (variant === 'celestial') return <Celestial />
  if (variant === 'sacred') return <Sacred />
  if (variant === 'floral') return <Floral />
  if (variant === 'eye') return <Eye />
  return <Classic />
}

export function CardBackSvg(props: { variant: CardBackVariant }) {
  return (
    <svg viewBox="0 0 100 160" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
      {pattern(props.variant)}
    </svg>
  )
}

export function CardBack(props: { variant: CardBackVariant; art?: CardArtTheme }) {
  if (props.art === 'rws' || props.art === 'aquatic') {
    return <img src={deckImageUrl(props.art, '_back')} alt="" draggable={false} />
  }
  return <CardBackSvg variant={props.variant} />
}
