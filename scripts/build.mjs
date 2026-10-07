import { readFile, writeFile, mkdir, unlink, copyFile, glob } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import * as esbuild from 'esbuild'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const lib = join(root, 'lib')

await mkdir(lib, { recursive: true })

await esbuild.build({
  absWorkingDir: root,
  entryPoints: ['src/index.ts'],
  outfile: 'lib/index.js',
  bundle: true,
  format: 'esm',
  platform: 'node',
  target: 'node20',
  packages: 'external',
  logLevel: 'info',
})

const innerPath = join(lib, '_client.cjs')
await esbuild.build({
  absWorkingDir: root,
  entryPoints: ['src/client/index.ts'],
  outfile: 'lib/_client.cjs',
  bundle: true,
  format: 'cjs',
  platform: 'browser',
  target: 'es2020',
  jsx: 'automatic',
  loader: { '.webp': 'dataurl' },
  external: ['react', 'react/jsx-runtime', '@deepseek-ai/dsh-client-ui-primitives'],
  logLevel: 'info',
})

const inner = await readFile(innerPath, 'utf8')
const wrapped = `window.__ModuleLoader__.load({
  id: 'dsh-lumina-tarot',
  factory: (require) => {
    var module = { exports: {} };
    var exports = module.exports;
${inner}
    return module.exports;
  },
});
`
await writeFile(join(lib, 'client.js'), wrapped)
await unlink(innerPath).catch(() => undefined)
// Deck art ships as lib/decks/<theme>/<id>.webp. Copy the webp payload only:
// src/client/decks also holds url.ts, which is already bundled into lib/client.js
// and lib/index.js, so a raw directory copy would publish a dead source file.
for await (const rel of glob('**/*.webp', { cwd: 'src/client/decks' })) {
  const dest = join(lib, 'decks', rel)
  await mkdir(dirname(dest), { recursive: true })
  await copyFile(join(root, 'src/client/decks', rel), dest)
}

console.log('built lib/index.js and lib/client.js')
