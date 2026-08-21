import { CARD_H, CARD_W } from '../defaults.ts'

function clamp01(n: number): number {
  return Math.min(1, Math.max(0, n))
}

export function posToPx(floatX: number, floatY: number) {
  const maxX = Math.max(0, window.innerWidth - CARD_W)
  const maxY = Math.max(0, window.innerHeight - CARD_H)
  return { left: clamp01(floatX) * maxX, top: clamp01(floatY) * maxY }
}

export function pxToPos(left: number, top: number) {
  const maxX = Math.max(1, window.innerWidth - CARD_W)
  const maxY = Math.max(1, window.innerHeight - CARD_H)
  return { floatX: clamp01(left / maxX), floatY: clamp01(top / maxY) }
}
