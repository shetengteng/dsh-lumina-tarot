import type { MouseEvent, PointerEvent, RefObject } from 'react'
import { CardBack } from '../card-back.tsx'
import type { AnimationLevel, CardArtTheme, CardBackVariant } from '../../domain/types.ts'

export function FloatCard(props: {
  cardRef: RefObject<HTMLDivElement>
  title: string
  left: number
  top: number
  radius: number
  animationLevel: AnimationLevel
  cardBack: CardBackVariant
  cardArtTheme: CardArtTheme
  onPointerDown: (event: PointerEvent<HTMLDivElement>) => void
  onPointerMove: (event: PointerEvent<HTMLDivElement>) => void
  onPointerUp: (event: PointerEvent<HTMLDivElement>) => void
  onContextMenu: (event: MouseEvent<HTMLDivElement>) => void
}) {
  return (
    <div
      ref={props.cardRef}
      className="dsh-lumina-float"
      title={props.title}
      style={{ left: props.left, top: props.top }}
      onPointerDown={props.onPointerDown}
      onPointerMove={props.onPointerMove}
      onPointerUp={props.onPointerUp}
      onPointerCancel={props.onPointerUp}
      onContextMenu={props.onContextMenu}
    >
      <div
        className="dsh-lumina-cardback"
        data-anim={props.animationLevel}
        style={{ borderRadius: props.radius }}
      >
        <CardBack variant={props.cardBack} art={props.cardArtTheme} />
      </div>
    </div>
  )
}
