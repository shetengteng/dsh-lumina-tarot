import type { HistoryListCard, HistoryListItem, LocaleId } from '../../domain/types.ts'
import type { CopyKey, Tx } from '../i18n.ts'

export function cardName(card: HistoryListCard, locale: LocaleId): string {
  return locale === 'en-US' ? card.nameEn : card.name
}

export function positionLabel(card: HistoryListCard, locale: LocaleId): string {
  if (locale === 'en-US' && card.positionRole) return card.positionRole
  return card.positionName
}

export function formatWhen(ts: number, locale: LocaleId): string {
  return new Date(ts).toLocaleString(locale === 'en-US' ? 'en-US' : 'zh-CN', {
    month: 'numeric',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export function monthlyCount(items: HistoryListItem[], now = Date.now()): number {
  const date = new Date(now)
  const year = date.getFullYear()
  const month = date.getMonth()
  return items.filter((item) => {
    const created = new Date(item.createdAt)
    return created.getFullYear() === year && created.getMonth() === month
  }).length
}

function sameDay(left: Date, right: Date): boolean {
  return left.getFullYear() === right.getFullYear()
    && left.getMonth() === right.getMonth()
    && left.getDate() === right.getDate()
}

export function periodKey(ts: number, now = Date.now()): CopyKey | undefined {
  const day = new Date(ts)
  const today = new Date(now)
  if (sameDay(day, today)) return 'historyPeriodToday'
  if (sameDay(day, new Date(now - 86400000))) return 'historyPeriodYesterday'
  if (now - ts < 7 * 86400000) return 'historyPeriodThisWeek'
  return undefined
}

function clip(text: string, max = 36): string {
  const trimmed = text.trim()
  if (trimmed.length <= max) return trimmed
  return `${trimmed.slice(0, max)}…`
}

export function summarize(item: HistoryListItem, locale: LocaleId, tx: Tx): string {
  const cards = item.cards
  if (cards.length === 0) return '—'
  if (cards.length === 1) {
    const only = cards[0]
    const brief = clip(only.summary || only.meaning || (only.keywords ?? []).slice(0, 3).join(' · ') || '')
    return tx('historySummarySingle')
      .replace('{name}', cardName(only, locale))
      .replace('{status}', only.reversed ? tx('reversed') : tx('upright'))
      .replace('{brief}', brief || tx('historyUnnamed'))
  }
  const shown = cards.slice(0, cards.length <= 3 ? cards.length : 4)
  const names = shown.map((card) => {
    const pos = positionLabel(card, locale)
    const mark = card.reversed ? `·${tx('historyRevBadge')}` : ''
    return cards.length <= 3 ? `${pos}：${cardName(card, locale)}${mark}` : cardName(card, locale)
  }).join(locale === 'en-US' ? ', ' : '、')
  const extra = cards.length > shown.length
    ? tx('historySummaryMore').replace('{count}', String(cards.length))
    : ''
  return tx('historySummaryMany')
    .replace('{count}', String(cards.length))
    .replace('{names}', names)
    .replace('{more}', extra)
}
