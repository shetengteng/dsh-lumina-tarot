import { GUIDE_CSS } from '../css/settings-guide.ts'

const SETTINGS_STYLE_ID = 'dsh-lumina-tarot-settings-css'
const SETTINGS_FONT_ID = 'dsh-lumina-tarot-font'

function ensureBrandFont(): void {
  if (typeof document === 'undefined' || !document.head) return
  if (document.getElementById(SETTINGS_FONT_ID)) return
  const pre = document.createElement('link')
  pre.rel = 'preconnect'
  pre.href = 'https://fonts.googleapis.com'
  document.head.appendChild(pre)
  const link = document.createElement('link')
  link.id = SETTINGS_FONT_ID
  link.rel = 'stylesheet'
  link.href = 'https://fonts.googleapis.com/css2?family=Cinzel:wght@500;600&display=swap'
  document.head.appendChild(link)
}

export function ensureSettingsStyles(): void {
  if (typeof document === 'undefined' || !document.head) return
  ensureBrandFont()
  let style = document.getElementById(SETTINGS_STYLE_ID) as HTMLStyleElement | null
  if (!style) {
    style = document.createElement('style')
    style.id = SETTINGS_STYLE_ID
    document.head.appendChild(style)
  }
  style.textContent = `
.lumina-set {
  font: inherit;
  color: var(--dsw-alias-label-primary);
  max-width: 560px;
  padding: 4px 0 28px;
}
.lumina-set-hero {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 12px;
  padding: 8px 0 16px;
  border-bottom: 1px solid var(--dsw-alias-border-l2);
}
.lumina-set-logo {
  width: 36px;
  height: 36px;
  flex-shrink: 0;
  display: block;
  margin-top: 2px;
  border-radius: 8px;
}
.lumina-set-hero-text {
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-width: 0;
}
.lumina-set-head {
  margin: 0;
  font-family: 'Cinzel', 'Cormorant Garamond', 'Noto Serif SC', 'PingFang SC', 'Songti SC', serif;
  font-size: 22px;
  font-weight: 500;
  line-height: 30px;
  letter-spacing: 0.12em;
  color: var(--dsw-alias-label-primary);
}
.lumina-set-sub {
  margin: 0;
  font-size: 13px;
  line-height: 20px;
  color: var(--dsw-alias-label-tertiary);
}
.lumina-set-row {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 16px 0;
  border-bottom: 1px solid var(--dsw-alias-border-l2);
}
.lumina-set-row-text {
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 4px;
  min-width: 0;
  padding-right: 48px;
}
.lumina-set-title {
  margin: 0;
  font-size: 14px;
  font-weight: 400;
  line-height: 22px;
  color: var(--dsw-alias-label-primary);
}
.lumina-set-desc {
  margin: 0;
  font-size: 13px;
  line-height: 20px;
  color: var(--dsw-alias-label-tertiary);
}
.lumina-set-selector {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  height: 36px;
  padding: 0 14px;
  border: none;
  border-radius: 18px;
  background: var(--dsw-alias-bg-module-platform);
  color: var(--dsw-alias-label-primary);
  font: inherit;
  font-size: 14px;
  line-height: 22px;
  cursor: pointer;
  flex-shrink: 0;
}
.lumina-set-selector:hover {
  background: var(--dsw-alias-interactive-bg-hover);
}
.lumina-set-chevron {
  flex: none;
}
.lumina-set-range {
  flex: 0 0 120px;
  min-width: 72px;
  max-width: 120px;
}
.lumina-set-range input[type='range'] {
  width: 100%;
  accent-color: var(--dsw-alias-brand-primary);
}
.lumina-set-switch {
  box-sizing: border-box;
  position: relative;
  width: 36px;
  height: 20px;
  padding: 0;
  border: none;
  border-radius: 99px;
  background: var(--dsw-alias-label-dimmed);
  cursor: pointer;
  flex-shrink: 0;
  transition: background .15s ease;
}
.lumina-set-switch.is-on {
  background: var(--dsw-alias-label-primary);
}
.lumina-set-switch:focus-visible {
  outline: 1px solid var(--dsw-alias-label-primary);
  outline-offset: 2px;
}
.lumina-set-switch-knob {
  position: absolute;
  top: 2px;
  left: 2px;
  width: 16px;
  height: 16px;
  border-radius: 99px;
  background: #fff;
  transition: left .15s ease, background .15s ease;
}
.lumina-set-switch.is-on .lumina-set-switch-knob {
  left: 18px;
  background: var(--dsw-alias-bg-base);
}
.lumina-set-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  padding-top: 4px;
}
.lumina-set-about {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 16px 0;
}
.lumina-set-block {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 16px 0;
  border-bottom: 1px solid var(--dsw-alias-border-l2);
}
.lumina-set-cards {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 8px;
}
.lumina-set-card {
  box-sizing: border-box;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 10px 8px 12px;
  border: 1px solid var(--dsw-alias-border-l2);
  border-radius: 12px;
  background: transparent;
  color: inherit;
  font: inherit;
  cursor: pointer;
}
.lumina-set-card:hover:not(.is-on):not(.is-off) {
  background: var(--dsw-alias-interactive-bg-hover);
}
.lumina-set-card.is-on {
  background: var(--dsw-alias-bg-module-platform);
  border-color: var(--dsw-static-neutral-bluish-400, var(--dsw-alias-brand-primary));
}
.lumina-set-card.is-off {
  opacity: 0.58;
}
.lumina-set-card-preview {
  box-sizing: border-box;
  width: 68px;
  aspect-ratio: 5 / 8.6;
  overflow: hidden;
  border: 1px solid var(--dsw-alias-border-l2);
  border-radius: 6px;
  background: var(--dsw-alias-bg-module-platform);
  color: var(--dsw-alias-brand-primary);
  display: flex;
  align-items: center;
  justify-content: center;
}
.lumina-set-card-preview img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.lumina-set-card-preview svg {
  width: 100%;
  height: 100%;
  display: block;
}
.lumina-set-card-mark {
  font-size: 22px;
  line-height: 1;
}
.lumina-set-card-name {
  font-size: 13px;
  line-height: 18px;
  color: var(--dsw-alias-label-primary);
  text-align: center;
}
.lumina-set-card-check,
.lumina-set-card-badge {
  position: absolute;
  top: 6px;
  right: 6px;
  border-radius: 999px;
  font-size: 10px;
  line-height: 16px;
  padding: 0 6px;
}
.lumina-set-card-check {
  background: var(--dsw-alias-brand-primary);
  color: var(--dsw-alias-label-on-brand, #fff);
}
.lumina-set-card-badge {
  background: var(--dsw-alias-bg-module-platform);
  color: var(--dsw-alias-label-tertiary);
  border: 1px solid var(--dsw-alias-border-l2);
}
.lumina-set-card-preview.is-rws img {
  transform: scale(1.14);
}
.lumina-set-card-preview.is-minimal {
  background: transparent;
  border: none;
}
.lumina-set-card-preview.is-back {
  background: hsl(var(--lumina-card, 229 35% 12%));
  color: hsl(var(--lumina-ink, 38 47% 58%));
}
${GUIDE_CSS}
`
}
