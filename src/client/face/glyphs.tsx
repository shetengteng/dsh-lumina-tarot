import type { CardRank, CardSuit, MinorStyle } from '../../domain/types.ts'

function WandMark() {
  return (
    <>
      <line x1={0} y1={-6} x2={0} y2={6} stroke="currentColor" strokeWidth={1.4} strokeLinecap="round" />
      <line x1={-2.5} y1={-6} x2={2.5} y2={-6} stroke="currentColor" strokeWidth={1.4} strokeLinecap="round" />
      <line x1={-2.5} y1={6} x2={2.5} y2={6} stroke="currentColor" strokeWidth={1.4} strokeLinecap="round" />
      <path d="M-1.6 -6 Q-1 -8.5 0 -8.5 Q1 -8.5 1.6 -6 Q1.2 -7 0 -7 Q-1.2 -7 -1.6 -6 Z" fill="currentColor" opacity={0.85} />
    </>
  )
}

function CupMark() {
  return (
    <>
      <path d="M-3.6 -5.5 Q-3.6 1.5 0 4 Q3.6 1.5 3.6 -5.5 Z" fill="none" stroke="currentColor" strokeWidth={1.1} strokeLinejoin="round" />
      <path d="M-3.6 -5.5 Q0 -4.2 3.6 -5.5" fill="none" stroke="currentColor" strokeWidth={0.7} opacity={0.55} />
      <line x1={0} y1={4} x2={0} y2={6.5} stroke="currentColor" strokeWidth={1.1} strokeLinecap="round" />
      <ellipse cx={0} cy={6.8} rx={2.6} ry={0.7} fill="currentColor" opacity={0.85} />
    </>
  )
}

function SwordMark() {
  return (
    <>
      <path d="M0 -8 L1.1 5 L-1.1 5 Z" fill="currentColor" opacity={0.9} />
      <line x1={-3.5} y1={5} x2={3.5} y2={5} stroke="currentColor" strokeWidth={1.3} strokeLinecap="round" />
      <line x1={0} y1={5} x2={0} y2={7.6} stroke="currentColor" strokeWidth={1.1} strokeLinecap="round" />
      <circle cx={0} cy={8.2} r={0.9} fill="currentColor" />
    </>
  )
}

function PentacleMark() {
  return (
    <>
      <circle cx={0} cy={0} r={4.2} fill="none" stroke="currentColor" strokeWidth={1.1} />
      <path d="M0 -3.4 L1 -1.05 L3.4 -1.05 L1.4 0.4 L2.1 2.75 L0 1.3 L-2.1 2.75 L-1.4 0.4 L-3.4 -1.05 L-1 -1.05 Z" fill="currentColor" opacity={0.9} />
      <circle cx={0} cy={0} r={0.55} fill="currentColor" opacity={0.6} />
    </>
  )
}

function GeoWand() {
  return (
    <>
      <rect x={-0.9} y={-6.5} width={1.8} height={13} rx={0.5} fill="currentColor" opacity={0.9} />
      <circle cx={0} cy={-7.6} r={0.95} fill="currentColor" opacity={0.95} />
    </>
  )
}

function GeoCup() {
  return (
    <>
      <circle cx={0} cy={0} r={4.2} fill="none" stroke="currentColor" strokeWidth={1.2} />
      <circle cx={0} cy={0} r={2.1} fill="currentColor" opacity={0.55} />
    </>
  )
}

function GeoSword() {
  return (
    <>
      <path d="M0 -5.5 L4.5 4.2 L-4.5 4.2 Z" fill="none" stroke="currentColor" strokeWidth={1.2} strokeLinejoin="round" />
      <line x1={0} y1={-3.8} x2={0} y2={3.4} stroke="currentColor" strokeWidth={0.7} opacity={0.6} />
    </>
  )
}

function GeoPentacle() {
  return (
    <>
      <rect x={-3.6} y={-3.6} width={7.2} height={7.2} rx={0.6} transform="rotate(45)" fill="none" stroke="currentColor" strokeWidth={1.2} />
      <rect x={-1.6} y={-1.6} width={3.2} height={3.2} transform="rotate(45)" fill="currentColor" opacity={0.85} />
    </>
  )
}

export function SuitGlyph(props: { suit: CardSuit; style: MinorStyle }) {
  if (props.style === 'geometric') {
    if (props.suit === 'wands') return <GeoWand />
    if (props.suit === 'cups') return <GeoCup />
    if (props.suit === 'swords') return <GeoSword />
    return <GeoPentacle />
  }
  if (props.suit === 'wands') return <WandMark />
  if (props.suit === 'cups') return <CupMark />
  if (props.suit === 'swords') return <SwordMark />
  return <PentacleMark />
}

export function CourtMark(props: { rank: CardRank }) {
  if (props.rank === 'page') {
    return (
      <>
        <path d="M46 22 L50 14 L54 22 Z" fill="currentColor" opacity={0.85} />
        <circle cx={50} cy={14} r={1} fill="currentColor" opacity={0.9} />
      </>
    )
  }
  if (props.rank === 'knight') {
    return (
      <>
        <path d="M40 22 L50 12 L60 22" fill="none" stroke="currentColor" strokeWidth={1.2} opacity={0.85} />
        <line x1={58} y1={14} x2={68} y2={8} stroke="currentColor" strokeWidth={0.8} opacity={0.7} />
      </>
    )
  }
  if (props.rank === 'queen') {
    return (
      <>
        <path d="M40 22 Q50 8 60 22" fill="none" stroke="currentColor" strokeWidth={1.2} opacity={0.85} />
        <circle cx={50} cy={14} r={2} fill="none" stroke="currentColor" strokeWidth={0.7} opacity={0.8} />
        <circle cx={50} cy={14} r={0.7} fill="currentColor" />
      </>
    )
  }
  return (
    <>
      <path d="M38 24 L40 14 L46 22 L50 10 L54 22 L60 14 L62 24 Z" fill="none" stroke="currentColor" strokeWidth={1.1} opacity={0.9} />
      <circle cx={40} cy={14} r={0.8} fill="currentColor" />
      <circle cx={50} cy={10} r={1} fill="currentColor" />
      <circle cx={60} cy={14} r={0.8} fill="currentColor" />
    </>
  )
}
