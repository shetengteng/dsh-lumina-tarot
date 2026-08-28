import { closeSettings, openLuminaSettings, pickSelect, shot, wait } from '../lib/ui.mjs'

export async function run(ctx) {
  const { page, report } = ctx

  if (report.wanted(ctx.only, 'S16')) {
    await openLuminaSettings(page)
    await page.getByRole('button', { name: '通用设置' }).click({ force: true })
    await wait(300)
    const appearanceBefore = await page.evaluate(() => document.body.innerText.includes('浅色') && document.body.innerText.includes('深色'))
    await openLuminaSettings(page)
    const pairs = [
      [['现代极简', 'Modern Minimal'], 'minimal'],
      [['疗愈自然', 'Healing Nature'], 'nature'],
      [['神秘暗黑', 'Mystic Dark'], 'mystic'],
    ]
    const radii = {}
    for (const [options, id] of pairs) {
      await pickSelect(page, /主题|Theme/, options)
      radii[id] = await page.evaluate(() => ({
        theme: document.querySelector('.dsh-lumina')?.getAttribute('data-theme'),
        radius: document.querySelector('.dsh-lumina-cardback')
          ? getComputedStyle(document.querySelector('.dsh-lumina-cardback')).borderRadius
          : '',
      }))
    }
    await shot(ctx, 's16-theme')
    await page.getByRole('button', { name: '通用设置' }).click({ force: true })
    await wait(300)
    const appearanceAfter = await page.evaluate(() => document.body.innerText.includes('浅色') && document.body.innerText.includes('深色'))
    const ok = radii.mystic?.theme === 'mystic' && radii.minimal?.theme === 'minimal' && radii.nature?.theme === 'nature'
    report.rec('S16', '主题只染插件', ok && appearanceAfter ? 'pass' : 'fail', [
      { name: '悬浮牌主题跟随', ok, detail: JSON.stringify(radii) },
      { name: '壳外观选项仍在', ok: appearanceBefore && appearanceAfter, detail: '' },
    ])
  }

  if (report.wanted(ctx.only, 'S17')) {
    await openLuminaSettings(page)
    const artState = async () => page.evaluate(() => {
      const titles = [...document.querySelectorAll('.lumina-set-title')].map((el) => el.textContent.trim())
      return {
        backs: titles.includes('牌背图案') || titles.includes('Card back'),
        minor: titles.includes('小阿卡那插画风格') || titles.includes('Minor Arcana art'),
        backCount: document.querySelectorAll('.lumina-set-card-preview.is-back').length,
      }
    })
    const clickArt = async (names) => {
      for (const name of names) {
        const loc = page.locator('.lumina-set-card', { hasText: name })
        if (await loc.count()) {
          await loc.click()
          return
        }
      }
      throw new Error(`art option not found: ${names.join(' / ')}`)
    }
    await clickArt(['经典韦特', 'Classic Waite'])
    await wait(400)
    const rws = await artState()
    await clickArt(['极简', 'Minimal'])
    await wait(400)
    const mini = await artState()
    await clickArt(['水彩重绘', 'Watercolour'])
    await wait(400)
    const aqua = await artState()
    await clickArt(['极简', 'Minimal'])
    await wait(400)
    const mini2 = await artState()
    await shot(ctx, 's17-art')
    const ok = !rws.backs && mini.backs && mini.backCount >= 5 && !aqua.backs && mini2.backs
    report.rec('S17', '卡面与牌背联动', ok ? 'pass' : 'fail', [
      { name: '非极简隐藏牌背/小阿', ok: !rws.backs && !rws.minor && !aqua.backs, detail: JSON.stringify({ rws, aqua }) },
      { name: '极简五种牌背', ok: mini.backs && mini.backCount >= 5, detail: JSON.stringify(mini) },
      { name: '切回极简牌背回来', ok: mini2.backs, detail: JSON.stringify(mini2) },
    ])
  }

  if (report.wanted(ctx.only, 'S18')) {
    await openLuminaSettings(page)
    const head0 = await page.locator('.lumina-set-head').innerText()
    const en = /Tarot/i.test(head0)
    await pickSelect(page, /语言|Language/, en ? ['English'] : ['英语', 'English'])
    await wait(400)
    const enHead = await page.locator('.lumina-set-head').innerText()
    const enBody = await page.locator('.lumina-set').innerText()
    await pickSelect(page, /Language|语言/, ['Chinese', '中文'])
    await wait(400)
    const zhHead = await page.locator('.lumina-set-head').innerText()
    await pickSelect(page, /语言|Language/, ['跟随', 'Follow'])
    report.rec('S18', '语言跟随/插件内切换', /Tarot/i.test(enHead) && /塔罗/.test(zhHead) ? 'pass' : 'fail', [
      { name: '插件英语（壳仍中文）', ok: /Tarot|Language|Theme/i.test(enBody), detail: enHead },
      { name: '插件中文', ok: /塔罗/.test(zhHead), detail: zhHead },
    ], '不改 DSH 壳语言')
  }

  if (report.wanted(ctx.only, 'S19')) {
    await openLuminaSettings(page)
    await page.locator('button[role="switch"][aria-label="显示卡牌"], button[role="switch"][aria-label="Show card"]').click()
    await wait(400)
    await closeSettings(page)
    const hidden = await page.locator('.dsh-lumina-float').count()
    await shot(ctx, 's19-hidden')
    await openLuminaSettings(page)
    await page.locator('button[role="switch"][aria-label="显示卡牌"], button[role="switch"][aria-label="Show card"]').click()
    await wait(400)
    await closeSettings(page)
    const shown = await page.locator('.dsh-lumina-float').count()
    await shot(ctx, 's19-shown')
    report.rec('S19', '隐藏悬浮牌', hidden === 0 && shown === 1 ? 'pass' : 'fail', [
      { name: '关掉后无牌背', ok: hidden === 0, detail: `count=${hidden}` },
      { name: '打开后牌背回来', ok: shown === 1, detail: `count=${shown}` },
    ])
  }

  if (report.wanted(ctx.only, 'S20')) {
    const box = await page.locator('.dsh-lumina-float').boundingBox()
    await page.mouse.move(box.x + 24, box.y + 40)
    await page.mouse.down()
    await page.mouse.move(160, 160, { steps: 6 })
    await page.mouse.up()
    await wait(500)
    const dragged = await page.locator('.dsh-lumina-float').boundingBox()
    await openLuminaSettings(page)
    const hasXY = await page.evaluate(() => /floatX|X\s*\/\s*Y|坐标/.test(document.querySelector('.lumina-set')?.innerText || ''))
    await page.locator('.lumina-set-row', { hasText: /重置悬浮|Reset floating/ }).getByRole('button').click()
    await wait(700)
    await closeSettings(page)
    const after = await page.locator('.dsh-lumina-float').boundingBox()
    const expectedLeft = Math.round((1440 - 48) * 0.92)
    const expectedTop = Math.round((900 - 83) * 0.82)
    const near = Math.abs(after.x - expectedLeft) <= 18 && Math.abs(after.y - expectedTop) <= 18
    await shot(ctx, 's20-reset')
    report.rec('S20', '重置位置', near && !hasXY ? 'pass' : 'fail', [
      { name: '回到默认约 0.92/0.82', ok: near, detail: `drag ${Math.round(dragged.x)},${Math.round(dragged.y)} → ${Math.round(after.x)},${Math.round(after.y)} expected ${expectedLeft},${expectedTop}` },
      { name: '无 X/Y 数字输入', ok: !hasXY, detail: '' },
    ])
  }
}
