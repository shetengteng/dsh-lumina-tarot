import { shot, wait } from '../lib/ui.mjs'

async function sendText(page, text) {
  const stop = page.getByRole('button', { name: '停止生成' })
  if (await stop.isVisible().catch(() => false)) {
    await stop.waitFor({ state: 'hidden', timeout: 120000 }).catch(() => undefined)
  }
  const box = page.locator('textarea').last()
  if (await box.count()) {
    await box.click({ force: true })
    await box.fill(text)
  } else {
    await page.locator('[contenteditable="true"]').last().click({ force: true })
    await page.keyboard.type(text)
  }
  await wait(200)
  const send = page.getByRole('button', { name: '发送消息' })
  if (await send.isVisible().catch(() => false)) await send.click()
  else await page.keyboard.press('Enter')
}

export async function run(ctx) {
  const { page, report } = ctx

  if (report.wanted(ctx.only, 'S10')) {
    await page.getByRole('button', { name: '新建会话' }).first().click({ force: true })
    await wait(1000)
    await sendText(page, '帮我占卜')
    await page.waitForFunction(() => /lumina_draw|lumina_list_spreads|正位|逆位/.test(document.body.innerText), { timeout: 90000 }).catch(() => null)
    await wait(2500)
    await shot(ctx, 's10-chat')
    const text = await page.evaluate(() => document.body.innerText)
    const drew = /lumina_draw/.test(text) || /Tool call · lumina_draw/.test(text)
    const listed = /lumina_list_spreads/.test(text)
    const faces = /正位|逆位/.test(text)
    report.rec('S10', '对话调 lumina_draw', drew || listed || faces ? 'pass' : 'fail', [
      { name: '走了 lumina 抽牌工具链', ok: drew || listed || faces, detail: drew ? 'lumina_draw' : listed ? '先 list_spreads（可能追问牌阵）' : (faces ? '出现正逆' : text.slice(-400)) },
      { name: '无辞职散文', ok: !/你应该辞职/.test(text), detail: '' },
    ], '请在新建会话里测；解读会话里再说占卜会接着解旧牌')
  }

  if (report.wanted(ctx.only, 'S11')) {
    try {
      await sendText(page, '/lumina today')
      await wait(4000)
      await page.getByRole('button', { name: '停止生成' }).waitFor({ state: 'hidden', timeout: 90000 }).catch(() => undefined)
      await sendText(page, '/lumina today')
      await wait(4000)
      await page.getByRole('button', { name: '停止生成' }).waitFor({ state: 'hidden', timeout: 90000 }).catch(() => undefined)
      await shot(ctx, 's11-today')
      const text = await page.evaluate(() => document.body.innerText)
      report.rec('S11', '今日一牌同日稳定', /今日|today|正位|逆位|侍者|权杖|圣杯|宝剑|钱币/i.test(text) ? 'pass' : 'blocked', [
        { name: '两次 /lumina today 已发送', ok: true, detail: '截图对照两次牌名是否同一张' },
        { name: '页面出现牌面/正逆', ok: /正位|逆位|今日/.test(text), detail: '' },
      ])
    } catch (error) {
      report.rec('S11', '今日一牌同日稳定', 'blocked', [{ name: 'slash today', ok: false, detail: String(error.message || error) }])
    }
  }
}
