import { mkdir, rm } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import * as esbuild from 'esbuild'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const tmp = join(root, 'lib', '_verify-p6.mjs')

await mkdir(join(root, 'lib'), { recursive: true })
await esbuild.build({
  absWorkingDir: root,
  entryPoints: ['src/domain/draw.ts'],
  outfile: 'lib/_verify-p6.mjs',
  bundle: true,
  format: 'esm',
  platform: 'node',
  target: 'node20',
  logLevel: 'silent',
})

const {
  ALL_CARDS,
  findCard,
  drawReading,
} = await import(pathToFileURL(tmp).href)

if (ALL_CARDS.length !== 78) throw new Error(`expected 78 cards, got ${ALL_CARDS.length}`)
for (const card of ALL_CARDS) {
  const hit = findCard(card.id)
  if (!hit) throw new Error(`lookup missed id ${card.id}`)
  if (!findCard(card.name)) throw new Error(`lookup missed name ${card.name}`)
  if (!findCard(card.nameEn)) throw new Error(`lookup missed nameEn ${card.nameEn}`)
}

for (const spreadId of ['three-card', 'cross']) {
  const reading = drawReading(spreadId, 0.35, () => 0.2)
  if (reading.cards.length !== (spreadId === 'three-card' ? 3 : 5)) {
    throw new Error(`${spreadId} card count mismatch`)
  }
  for (const card of reading.cards) {
    if (!card.positionName || !card.positionRole) throw new Error(`${spreadId} missing position`)
    if (typeof card.reversed !== 'boolean') throw new Error(`${spreadId} missing reversed`)
    if (!card.meaning || !card.love || !card.career || !card.advice) {
      throw new Error(`${spreadId} missing face text for ${card.cardId}`)
    }
  }
}

await rm(tmp, { force: true })
console.log('p6 domain ok: 78 lookup + three-card/cross fields')
