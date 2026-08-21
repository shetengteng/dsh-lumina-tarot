import { useEffect, useRef } from 'react'
import type { AnimationLevel } from '../../domain/types.ts'
import { dustCount, spawnDust, stepDust, type Dust } from './dust.ts'

export function ModalDust(props: { level: AnimationLevel }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (props.level === 'off') return
    const canvas = canvasRef.current
    if (!canvas) return
    const host = canvas.closest('.dsh-lumina-ask-modal, .dsh-lumina-mask') as HTMLElement | null
    const parent = host ?? canvas.parentElement
    if (!parent) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const dots: Dust[] = []
    const count = dustCount(props.level === 'lite' ? 'lite' : 'full')
    let width = 0
    let height = 0
    let raf = 0
    let running = true

    const resize = () => {
      const nextW = Math.max(1, parent.clientWidth)
      const nextH = Math.max(1, parent.clientHeight)
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = nextW
      height = nextH
      canvas.width = Math.round(nextW * dpr)
      canvas.height = Math.round(nextH * dpr)
      canvas.style.width = `${nextW}px`
      canvas.style.height = `${nextH}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      while (dots.length < count) dots.push(spawnDust(width, height))
    }

    const tick = () => {
      if (!running) return
      if (document.visibilityState !== 'hidden') {
        ctx.clearRect(0, 0, width, height)
        for (const dot of dots) {
          stepDust(dot, width, height)
          ctx.beginPath()
          ctx.globalAlpha = dot.a
          ctx.fillStyle = dot.color
          ctx.arc(dot.x, dot.y, dot.r, 0, Math.PI * 2)
          ctx.fill()
        }
        ctx.globalAlpha = 1
      }
      raf = window.requestAnimationFrame(tick)
    }

    resize()
    const observer = new ResizeObserver(resize)
    observer.observe(parent)
    raf = window.requestAnimationFrame(tick)
    return () => {
      running = false
      window.cancelAnimationFrame(raf)
      observer.disconnect()
    }
  }, [props.level])

  if (props.level === 'off') return null
  return (
    <div className="dsh-lumina-fx" aria-hidden="true">
      <canvas ref={canvasRef} />
    </div>
  )
}
