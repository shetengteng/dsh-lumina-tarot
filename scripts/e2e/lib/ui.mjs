export const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

export async function shot(ctx, name) {
  await ctx.page.screenshot({ path: `${ctx.out}/${name}.png`, fullPage: true })
}

export function clickFloat(page, opts = {}) {
  return page.locator('.dsh-lumina-float').click({ force: true, ...opts })
}

export async function waitFan(page) {
  await page.waitForSelector('.dsh-lumina-spread-face', { timeout: 8000 })
  await wait(350)
}

export async function clickFan(page, text) {
  await page.locator('.dsh-lumina-spread-face', { hasText: text }).click({ force: true })
  await wait(300)
}

export async function openLuminaSettings(page) {
  const tab = page.getByRole('button', { name: /Lumina/ })
  if (!(await tab.isVisible().catch(() => false))) {
    await page.getByRole('button', { name: /设置|Settings/ }).first().click({ force: true })
    await wait(500)
  }
  await page.getByRole('button', { name: /Lumina/ }).click({ force: true })
  await page.waitForSelector('.lumina-set .lumina-set-selector', { timeout: 10000 })
  await wait(300)
}

export async function closeSettings(page) {
  await page.keyboard.press('Escape')
  await wait(150)
  const close = page.locator('button.VOzbGW_close')
  if (await close.isVisible().catch(() => false)) await close.click({ force: true })
  await page.locator('.VOzbGW_mask').waitFor({ state: 'hidden', timeout: 5000 }).catch(async () => {
    await page.keyboard.press('Escape')
  })
  await wait(250)
}

export async function pickSelect(page, rowHint, option) {
  const row = page.locator('.lumina-set-row', { hasText: rowHint }).first()
  await row.locator('.lumina-set-selector').click()
  await wait(200)
  const names = Array.isArray(option) ? option : [option]
  for (const name of names) {
    const item = page.getByRole('menuitem', { name, exact: true })
    if (await item.count()) {
      await item.first().click()
      await page.keyboard.press('Escape')
      await wait(350)
      return
    }
  }
  throw new Error(`menu option not found: ${names.join(' / ')}`)
}

export async function dismissOverlays(page) {
  await page.keyboard.press('Escape')
  await wait(200)
  const closeAsk = page.locator('.dsh-lumina-ask .dsh-lumina-cta.is-ghost')
  if (await closeAsk.isVisible().catch(() => false)) await closeAsk.click()
  const closePanel = page.locator('.dsh-lumina-iconbtn[aria-label="关闭"], .dsh-lumina-iconbtn[aria-label="Close"]')
  if (await closePanel.isVisible().catch(() => false)) await closePanel.click()
  await wait(200)
}

export async function readFaces(page) {
  return page.evaluate(() => [...document.querySelectorAll('.dsh-lumina-face')].map((el) => {
    const pos = el.querySelector('.meta.row span')?.textContent?.trim() || ''
    const name = el.querySelector('.nm')?.textContent?.trim() || ''
    const ori = [...el.querySelectorAll('.meta')]
      .map((node) => node.textContent.trim())
      .find((text) => /正位|逆位|Upright|Reversed/.test(text)) || ''
    return { pos, name, ori }
  }))
}

export async function submitAsk(page, question) {
  await page.waitForSelector('#dsh-lumina-ask-q', { timeout: 8000 })
  await page.fill('#dsh-lumina-ask-q', question)
  await page.locator('.dsh-lumina-ask .dsh-lumina-cta:not(.is-ghost)').click()
}

export async function waitResult(page, timeout = 25000) {
  await page.waitForFunction(() => {
    const err = document.querySelector('.dsh-lumina-error')
    const grid = document.querySelector('.dsh-lumina-grid')
    return Boolean(err || (grid && grid.querySelector('.dsh-lumina-face')))
  }, { timeout })
}

export function allOk(checks) {
  return checks.every((check) => check.ok)
}
