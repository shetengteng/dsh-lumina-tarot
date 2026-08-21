import { useEffect, useRef, useState, type RefObject } from 'react'
import type { LuminaConfig } from '../defaults.ts'
import type { Tx } from '../i18n.ts'
import type { HistoryListItem, LocaleId } from '../../domain/types.ts'
import { HistoryItem } from './HistoryItem.tsx'

const PAGE = 8

export function HistoryList(props: {
  items: HistoryListItem[]
  locale: LocaleId
  tx: Tx
  config: LuminaConfig
  scrollerRef: RefObject<HTMLDivElement>
}) {
  const { items, locale, tx, config, scrollerRef } = props
  const [shown, setShown] = useState(PAGE)
  const sentinelRef = useRef<HTMLLIElement>(null)

  useEffect(() => {
    setShown(PAGE)
  }, [items])

  useEffect(() => {
    const target = sentinelRef.current
    const root = scrollerRef.current
    if (!target || !root || shown >= items.length) return
    const io = new IntersectionObserver((entries) => {
      if (!entries.some((entry) => entry.isIntersecting)) return
      setShown((count) => Math.min(count + PAGE, items.length))
    }, { root, rootMargin: '160px' })
    io.observe(target)
    return () => io.disconnect()
  }, [items.length, scrollerRef, shown])

  return (
    <ul className="dsh-lumina-history-list">
      {items.slice(0, shown).map((item) => (
        <HistoryItem key={item.id} item={item} locale={locale} tx={tx} config={config} />
      ))}
      {shown < items.length
        ? <li ref={sentinelRef} className="dsh-lumina-history-more" aria-hidden="true" />
        : null}
    </ul>
  )
}
