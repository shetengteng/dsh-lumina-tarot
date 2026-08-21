import { mkdir, mkdtemp, rm } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { dirname, join } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import * as esbuild from 'esbuild'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const dir = await mkdtemp(join(tmpdir(), 'lumina-p7-'))
const file = join(dir, 'history.jsonl')
const tmp = join(root, 'lib', '_verify-p7.mjs')

await mkdir(join(root, 'lib'), { recursive: true })
await esbuild.build({
  absWorkingDir: root,
  entryPoints: ['src/history.ts'],
  outfile: 'lib/_verify-p7.mjs',
  bundle: true,
  format: 'esm',
  platform: 'node',
  target: 'node20',
  logLevel: 'silent',
})

const { createHistory, payloadFromRecord, recordsToHistoryItems } = await import(pathToFileURL(tmp).href)
const store = createHistory(file)

for (let i = 0; i < 101; i++) {
  await store.append({
    id: `rd-${i}`,
    createdAt: i + 1,
    spreadId: 'three-card',
    question: i === 100 ? 'last question' : undefined,
    cards: [
      { cardId: 'fool', reversed: false, positionIndex: 0 },
      { cardId: 'magician', reversed: true, positionIndex: 1 },
      { cardId: 'world', reversed: false, positionIndex: 2 },
    ],
  }, 100)
}

const listed = await store.list()
if (listed.length !== 100) throw new Error(`expected 100 records, got ${listed.length}`)
if (listed[0].id === 'rd-0') throw new Error('oldest record was not evicted')
if (listed[listed.length - 1].id !== 'rd-100') throw new Error('latest id mismatch')

const latest = await store.latest()
if (!latest || latest.question !== 'last question') throw new Error('latest record missing question')

const restored = payloadFromRecord(latest)
if (restored.cards.length !== 3) throw new Error('hydrate card count')
if (!restored.cards[0].positionName || typeof restored.cards[1].reversed !== 'boolean' || !restored.cards[2].meaning) {
  throw new Error('hydrate fields incomplete')
}

const items = recordsToHistoryItems(listed)
if (items[0].id !== 'rd-100') throw new Error('history list should be newest-first')
if (!items[0].cards[0].name || !items[0].spreadName) throw new Error('history list missing view fields')

const bundle = await store.exportBundle('mystic')
const parsed = JSON.parse(JSON.stringify(bundle))
if (!parsed.exportedAt || parsed.theme !== 'mystic' || !Array.isArray(parsed.history)) {
  throw new Error('export shape invalid')
}
if (parsed.history[0].id !== 'rd-100') throw new Error('export should be newest-first')

await store.clear()
if ((await store.list()).length !== 0) throw new Error('clear did not empty history')
if (await store.latest()) throw new Error('latest after clear should be empty')

await rm(tmp, { force: true })
await rm(dir, { recursive: true, force: true })
console.log('p7 history ok: cap 100, export JSON.parse, clear empty')
