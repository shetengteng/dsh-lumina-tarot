import {
  allOk,
  clickFan,
  clickFloat,
  closeSettings,
  dismissOverlays,
  openLuminaSettings,
  pickSelect,
  readFaces,
  shot,
  submitAsk,
  wait,
  waitFan,
  waitResult,
} from '../lib/ui.mjs'

export async function run(ctx) {
  const { page, report } = ctx

  if (report.wanted(ctx.only, 'S5') || report.wanted(ctx.only, 'S8') || report.wanted(ctx.only, 'S9')) {
    await openLuminaSettings(page)
    await pickSelect(page, /动画强度|Animation/, ['完整', 'Full']).catch(() => undefined)
    await pickSelect(page, /默认牌阵|Default spread/, ['三牌时间线', 'Three-Card Timeline']).catch(() => undefined)
    await closeSettings(page)
  }

  if (report.wanted(ctx.only, 'S5')) {
    await clickFloat(page)
    await submitAsk(page, '下一步工作该考虑什么')
    const loading = await page.waitForSelector('.dsh-lumina-caption', { timeout: 8000 })
      .then(async () => (await page.locator('.dsh-lumina-caption').innerText()).trim())
    await shot(ctx, 's5-loading')
    const stack = await page.locator('.dsh-lumina-mask').isVisible()
    await clickFloat(page).catch(() => undefined)
    await waitResult(page)
    await wait(600)
    let cards = await readFaces(page)
    if (cards.length && !cards.some((card) => /逆|Rev/.test(card.ori))) {
      await page.locator('.dsh-lumina-iconbtn[aria-label="再洗一次"], .dsh-lumina-iconbtn[aria-label="Shuffle again"]').click()
      await waitResult(page)
      await wait(500)
      cards = await readFaces(page)
    }
    await shot(ctx, 's5-result')
    const extra = await page.locator('.dsh-lumina-extra').count()
    const caption = await page.locator('.dsh-lumina-caption').innerText().catch(() => '')
    const question = await page.locator('.dsh-lumina-question').innerText().catch(() => '')
    const err = await page.locator('.dsh-lumina-error').innerText().catch(() => '')
    ctx.s5Cards = cards
    ctx.s5Question = '下一步工作该考虑什么'
    const checks = [
      { name: '洗牌 loading', ok: /洗牌中|抽牌中|Shuffling|Drawing/.test(loading) && stack, detail: loading },
      { name: '连点未并行第二套', ok: cards.length === 3, detail: `faces=${cards.length}` },
      { name: '三张真牌', ok: cards.length === 3 && cards.every((card) => card.name && card.ori), detail: JSON.stringify(cards) },
      { name: '牌阵名+问题', ok: /三牌|时间线|Three-Card/.test(caption) && question.includes('下一步工作'), detail: `${caption} ${question}` },
      { name: '情感/事业/建议可展开', ok: extra > 0, detail: extra ? '有 extra' : '无 extra' },
      { name: '无错误', ok: !err, detail: err },
    ]
    report.rec('S5', '三牌抽牌 + 洗牌 loading', allOk(checks) ? 'pass' : 'fail', checks)
  }

  if (report.wanted(ctx.only, 'S8') || report.wanted(ctx.only, 'S9')) {
    const cards = ctx.s5Cards || []
    const interpret = page.locator('.dsh-lumina-cta[aria-label="让 AI 解读"], .dsh-lumina-cta[aria-label="Ask AI to interpret"]')
    if (!(await interpret.isVisible().catch(() => false)) || !cards.length) {
      report.rec('S8', '解读对上面板', 'skip', [{ name: 'S5 面板可用', ok: false, detail: '没有结果面板' }])
      report.rec('S9', '解读过程没有另抽一套', 'skip', [{ name: '依赖 S8', ok: false, detail: '' }])
    } else {
      await interpret.click()
      await shot(ctx, 's8-clicked')
      const shuffledAtClick = await page.locator('.dsh-lumina-caption').filter({ hasText: /洗牌中|Shuffling/ }).count()
      await page.waitForFunction((q) => document.body.innerText.includes(q) || document.body.innerText.includes('lumina-interpret'), ctx.s5Question, { timeout: 25000 }).catch(() => null)
      await wait(1500)
      await shot(ctx, 's8-prompt')
      const body = await page.evaluate(() => document.body.innerText)
      const followupOk = body.includes('lumina-interpret') && /禁止改牌或重抽|do not change or redraw/i.test(body) && body.includes(ctx.s5Question)
      const facesMatch = cards.every((card) => body.includes(card.name))
      if (report.wanted(ctx.only, 'S8')) {
        report.rec('S8', '解读对上面板', followupOk && facesMatch ? 'pass' : 'fail', [
          { name: 'followup 含 skill 约束', ok: followupOk, detail: followupOk ? '见会话' : body.slice(0, 300) },
          { name: '牌名出现在会话', ok: facesMatch, detail: cards.map((card) => `${card.pos} ${card.name} ${card.ori}`).join(' · ') },
        ])
      }
      await page.waitForFunction((n) => document.body.innerText.length > n + 80, body.length, { timeout: 90000 }).catch(() => null)
      await wait(2000)
      await shot(ctx, 's8-reply')
      const later = await page.evaluate(() => document.body.innerText)
      const overlayShuffle = await page.locator('.dsh-lumina-caption').filter({ hasText: /洗牌中|抽牌中|Shuffling|Drawing/ }).count()
      const reshuffleTalk = /我重新抽了|换了一套/.test(later)
      const toolCard = /Tool call · lumina_draw|Tool call · lumina_today/.test(later)
      if (report.wanted(ctx.only, 'S9')) {
        report.rec('S9', '解读过程没有另抽一套', !toolCard && overlayShuffle === 0 && shuffledAtClick === 0 && !reshuffleTalk ? 'pass' : 'fail', [
          { name: '无新 lumina_draw/today 工具调用', ok: !toolCard, detail: toolCard ? '出现 Tool call' : '轨迹里的技能名不算工具卡' },
          { name: 'overlay 未再洗牌', ok: overlayShuffle === 0 && shuffledAtClick === 0, detail: '' },
          { name: '正文未声称重抽', ok: !reshuffleTalk, detail: '' },
        ])
      }
    }
  }

  if (report.wanted(ctx.only, 'S6')) {
    await dismissOverlays(page)
    await openLuminaSettings(page)
    await pickSelect(page, /动画强度|Animation/, ['关闭', 'Off'])
    await closeSettings(page)
    await clickFloat(page)
    await submitAsk(page, '动画关闭时的抽牌')
    const cap = await page.waitForSelector('.dsh-lumina-caption', { timeout: 8000 })
      .then(async () => (await page.locator('.dsh-lumina-caption').innerText()).trim())
    await shot(ctx, 's6-loading')
    await waitResult(page)
    await wait(400)
    const faces = await readFaces(page)
    await shot(ctx, 's6-result')
    const checks = [
      { name: '文案为抽牌中', ok: /抽牌中|Drawing|洗牌中|Shuffling/.test(cap), detail: cap },
      { name: '仍出真牌', ok: faces.length >= 1 && faces.every((card) => card.name && card.ori), detail: JSON.stringify(faces) },
    ]
    report.rec('S6', '动画关闭仍出真牌', allOk(checks) ? 'pass' : 'fail', checks)
    await page.locator('.dsh-lumina-iconbtn[aria-label="关闭"], .dsh-lumina-iconbtn[aria-label="Close"]').click().catch(() => undefined)
    await openLuminaSettings(page)
    await pickSelect(page, /动画强度|Animation/, ['完整', 'Full'])
    await closeSettings(page)
  }

  if (report.wanted(ctx.only, 'S7')) {
    await clickFloat(page, { button: 'right' })
    await waitFan(page)
    await clickFan(page, /十字|Cross/)
    await page.waitForSelector('#dsh-lumina-ask-q')
    const spreadLabel = await page.locator('.dsh-lumina-ask-spread').innerText()
    await shot(ctx, 's7-ask')
    await submitAsk(page, '换十字阵再抽')
    await waitResult(page)
    await wait(400)
    const faces = await readFaces(page)
    await shot(ctx, 's7-result')
    const checks = [
      { name: '提问框显示十字', ok: /十字|Cross/.test(spreadLabel), detail: spreadLabel },
      { name: '结果 5 张', ok: faces.length === 5, detail: `got ${faces.length}` },
    ]
    report.rec('S7', '右击换阵再抽', allOk(checks) ? 'pass' : 'fail', checks)
    await page.locator('.dsh-lumina-iconbtn[aria-label="关闭"], .dsh-lumina-iconbtn[aria-label="Close"]').click().catch(() => undefined)
  }
}
