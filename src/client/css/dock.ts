export const DOCK_CSS = `
.dsh-lumina {
  font-family: ui-serif, Georgia, 'Times New Roman', serif;
  color: hsl(var(--lumina-fg));
}
.dsh-lumina-dock { pointer-events: none; }
.dsh-lumina-dismiss {
  position: fixed;
  inset: 0;
  z-index: 2147482999;
  pointer-events: auto;
}
.dsh-lumina[data-theme='mystic'] {
  --lumina-bg: 230 30% 7%;
  --lumina-fg: 43 60% 90%;
  --lumina-card: 229 35% 12%;
  --lumina-ink: 38 47% 58%;
  --lumina-muted: 43 25% 65%;
  --lumina-border: 38 47% 25%;
  --lumina-panel: 229 35% 12%;
}
.dsh-lumina[data-theme='minimal'] {
  --lumina-bg: 42 35% 97%;
  --lumina-fg: 0 0% 15%;
  --lumina-card: 0 0% 100%;
  --lumina-ink: 0 0% 12%;
  --lumina-muted: 0 0% 45%;
  --lumina-border: 40 18% 88%;
  --lumina-panel: 0 0% 100%;
}
.dsh-lumina[data-theme='nature'] {
  --lumina-bg: 37 67% 93%;
  --lumina-fg: 18 25% 23%;
  --lumina-card: 38 48% 89%;
  --lumina-ink: 18 42% 45%;
  --lumina-muted: 18 15% 40%;
  --lumina-border: 30 30% 75%;
  --lumina-panel: 38 48% 89%;
}
.dsh-lumina-float {
  position: fixed;
  z-index: 2147483000;
  width: 48px;
  height: 83px;
  pointer-events: auto;
  touch-action: none;
  cursor: grab;
  user-select: none;
}
.dsh-lumina-float:active { cursor: grabbing; }
.dsh-lumina-cardback {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  background: hsl(var(--lumina-card));
  color: hsl(var(--lumina-ink));
  border: 1px solid hsl(var(--lumina-border));
  box-shadow: 0 6px 16px rgba(0,0,0,0.32);
}
.dsh-lumina-cardback svg,
.dsh-lumina-cardback img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}
.dsh-lumina-cardback img {
  object-fit: cover;
}
.dsh-lumina-cardback[data-anim='full'] {
  animation: dsh-lumina-breathe 3.6s ease-in-out infinite;
}
@keyframes dsh-lumina-breathe {
  0%, 100% { box-shadow: 0 10px 28px rgba(0,0,0,0.32); }
  50% { box-shadow: 0 14px 36px rgba(0,0,0,0.45); }
}
.dsh-lumina-spreads {
  position: fixed;
  z-index: 2147483001;
  width: 0;
  height: 0;
  pointer-events: none;
}
.dsh-lumina-spread {
  pointer-events: auto;
  position: absolute;
  left: 0;
  top: 0;
  padding: 0;
  appearance: none;
  border: none;
  background: transparent;
  color: inherit;
  font: inherit;
  cursor: pointer;
  transform-origin: 50% 50%;
  transform: rotate(var(--a, 0deg)) translateY(calc(-1 * var(--r, 96px)));
  animation: dsh-lumina-fan-out 240ms ease-out both;
  animation-delay: calc(var(--i, 0) * 40ms);
}
.dsh-lumina-spread-face {
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  padding: 4px 3px;
  border: 1px solid hsl(var(--lumina-border));
  border-radius: inherit;
  background: hsl(var(--lumina-card));
  color: hsl(var(--lumina-fg));
  font: inherit;
  font-size: 10px;
  line-height: 1.2;
  text-align: center;
  word-break: break-word;
  box-shadow: 0 6px 12px rgba(0,0,0,0.24);
  transform: translateY(0) scale(1);
  transition: transform 180ms cubic-bezier(0.22, 1, 0.36, 1), box-shadow 180ms ease;
}
.dsh-lumina-spread[data-on='1'] .dsh-lumina-spread-face {
  background: hsl(var(--lumina-ink));
  color: hsl(var(--lumina-card));
}
.dsh-lumina-spread:hover:not(:disabled) {
  z-index: 8;
}
.dsh-lumina-spread:hover:not(:disabled) .dsh-lumina-spread-face {
  transform: translateY(-12px) scale(1.06);
  box-shadow: 0 14px 28px rgba(0,0,0,0.4);
}
.dsh-lumina-spread:focus-visible {
  outline: none;
}
.dsh-lumina-spread:focus-visible .dsh-lumina-spread-face {
  outline: 1px solid hsl(var(--lumina-ink));
  outline-offset: 2px;
}
.dsh-lumina-spread:disabled { opacity: 0.45; cursor: not-allowed; }
.dsh-lumina-spread.is-action {
  width: max-content;
  height: auto;
  overflow: visible;
  transform: translate(-50%, -50%) rotate(var(--a, 0deg)) translateY(calc(-1 * var(--r, 96px))) rotate(calc(-1 * var(--a, 0deg)));
  animation-name: dsh-lumina-action-fan;
}
.dsh-lumina-spread.is-action .dsh-lumina-spread-face {
  display: inline-flex;
  width: auto;
  height: auto;
  min-height: 20px;
  padding: 2px 8px;
  border-radius: 999px;
  background: hsl(var(--lumina-ink));
  color: hsl(var(--lumina-card));
  font-size: 10px;
  font-weight: 500;
  letter-spacing: 0.02em;
  line-height: 1.2;
  white-space: nowrap;
  word-break: keep-all;
  box-shadow: 0 4px 10px rgba(0,0,0,0.22);
  transform: none;
}
.dsh-lumina-spread.is-action:hover:not(:disabled) .dsh-lumina-spread-face {
  transform: scale(1.04);
  filter: brightness(1.08);
  box-shadow: 0 8px 16px rgba(0,0,0,0.32);
}
.dsh-lumina-spread.is-action:focus-visible .dsh-lumina-spread-face {
  outline: 1px solid hsl(var(--lumina-ink));
  outline-offset: 3px;
}
@keyframes dsh-lumina-fan-out {
  from { opacity: 0; transform: rotate(var(--a, 0deg)) translateY(-24px); }
  to { opacity: 1; transform: rotate(var(--a, 0deg)) translateY(calc(-1 * var(--r, 96px))); }
}
@keyframes dsh-lumina-action-fan {
  from {
    opacity: 0;
    transform: translate(-50%, -50%) rotate(var(--a, 0deg)) translateY(-24px) rotate(calc(-1 * var(--a, 0deg)));
  }
  to {
    opacity: 1;
    transform: translate(-50%, -50%) rotate(var(--a, 0deg)) translateY(calc(-1 * var(--r, 96px))) rotate(calc(-1 * var(--a, 0deg)));
  }
}
`
