import type { ReadingPayload } from './types.ts'

export function buildInterpretPrompt(reading: ReadingPayload): string {
  const question = reading.question
    ? `请解读「${reading.question}」`
    : `请解读刚才的${reading.spreadName}`
  const faces = reading.cards
    .map((card) => `${card.positionName} ${card.name}${card.reversed ? '（逆）' : ''}`)
    .join(' · ')
  return `${question}。遵守 lumina-interpret skill，禁止改牌或重抽。\n${faces}`
}
