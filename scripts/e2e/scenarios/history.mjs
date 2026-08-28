import { readFileSync } from 'node:fs'
import { allOk, clickFan, clickFloat, closeSettings, dismissOverlays, openLuminaSettings, readFaces, shot, wait, waitFan, waitResult } from '../lib/ui.mjs'

export async function run(ctx) {
  const { page, report } = ctx

  if (report.wanted(ctx.only, 'S12')) {
    await dismissOverlays(page)
    await clickFloat(page, { button: 'right' })
    await waitFan(page)
    await clickFan(page, /上次结果|Last result/)
    await waitResult(page, 15000)
    await wait(400)
    const last = await readFaces(page)
    await shot(ctx, 's12-last')
    report.rec('S12', '上次结果', last.length > 0 ? 'pass' : 'fail', [
      { name: '打开上次结果', ok: last.length > 0, detail: JSON.stringify(last) },
    ])
    await page.locator('.dsh-lumina-iconbtn[aria-label="关闭"], .dsh-lumina-iconbtn[aria-label="Close"]').click().catch(() => undefined)
  }

  if (report.wanted(ctx.only, 'S13')) {
    await clickFloat(page, { button: 'right' })
    await waitFan(page)
    await clickFan(page, /查看历史|View history/)
    await page.waitForSelector('.dsh-lumina-history', { timeout: 10000 })
    await wait(600)
    await shot(ctx, 's13-history')
    const hist = await page.evaluate(() => ({
      items: document.querySelectorAll('.dsh-lumina-history-item').length,
    }))
    let opened = false
    if (hist.items) {
      await page.locator('.dsh-lumina-history-item').first().click()
      await wait(500)
      opened = await page.locator('.dsh-lumina-history-item.is-open, .dsh-lumina-history-detail').count() > 0
      await shot(ctx, 's13-open-item')
    }
    report.rec('S13', '查看历史', hist.items > 0 && opened ? 'pass' : 'fail', [
      { name: '列表有记录', ok: hist.items > 0, detail: `items=${hist.items}` },
      { name: '点一条能展开', ok: opened, detail: '历史项就地展开，不是结果面板' },
    ])
    await page.keyboard.press('Escape')
    await wait(300)
  }

  if (report.wanted(ctx.only, 'S14')) {
    await openLuminaSettings(page)
    const download = page.waitForEvent('download', { timeout: 10000 }).catch(() => null)
    await page.getByRole('button', { name: /导出 JSON|Export JSON/ }).click()
    const dl = await download
    let parsed = null
    let parseOk = false
    let keysOk = false
    let hasDraw = false
    if (dl) {
      const dest = `${ctx.out}/export.json`
      await dl.saveAs(dest)
      try {
        parsed = JSON.parse(readFileSync(dest, 'utf8'))
        parseOk = true
        keysOk = parsed && parsed.exportedAt && parsed.theme && Array.isArray(parsed.history)
        hasDraw = parsed.history.some((row) => row.spreadId && Array.isArray(row.cards) && row.cards.length)
      } catch {
        parseOk = false
      }
    }
    report.rec('S14', '导出 JSON', parseOk && keysOk && hasDraw ? 'pass' : 'fail', [
      { name: '能下载并 JSON.parse', ok: parseOk, detail: dl ? dl.suggestedFilename() : '无 download 事件' },
      { name: '顶层 exportedAt/theme/history', ok: keysOk, detail: parsed ? Object.keys(parsed).join(',') : '' },
      { name: '含抽过的记录', ok: hasDraw, detail: parsed?.history?.length ?? 0 },
    ])
  }

  if (report.wanted(ctx.only, 'S15')) {
    if (!ctx.flags.clearHistory) {
      report.rec('S15', '清空历史', 'skip', [{ name: '默认跳过', ok: true, detail: '加 --clear-history 才跑' }])
      return
    }
    await openLuminaSettings(page)
    let confirmMsg = ''
    page.once('dialog', async (dialog) => {
      confirmMsg = dialog.message()
      await dialog.accept()
    })
    await page.getByRole('button', { name: /清空全部历史|Clear all history/ }).click()
    await wait(900)
    await page.getByRole('button', { name: /查看历史|View history/ }).click()
    await wait(800)
    const empty = await page.evaluate(() => ({
      items: document.querySelectorAll('.dsh-lumina-history-item').length,
      text: document.querySelector('.dsh-lumina-history')?.innerText?.slice(0, 200) || '',
    }))
    await shot(ctx, 's15-history-empty')
    await page.keyboard.press('Escape')
    await closeSettings(page)
    await clickFloat(page, { button: 'right' })
    await waitFan(page)
    await clickFan(page, /上次结果|Last result/)
    await wait(1500)
    const lastFail = await page.evaluate(() => ({
      err: document.querySelector('.dsh-lumina-error')?.textContent || '',
      faces: document.querySelectorAll('.dsh-lumina-face').length,
    }))
    await shot(ctx, 's15-last-after-clear')
    const checks = [
      { name: '确认文案', ok: /将清空所有占卜历史|erase all readings/.test(confirmMsg), detail: confirmMsg },
      { name: '清空后列表为空', ok: empty.items === 0, detail: empty.text },
      { name: '上次结果失败/无牌', ok: lastFail.faces === 0, detail: lastFail.err || 'no faces' },
    ]
    report.rec('S15', '清空历史', allOk(checks) ? 'pass' : 'fail', checks)
  }
}
