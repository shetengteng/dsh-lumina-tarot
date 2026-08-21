import { ASK_CSS } from './css/ask.ts'
import { DOCK_CSS } from './css/dock.ts'
import { FX_CSS } from './css/fx.ts'
import { HISTORY_CSS } from './css/history.ts'
import { PANEL_CSS } from './css/panel.ts'
import { TOOL_CSS } from './css/tool.ts'

const STYLE_ID = 'dsh-lumina-tarot-css'
const FONT_ID = 'dsh-lumina-tarot-font'

function ensureBrandFont(): void {
  if (typeof document === 'undefined' || !document.head) return
  if (document.getElementById(FONT_ID)) return
  const link = document.createElement('link')
  link.id = FONT_ID
  link.rel = 'stylesheet'
  link.href = 'https://fonts.googleapis.com/css2?family=Cinzel:wght@500;600&display=swap'
  document.head.appendChild(link)
}

export function ensureStyles(): void {
  if (typeof document === 'undefined' || !document.head) return
  ensureBrandFont()
  let style = document.getElementById(STYLE_ID) as HTMLStyleElement | null
  if (!style) {
    style = document.createElement('style')
    style.id = STYLE_ID
    document.head.appendChild(style)
  }
  style.textContent = `${DOCK_CSS}${FX_CSS}${PANEL_CSS}${ASK_CSS}${HISTORY_CSS}${TOOL_CSS}`
  if (!style.parentNode) document.head.appendChild(style)
}
