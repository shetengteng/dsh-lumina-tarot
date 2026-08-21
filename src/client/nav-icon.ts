import type { LocaleHandle } from './i18n.ts'
import { watchLuminaConfig } from './store.ts'

const NS = 'http://www.w3.org/2000/svg'

function roundedRect(x: number, y: number, w: number, h: number, r: number): string {
  const rr = Math.min(r, w / 2, h / 2)
  return [
    `M${x + rr} ${y}`,
    `H${x + w - rr}`,
    `A${rr} ${rr} 0 0 1 ${x + w} ${y + rr}`,
    `V${y + h - rr}`,
    `A${rr} ${rr} 0 0 1 ${x + w - rr} ${y + h}`,
    `H${x + rr}`,
    `A${rr} ${rr} 0 0 1 ${x} ${y + h - rr}`,
    `V${y + rr}`,
    `A${rr} ${rr} 0 0 1 ${x + rr} ${y}`,
    'Z',
  ].join(' ')
}

function ring(x: number, y: number, w: number, h: number, r: number, t: number): string {
  return `${roundedRect(x, y, w, h, r)} ${roundedRect(x + t, y + t, w - t * 2, h - t * 2, Math.max(0.25, r - t))}`
}

function createCardSvg(): SVGSVGElement {
  const svg = document.createElementNS(NS, 'svg')
  svg.setAttribute('viewBox', '0 0 16 16')
  svg.setAttribute('fill', 'none')
  svg.setAttribute('aria-hidden', 'true')
  svg.setAttribute('data-lumina-card', '2')

  const face = document.createElementNS(NS, 'path')
  face.setAttribute('d', ring(3, 1, 10, 14, 2, 1.5))
  face.setAttribute('fill', 'currentColor')
  face.setAttribute('fill-rule', 'evenodd')

  const diamond = document.createElementNS(NS, 'path')
  diamond.setAttribute('d', [
    'M8 4.75 L11 8 L8 11.25 L5 8 Z',
    'M8 6.35 L9.4 8 L8 9.65 L6.6 8 Z',
  ].join(' '))
  diamond.setAttribute('fill', 'currentColor')
  diamond.setAttribute('fill-rule', 'evenodd')

  svg.append(face, diamond)
  return svg
}

function isLuminaNavButton(button: Element): boolean {
  if (button.getAttribute('data-lumina-nav') === '1') return true
  const label = button.querySelector('span')?.textContent?.trim()
  return label === 'Lumina 塔罗' || label === 'Lumina Tarot'
}

function syncNav(getLabel: () => string): void {
  const label = getLabel()
  for (const button of document.querySelectorAll('button')) {
    if (!isLuminaNavButton(button)) continue
    button.setAttribute('data-lumina-nav', '1')
    const span = button.querySelector('span')
    if (span && span.textContent !== label) span.textContent = label
    const svg = button.querySelector('svg')
    if (!svg || svg.getAttribute('data-lumina-card') === '2') continue
    const next = createCardSvg()
    const cls = svg.getAttribute('class')
    if (cls) next.setAttribute('class', cls)
    next.setAttribute('width', svg.getAttribute('width') ?? '16')
    next.setAttribute('height', svg.getAttribute('height') ?? '16')
    svg.replaceWith(next)
  }
}

/** DSH nav icons are hardcoded by section id; unknown pages get a gear. Swap ours for a card. */
export function installLuminaNavIcon(getLabel: () => string, locale?: LocaleHandle): () => void {
  if (typeof document === 'undefined' || !document.body) return () => undefined
  const sync = () => syncNav(getLabel)
  const observer = new MutationObserver(sync)
  observer.observe(document.body, { childList: true, subtree: true })
  const offConfig = watchLuminaConfig(sync)
  const offLocale = locale?.subscribe?.(sync) ?? (() => undefined)
  sync()
  return () => {
    observer.disconnect()
    offConfig()
    offLocale()
  }
}
