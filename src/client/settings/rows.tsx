import type { ReactNode } from 'react'
import {
  Menu,
  IconChevronDownOutline14,
} from '@deepseek-ai/dsh-client-ui-primitives'

export function SelectRow(props: {
  id: string
  title: string
  options: Array<{ id: string; label: string }>
  current: string
  onPick: (picked: string) => void
  openId: string | null
  setOpenId: (id: string | null) => void
  desc?: string
}) {
  const currentLabel = props.options.find((opt) => opt.id === props.current)?.label ?? props.current
  return (
    <div className="lumina-set-row">
      <div className="lumina-set-row-text">
        <div className="lumina-set-title">{props.title}</div>
        {props.desc ? <p className="lumina-set-desc">{props.desc}</p> : null}
      </div>
      <Menu
        open={props.openId === props.id}
        onClose={() => props.setOpenId(null)}
        items={props.options.map((opt) => ({ id: opt.id, label: opt.label }))}
        selectedId={props.current}
        onSelect={(picked: string) => {
          props.onPick(picked)
          props.setOpenId(null)
        }}
        align="end"
        portal
        anchor={
          <button
            type="button"
            className="lumina-set-selector"
            aria-haspopup="menu"
            aria-expanded={props.openId === props.id}
            onClick={() => props.setOpenId(props.openId === props.id ? null : props.id)}
          >
            {currentLabel}
            <IconChevronDownOutline14 className="lumina-set-chevron" />
          </button>
        }
      />
    </div>
  )
}

export function SliderRow(props: {
  title: string
  control: ReactNode
  desc?: string
}) {
  return (
    <div className="lumina-set-row">
      <div className="lumina-set-row-text">
        <div className="lumina-set-title">{props.title}</div>
        {props.desc ? <p className="lumina-set-desc">{props.desc}</p> : null}
      </div>
      <label className="lumina-set-range">{props.control}</label>
    </div>
  )
}

export function SwitchRow(props: {
  title: string
  desc: string
  on: boolean
  onToggle: () => void
}) {
  return (
    <div className="lumina-set-row">
      <div className="lumina-set-row-text">
        <div className="lumina-set-title">{props.title}</div>
        <p className="lumina-set-desc">{props.desc}</p>
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={props.on}
        aria-label={props.title}
        className={props.on ? 'lumina-set-switch is-on' : 'lumina-set-switch'}
        onClick={props.onToggle}
      >
        <span className="lumina-set-switch-knob" />
      </button>
    </div>
  )
}
