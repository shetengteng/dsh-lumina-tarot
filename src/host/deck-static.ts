import { existsSync } from 'node:fs'
import { readFile } from 'node:fs/promises'
import type { IncomingMessage, ServerResponse } from 'node:http'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { DECK_PUBLIC_PREFIX } from '../client/decks/url.ts'

const THEME = /^(rws|aquatic)$/
const CARD_ID = /^[a-z0-9_-]+$/
const PREFIX = `${DECK_PUBLIC_PREFIX}/`

function deckRoot(): string {
  const here = dirname(fileURLToPath(import.meta.url))
  const built = join(here, 'decks')
  if (existsSync(built)) return built
  return join(here, '../src/client/decks')
}

async function handle(req: IncomingMessage, res: ServerResponse): Promise<void> {
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    res.writeHead(405)
    res.end()
    return
  }
  const pathname = decodeURIComponent(new URL(req.url ?? '/', 'http://x').pathname)
  if (!pathname.startsWith(PREFIX) || !pathname.endsWith('.webp')) {
    res.writeHead(404)
    res.end()
    return
  }
  const rest = pathname.slice(PREFIX.length, -5)
  const slash = rest.indexOf('/')
  const theme = slash === -1 ? '' : rest.slice(0, slash)
  const id = slash === -1 ? rest : rest.slice(slash + 1)
  if (!THEME.test(theme) || !CARD_ID.test(id) || id.includes('/')) {
    res.writeHead(404)
    res.end()
    return
  }
  const root = resolve(deckRoot())
  const file = resolve(root, theme, `${id}.webp`)
  if (file !== root && !file.startsWith(`${root}/`)) {
    res.writeHead(404)
    res.end()
    return
  }
  try {
    const body = await readFile(file)
    res.writeHead(200, {
      'content-type': 'image/webp',
      'cache-control': 'public, max-age=86400',
    })
    res.end(req.method === 'HEAD' ? undefined : body)
  } catch {
    res.writeHead(404)
    res.end()
  }
}

export function installDeckStatic(ctx: {
  effect?: (setup: () => (() => void) | void) => void
  webServer: {
    register: (route: {
      kind: 'exact' | 'prefix'
      path: string
      handler: (req: IncomingMessage, res: ServerResponse) => void | Promise<void>
    }) => () => void
  }
}): void {
  const start = () => ctx.webServer.register({
    kind: 'prefix',
    path: DECK_PUBLIC_PREFIX,
    handler: handle,
  })
  if (typeof ctx.effect === 'function') ctx.effect(start)
  else start()
}
