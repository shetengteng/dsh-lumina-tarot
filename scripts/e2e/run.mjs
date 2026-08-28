/**
 * Live e2e against a running `dsh web` (design/2026-08-27-01-端到端测试场景.md).
 *
 *   pnpm e2e
 *   pnpm e2e -- --url http://127.0.0.1:57986/ --only S1,S2,S3
 *   pnpm e2e -- --headed
 *   pnpm e2e -- --clear-history   # S15
 *   pnpm e2e -- --uninstall       # S23
 */
import { mkdirSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { chromium } from 'playwright'
import { createReport } from './lib/report.mjs'
import { wait } from './lib/ui.mjs'
import * as gestures from './scenarios/gestures.mjs'
import * as draw from './scenarios/draw.mjs'
import * as chat from './scenarios/chat.mjs'
import * as history from './scenarios/history.mjs'
import * as settings from './scenarios/settings.mjs'
import * as install from './scenarios/install.mjs'

function parseArgs(argv) {
  const flags = {
    url: 'http://127.0.0.1:57986/',
    headed: false,
    clearHistory: false,
    uninstall: false,
    headless: false,
    only: [],
  }
  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i]
    if (arg === '--headed') flags.headed = true
    else if (arg === '--clear-history') flags.clearHistory = true
    else if (arg === '--uninstall') flags.uninstall = true
    else if (arg === '--headless-profile') flags.headless = true
    else if (arg === '--url') flags.url = argv[++i]
    else if (arg === '--only') flags.only = argv[++i].split(',').map((id) => id.trim()).filter(Boolean)
  }
  return flags
}

const root = join(dirname(fileURLToPath(import.meta.url)), '../..')
const out = join(root, 'scripts/e2e/out')
mkdirSync(out, { recursive: true })

const flags = parseArgs(process.argv.slice(2))
const report = createReport()
const ctx = { page: null, out, report, flags, only: flags.only, s5Cards: [], s5Question: '' }

console.log(`e2e → ${flags.url}  headed=${flags.headed}  only=${flags.only.join(',') || 'all'}`)
console.log('对照 design/2026-08-27-01-端到端测试场景.md')
console.log('先保证：dsh plugin --profile web add . && dsh web')

const browser = await chromium.launch({
  channel: 'chrome',
  headless: !flags.headed,
}).catch(() => chromium.launch({ headless: !flags.headed }))
const page = await (await browser.newContext({
  viewport: { width: 1440, height: 900 },
  acceptDownloads: true,
})).newPage()
page.setDefaultTimeout(15000)
ctx.page = page

async function runGroup(label, fn) {
  try {
    await fn(ctx)
  } catch (error) {
    report.rec(label, 'group', 'fail', [{
      name: 'uncaught',
      ok: false,
      detail: String(error?.stack || error).slice(0, 800),
    }])
    await page.screenshot({ path: join(out, `${label}-crash.png`), fullPage: true }).catch(() => undefined)
  }
}

try {
  await page.goto(flags.url, { waitUntil: 'domcontentloaded' })
  await page.waitForSelector('.dsh-lumina-float', { timeout: 20000 })
  await wait(800)
  await runGroup('gestures', gestures.run)
  await runGroup('draw', draw.run)
  await runGroup('chat', chat.run)
  await runGroup('history', history.run)
  await runGroup('settings', settings.run)
  await runGroup('install', install.run)
} catch (error) {
  report.rec('RUN', 'runner', 'fail', [{ name: 'uncaught', ok: false, detail: String(error?.stack || error) }])
  await page.screenshot({ path: join(out, 'zz-crash.png'), fullPage: true }).catch(() => undefined)
} finally {
  writeFileSync(join(out, 'results.json'), JSON.stringify({ results: report.results, flags }, null, 2))
  const failed = report.summary()
  console.log(`screenshots → ${out}`)
  await browser.close()
  process.exit(failed ? 1 : 0)
}
