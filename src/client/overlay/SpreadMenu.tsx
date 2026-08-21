import type { CSSProperties, RefObject } from 'react'
import { CARD_H, CARD_W, SPREAD_OPTIONS, radiusFor } from '../defaults.ts'
import { spreadLabel } from '../i18n.ts'
import type { LocaleId, SpreadId, ThemeId } from '../../domain/types.ts'

const ITEM_W = 36
const ITEM_H = Math.round(ITEM_W * 8.6 / 5)

function fanLayout(left: number, top: number) {
  const cx = left + CARD_W / 2
  const cy = top + CARD_H / 2
  const bottom = cy >= window.innerHeight / 2
  const right = cx >= window.innerWidth / 2
  const start = bottom ? 0 : 180
  const end = bottom ? (right ? -90 : 90) : (right ? 270 : 90)
  const radius = Math.round(Math.hypot(CARD_W / 2, CARD_H / 2) + ITEM_H / 2 + 8)
  return { cx, cy, start, end, radius }
}

export function SpreadMenu(props: {
  menuRef: RefObject<HTMLDivElement>
  left: number
  top: number
  pendingSpread: SpreadId
  busy: boolean
  theme: ThemeId
  locale: LocaleId
  lastLabel: string
  historyLabel: string
  onPick: (id: SpreadId) => void
  onOpenLast: () => void
  onOpenHistory: () => void
}) {
  const { cx, cy, start, end, radius } = fanLayout(props.left, props.top)
  const n = SPREAD_OPTIONS.length + 1
  const step = n > 1 ? (end - start) / (n - 1) : 0
  const items = [
    ...SPREAD_OPTIONS.map((opt, i) => ({
      key: opt.id,
      label: spreadLabel(props.locale, opt.id),
      kind: 'card' as const,
      on: props.pendingSpread === opt.id,
      angle: start + step * i,
      index: i,
      onClick: () => props.onPick(opt.id),
    })),
    {
      key: 'last',
      label: props.lastLabel,
      kind: 'action' as const,
      on: false,
      angle: start + step * SPREAD_OPTIONS.length,
      index: SPREAD_OPTIONS.length,
      onClick: () => props.onOpenLast(),
    },
    {
      key: 'history',
      label: props.historyLabel,
      kind: 'action' as const,
      on: false,
      angle: start + step * SPREAD_OPTIONS.length + step * 0.78,
      index: SPREAD_OPTIONS.length + 1,
      onClick: () => props.onOpenHistory(),
    },
  ]

  return (
    <div
      ref={props.menuRef}
      className="dsh-lumina-spreads"
      style={{
        left: cx,
        top: cy,
        ['--r']: `${radius}px`,
      } as CSSProperties}
    >
      {items.map((item) => {
        const action = item.kind === 'action'
        return (
          <button
            key={item.key}
            type="button"
            className={action ? 'dsh-lumina-spread is-action' : 'dsh-lumina-spread'}
            data-on={item.on ? '1' : '0'}
            disabled={props.busy}
            style={{
              ['--a']: `${item.angle}deg`,
              ['--i']: String(item.index),
              ...(action
                ? { zIndex: items.length - item.index }
                : {
                    width: ITEM_W,
                    height: ITEM_H,
                    marginLeft: -ITEM_W / 2,
                    marginTop: -ITEM_H / 2,
                    borderRadius: radiusFor(props.theme),
                    zIndex: items.length - item.index,
                  }),
            } as CSSProperties}
            onPointerDown={(event) => {
              if (event.button !== 0) return
              event.preventDefault()
              event.stopPropagation()
              item.onClick()
            }}
          >
            <span className="dsh-lumina-spread-face">{item.label}</span>
          </button>
        )
      })}
    </div>
  )
}
