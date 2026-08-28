import { allOk, clickFloat, shot, wait, waitFan } from '../lib/ui.mjs'

export async function run(ctx) {
  const { page, report } = ctx

  if (report.wanted(ctx.only, 'S1')) {
    const float = await page.evaluate(() => {
      const el = document.querySelector('.dsh-lumina-float')
      const back = document.querySelector('.dsh-lumina-cardback')
      const rect = el.getBoundingClientRect()
      return {
        w: Math.round(rect.width),
        h: Math.round(rect.height),
        left: Math.round(rect.left),
        top: Math.round(rect.top),
        title: el.getAttribute('title') || '',
        hasArt: Boolean(back?.querySelector('svg, img')),
        theme: document.querySelector('.dsh-lumina')?.getAttribute('data-theme'),
      }
    })
    await shot(ctx, 's1-idle')
    const checks = [
      { name: '牌背约 48×83', ok: float.w === 48 && float.h === 83, detail: `${float.w}×${float.h}` },
      { name: '比例 5:8.6', ok: Math.abs(float.w / float.h - 5 / 8.6) < 0.02, detail: (float.w / float.h).toFixed(3) },
      { name: '有牌背图', ok: float.hasArt, detail: float.title },
    ]
    report.rec('S1', '外观', allOk(checks) ? 'pass' : 'fail', checks, `theme=${float.theme}`)
  }

  if (report.wanted(ctx.only, 'S2')) {
    const before = await page.locator('.dsh-lumina-float').boundingBox()
    await page.mouse.move(before.x + before.width / 2, before.y + before.height / 2)
    await page.mouse.down()
    await page.mouse.move(before.x + before.width / 2 - 80, before.y + before.height / 2 - 90, { steps: 8 })
    await page.mouse.up()
    await wait(800)
    const mid = await page.evaluate(() => {
      const rect = document.querySelector('.dsh-lumina-float').getBoundingClientRect()
      return {
        left: Math.round(rect.left),
        top: Math.round(rect.top),
        ask: Boolean(document.querySelector('.dsh-lumina-ask-modal')),
        shuffle: (document.body.innerText || '').includes('洗牌中') || (document.body.innerText || '').includes('Shuffling'),
      }
    })
    await shot(ctx, 's2-dragged')
    await page.reload({ waitUntil: 'domcontentloaded' })
    await page.waitForSelector('.dsh-lumina-float', { timeout: 20000 })
    await wait(1200)
    const after = await page.evaluate(() => {
      const rect = document.querySelector('.dsh-lumina-float').getBoundingClientRect()
      return { left: Math.round(rect.left), top: Math.round(rect.top) }
    })
    await shot(ctx, 's2-after-reload')
    const checks = [
      { name: '拖动位移', ok: Math.abs(mid.left - Math.round(before.x)) >= 6, detail: `${Math.round(before.x)},${Math.round(before.y)} → ${mid.left},${mid.top}` },
      { name: '没有提问框/洗牌', ok: !mid.ask && !mid.shuffle, detail: `ask=${mid.ask} shuffle=${mid.shuffle}` },
      { name: '刷新后位置保持', ok: Math.abs(after.left - mid.left) <= 8 && Math.abs(after.top - mid.top) <= 8, detail: `reload ${after.left},${after.top}` },
    ]
    report.rec('S2', '拖动不抽牌', allOk(checks) ? 'pass' : 'fail', checks)
  }

  if (report.wanted(ctx.only, 'S3')) {
    await clickFloat(page)
    await page.waitForSelector('.dsh-lumina-ask-title', { timeout: 8000 })
    await shot(ctx, 's3-ask')
    const info = await page.evaluate(() => ({
      title: document.querySelector('.dsh-lumina-ask-title')?.textContent?.trim(),
      menu: Boolean(document.querySelector('.dsh-lumina-spread-face')),
    }))
    const checks = [
      { name: '提问框标题', ok: /写下你的问题|Write your question/.test(info.title || ''), detail: info.title },
      { name: '不是扇形菜单', ok: !info.menu, detail: '' },
    ]
    report.rec('S3', '单击进提问', allOk(checks) ? 'pass' : 'fail', checks)
    await page.locator('.dsh-lumina-ask .dsh-lumina-cta.is-ghost').click()
    await wait(300)
  }

  if (report.wanted(ctx.only, 'S4')) {
    await clickFloat(page, { button: 'right' })
    await waitFan(page)
    await shot(ctx, 's4-menu')
    const menu = await page.evaluate(() => ({
      labels: [...document.querySelectorAll('.dsh-lumina-spread-face')].map((el) => el.textContent.trim()),
      faceOpen: Boolean(document.querySelector('.dsh-lumina-grid')),
    }))
    const need = [/单张|Single/, /三牌|Three-Card/, /十字|Cross/, /凯尔特|Celtic/, /上次结果|Last result/, /查看历史|View history/]
    const forbid = /卡面主题|今日一牌|重置位置|Card art|Card of the day|Reset position/
    const checks = [
      { name: '扇形菜单出现', ok: menu.labels.length >= 6, detail: menu.labels.join(' / ') },
      { name: '含四种牌阵+上次+历史', ok: need.every((re) => menu.labels.some((label) => re.test(label))), detail: '' },
      { name: '无卡面主题/今日一牌/重置位置', ok: !forbid.test(menu.labels.join('')), detail: '' },
      { name: '牌未翻到正面', ok: !menu.faceOpen, detail: '' },
    ]
    report.rec('S4', '右击扇形菜单', allOk(checks) ? 'pass' : 'fail', checks)
    await page.keyboard.press('Escape')
    await wait(300)
  }
}
