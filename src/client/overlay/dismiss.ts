import { useEffect, type RefObject } from 'react'

export function useOverlayDismiss(opts: {
  active: boolean
  modal: boolean
  menuRef: RefObject<HTMLDivElement>
  cardRef: RefObject<HTMLDivElement>
  onDismiss: () => void
}): void {
  const { active, modal, menuRef, cardRef, onDismiss } = opts
  useEffect(() => {
    if (!active) return
    const onPointerDown = (event: PointerEvent) => {
      if (modal) return
      const node = event.target
      if (node instanceof Element && node.closest('.dsh-lumina-spread, .dsh-lumina-float, .dsh-lumina-spreads, .dsh-lumina-dismiss')) return
      if (menuRef.current?.contains(node as Node)) return
      if (cardRef.current?.contains?.(node as Node)) return
      onDismiss()
    }
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onDismiss()
    }
    document.addEventListener('pointerdown', onPointerDown, true)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('pointerdown', onPointerDown, true)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [active, modal, menuRef, cardRef, onDismiss])
}
