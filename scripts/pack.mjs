import { execFile } from 'node:child_process'
import { mkdir, readdir, rm, stat } from 'node:fs/promises'
import { dirname, join, relative } from 'node:path'
import { fileURLToPath } from 'node:url'
import { promisify } from 'node:util'

const execFileAsync = promisify(execFile)
const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const output = join(root, 'output')

function kb(bytes) {
  return `${(bytes / 1024).toFixed(1)} KB`
}

async function walk(dir, files = []) {
  for (const name of await readdir(dir, { withFileTypes: true })) {
    const path = join(dir, name.name)
    if (name.isDirectory()) await walk(path, files)
    else files.push(path)
  }
  return files
}

async function summarize(dir) {
  const files = await walk(dir)
  const deckPrefix = join(dir, 'lib', 'decks')
  let decks = 0
  let deckBytes = 0
  const rows = []
  for (const path of files) {
    const bytes = (await stat(path)).size
    if (path === dir || path.startsWith(`${deckPrefix}/`) || path === deckPrefix) {
      decks += 1
      deckBytes += bytes
      continue
    }
    rows.push({ rel: relative(dir, path), bytes })
  }
  rows.sort((a, b) => a.rel.localeCompare(b.rel))
  for (const row of rows) console.log(`  ${row.rel.padEnd(28)} ${kb(row.bytes)}`)
  if (decks) console.log(`  lib/decks/                   ${decks} files, ${kb(deckBytes)}`)
  const total = files.reduce(async (sum, path) => (await sum) + (await stat(path)).size, Promise.resolve(0))
  console.log(`  total                        ${files.length} files, ${kb(await total)}`)
}

await rm(output, { recursive: true, force: true })
await mkdir(output, { recursive: true })

console.log('building…')
await import('./build.mjs')

console.log('packing…')
try {
  await execFileAsync('pnpm', ['pack', '--pack-destination', output], { cwd: root })
} catch {
  await execFileAsync('npm', ['pack', '--pack-destination', output], { cwd: root })
}

const tgzName = (await readdir(output)).find((name) => name.endsWith('.tgz'))
if (!tgzName) throw new Error('pack produced no tarball')
const tgzPath = join(output, tgzName)
const tgzBytes = (await stat(tgzPath)).size

await execFileAsync('tar', ['-xzf', tgzPath, '-C', output])

console.log(`\n${relative(root, tgzPath)}  ${kb(tgzBytes)}`)
console.log(`${relative(root, join(output, 'package'))}/`)
await summarize(join(output, 'package'))
console.log(`\nwrote ${relative(root, output)}/`)
