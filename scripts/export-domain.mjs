import { readFile, writeFile, mkdir } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const sourceRoot = process.env.LUMINA_SRC_DATA
  ?? join(root, '..', 'tt-lumina-tarot', 'src', 'data')
const outDir = join(root, 'src', 'domain')

function stripTs(src) {
  return src
    .replace(/import[\s\S]*?from\s+['"][^'"]+['"];?\s*/g, '')
    .replace(/export\s+function[\s\S]*$/, '')
    .replace(/export\s+\{[\s\S]*?\};?/g, '')
    .replace(/export\s+const\s+/g, 'const ')
    .replace(/:\s*TarotCardDef\[\]/g, '')
    .replace(/:\s*SpreadDef\[\]/g, '')
    .replace(/\bas const\b/g, '')
}

function loadExport(src, name) {
  const code = stripTs(src)
  return new Function(`${code}\nreturn ${name};`)()
}

function pickSpread(spread) {
  return {
    id: spread.id,
    name: spread.name,
    subtitle: spread.subtitle,
    description: spread.description,
    count: spread.count,
    positions: spread.positions.map((pos) => ({
      index: pos.index,
      name: pos.name,
      role: pos.role,
    })),
  }
}

const majorSrc = await readFile(join(sourceRoot, 'majorArcana.ts'), 'utf8')
const wandsSrc = await readFile(join(sourceRoot, 'minorArcana/wands.ts'), 'utf8')
const cupsSrc = await readFile(join(sourceRoot, 'minorArcana/cups.ts'), 'utf8')
const swordsSrc = await readFile(join(sourceRoot, 'minorArcana/swords.ts'), 'utf8')
const pentaclesSrc = await readFile(join(sourceRoot, 'minorArcana/pentacles.ts'), 'utf8')
const spreadsSrc = await readFile(join(sourceRoot, 'spreads.ts'), 'utf8')

const cards = [
  ...loadExport(majorSrc, 'MAJOR_ARCANA'),
  ...loadExport(wandsSrc, 'WANDS'),
  ...loadExport(cupsSrc, 'CUPS'),
  ...loadExport(swordsSrc, 'SWORDS'),
  ...loadExport(pentaclesSrc, 'PENTACLES'),
]
const spreads = loadExport(spreadsSrc, 'SPREADS').map(pickSpread)

const ids = cards.map((card) => card.id)
if (cards.length !== 78) throw new Error(`expected 78 cards, got ${cards.length}`)
if (new Set(ids).size !== 78) throw new Error('duplicate card ids')
if (cards.filter((card) => card.arcana === 'major').length !== 22) {
  throw new Error('expected 22 major arcana')
}
if (spreads.length !== 4) throw new Error(`expected 4 spreads, got ${spreads.length}`)
for (const spread of spreads) {
  if (spread.positions.length !== spread.count) {
    throw new Error(`spread ${spread.id} count/positions mismatch`)
  }
}

await mkdir(outDir, { recursive: true })
await writeFile(join(outDir, 'cards.json'), `${JSON.stringify(cards, null, 2)}\n`)
await writeFile(join(outDir, 'spreads.json'), `${JSON.stringify(spreads, null, 2)}\n`)
console.log(`exported ${cards.length} cards and ${spreads.length} spreads from ${sourceRoot}`)
