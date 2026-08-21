import type { MouseEvent as ReactMouseEvent, PointerEvent as ReactPointerEvent } from 'react'
import { CARD_H, CARD_W, DRAG_THRESHOLD } from '../defaults.ts'
import { patchLuminaConfig, persistLuminaField, type SettingsHandle } from '../store.ts'
import { pxToPos } from './geometry.ts'
import type { SpreadId } from '../../domain/types.ts'

export type DragState = {
  pointerId: number
  startX: number
  startY: number
  origLeft: number
  origTop: number
  moved: boolean
  left: number
  top: number
}

export function createFloatPointer(opts: {
  dragRef: { current: DragState | null }
  cardRef: { current: HTMLDivElement | null }
  drawingRef: { current: boolean }
  scope: SettingsHandle | undefined
  getAsk: () => boolean
  getMenu: () => boolean
  getDefaultSpread: () => SpreadId
  onAsk: () => void
  setMenu: (value: boolean) => void
  setPendingSpread: (id: SpreadId) => void
}) {
  const onPointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.button !== 0) return
    const node = opts.cardRef.current
    if (!node) return
    const rect = node.getBoundingClientRect()
    opts.dragRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      origLeft: rect.left,
      origTop: rect.top,
      moved: false,
      left: rect.left,
      top: rect.top,
    }
    try { node.setPointerCapture(event.pointerId) } catch { /* noop */ }
  }

  const onPointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    const drag = opts.dragRef.current
    if (!drag || drag.pointerId !== event.pointerId) return
    const dx = event.clientX - drag.startX
    const dy = event.clientY - drag.startY
    if (Math.abs(dx) + Math.abs(dy) >= DRAG_THRESHOLD) drag.moved = true
    if (!drag.moved) return
    const maxX = Math.max(0, window.innerWidth - CARD_W)
    const maxY = Math.max(0, window.innerHeight - CARD_H)
    drag.left = Math.min(maxX, Math.max(0, drag.origLeft + dx))
    drag.top = Math.min(maxY, Math.max(0, drag.origTop + dy))
    patchLuminaConfig(pxToPos(drag.left, drag.top))
  }

  const onPointerUp = (event: ReactPointerEvent<HTMLDivElement>) => {
    const drag = opts.dragRef.current
    if (!drag) return
    const node = opts.cardRef.current
    if (drag.pointerId === event.pointerId) {
      try { node?.releasePointerCapture(event.pointerId) } catch { /* noop */ }
    }
    const wasDrag = drag.moved
    const next = pxToPos(drag.left, drag.top)
    opts.dragRef.current = null
    if (wasDrag) {
      patchLuminaConfig(next)
      void persistLuminaField(opts.scope, 'floatX', next.floatX).then(() => persistLuminaField(opts.scope, 'floatY', next.floatY))
      return
    }
    if (opts.drawingRef.current || opts.getAsk()) return
    if (opts.getMenu()) opts.setMenu(false)
    opts.setPendingSpread(opts.getDefaultSpread())
    opts.onAsk()
  }

  const onContextMenu = (event: ReactMouseEvent<HTMLDivElement>) => {
    event.preventDefault()
    event.stopPropagation()
    if (opts.dragRef.current?.moved) return
    opts.setPendingSpread(opts.getDefaultSpread())
    opts.setMenu(true)
  }

  return { onPointerDown, onPointerMove, onPointerUp, onContextMenu }
}
