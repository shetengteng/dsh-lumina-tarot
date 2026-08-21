import type { HistoryListItem, ReadingPayload } from '../../domain/types.ts'

export const LUMINA_HISTORY_CLEARED = 'dsh-lumina-history-cleared'

function isHistoryItem(value: unknown): value is HistoryListItem {
  if (!value || typeof value !== 'object') return false
  const rec = value as HistoryListItem
  return typeof rec.id === 'string'
    && typeof rec.createdAt === 'number'
    && typeof rec.spreadId === 'string'
    && Array.isArray(rec.cards)
}

export function parseHistory(text: string | undefined): HistoryListItem[] {
  if (!text) return []
  const data = JSON.parse(text) as unknown
  if (!Array.isArray(data)) throw new Error('历史无法解析')
  return data.filter(isHistoryItem)
}

export function parseReading(text: string | undefined): ReadingPayload {
  if (!text) throw new Error('抽牌结果为空')
  const data = JSON.parse(text) as ReadingPayload
  if (!data || !Array.isArray(data.cards)) throw new Error('抽牌结果无法解析')
  return data
}

export function unwrapCommandResult(exec: unknown): { kind?: string; text?: string } {
  const remote = exec as {
    ok?: boolean
    error?: { code?: string; message?: string }
    value?: { result?: { kind?: string; text?: string } }
    result?: { kind?: string; text?: string }
    kind?: string
    text?: string
  } | undefined
  if (remote && typeof remote === 'object' && 'ok' in remote) {
    if (!remote.ok) {
      throw new Error(remote.error?.message || remote.error?.code || '抽牌命令失败')
    }
    const result = remote.value?.result
    if (!result) throw new Error('未知命令或 Host 未注册 /lumina')
    return result
  }
  return remote?.result ?? remote ?? {}
}
