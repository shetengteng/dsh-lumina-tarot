export const PANEL_CSS = `
.dsh-lumina-chip, .dsh-lumina-btn {
  appearance: none;
  border: 1px solid hsl(var(--lumina-border));
  background: transparent;
  color: inherit;
  font: inherit;
  font-size: 12px;
  padding: 5px 8px;
  border-radius: 8px;
  cursor: pointer;
}
.dsh-lumina-chip[data-on='1'] {
  background: hsl(var(--lumina-ink));
  color: hsl(var(--lumina-card));
}
.dsh-lumina-btn { width: 100%; text-align: left; margin-top: 4px; }
.dsh-lumina-chip:disabled,
.dsh-lumina-btn:disabled { opacity: 0.45; cursor: not-allowed; }
.dsh-lumina-stage {
  --lumina-overlay-fg: 43 28% 94%;
  --lumina-overlay-muted: 43 16% 78%;
  --lumina-overlay-halo: 0 1px 2px rgba(8, 10, 16, 0.78), 0 0 14px rgba(8, 10, 16, 0.42);
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  width: min(720px, calc(100vw - 32px));
  max-height: min(86vh, 760px);
  overflow: auto;
  padding: 24px 16px;
  background: none;
  border: none;
  box-shadow: none;
}
.dsh-lumina-shuffle {
  position: relative;
  width: 180px;
  height: 210px;
  margin: 24px auto 8px;
}
.dsh-lumina-shuffle-card {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 72px;
  height: 124px;
  transform-origin: 50% 50%;
  transform: translate(-50%, -50%) rotate(calc((var(--i) - 3) * 5deg)) translateY(calc((var(--i) - 3) * -3px));
}
.dsh-lumina-shuffle-card img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}
.dsh-lumina-shuffle-card.is-dancing {
  animation: dsh-lumina-shuffle-dance 1.8s ease-in-out infinite;
  animation-delay: calc(var(--i) * 80ms);
}
.dsh-lumina-shuffle[data-level='lite'] .dsh-lumina-shuffle-card.is-dancing {
  animation-duration: 1.1s;
}
@keyframes dsh-lumina-shuffle-dance {
  0% { transform: translate(-50%, -50%) rotate(calc((var(--i) - 3) * 5deg)) translateY(calc((var(--i) - 3) * -3px)); }
  25% { transform: translate(calc(-50% + 38px), -60%) rotate(calc((var(--i) - 3) * 16deg)) translateY(-14px); }
  50% { transform: translate(calc(-50% - 40px), -40%) rotate(calc((var(--i) - 3) * -14deg)) translateY(-4px); }
  75% { transform: translate(calc(-50% + 18px), -52%) rotate(calc((var(--i) - 3) * 8deg)) translateY(-10px); }
  100% { transform: translate(-50%, -50%) rotate(calc((var(--i) - 3) * 5deg)) translateY(calc((var(--i) - 3) * -3px)); }
}
.dsh-lumina-caption {
  text-align: center;
  font-size: 15px;
  margin: 0 0 8px;
  color: hsl(var(--lumina-overlay-fg));
  text-shadow: var(--lumina-overlay-halo);
}
.dsh-lumina-error {
  color: hsl(0 52% 72%);
  text-align: center;
  text-shadow: var(--lumina-overlay-halo);
}
.dsh-lumina-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  justify-content: center;
  margin: 12px 0 16px;
  perspective: 640px;
}
.dsh-lumina-face {
  width: 108px;
  min-height: 186px;
  padding: 10px 8px;
  border-radius: 8px;
  border: 1px solid hsl(var(--lumina-border));
  background: hsl(var(--lumina-card));
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.dsh-lumina-face.is-reveal {
  animation: dsh-lumina-flip-in 320ms ease both;
  animation-delay: calc(var(--i, 0) * 70ms);
}
.dsh-lumina-grid[data-level='off'] .dsh-lumina-face.is-reveal {
  animation: none;
}
@keyframes dsh-lumina-flip-in {
  from { opacity: 0; transform: rotateY(-70deg) translateY(8px); }
  to { opacity: 1; transform: none; }
}
.dsh-lumina-face .sym { font-size: 28px; text-align: center; line-height: 1; }
.dsh-lumina-face .nm { font-size: 13px; text-align: center; }
.dsh-lumina-face .meta { font-size: 11px; color: hsl(var(--lumina-muted)); text-align: center; }
.dsh-lumina-face .meta.row {
  display: flex;
  justify-content: space-between;
  gap: 6px;
}
.dsh-lumina-face .art,
.dsh-lumina-tool-face .art {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 64px;
  overflow: hidden;
  color: hsl(var(--lumina-ink));
}
.dsh-lumina-face .art img,
.dsh-lumina-tool-face .art img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}
.dsh-lumina-face .art img.is-rws,
.dsh-lumina-tool-face .art img.is-rws {
  transform: scale(1.14);
  transform-origin: center;
}
.dsh-lumina-face .art svg,
.dsh-lumina-tool-face .art svg {
  width: 78%;
  height: auto;
  max-height: 92px;
  pointer-events: none;
}
.dsh-lumina-tool-face .art svg { max-height: 92px; }
.dsh-lumina-face .art.is-reversed svg,
.dsh-lumina-tool-face .art.is-reversed svg,
.dsh-lumina-face .art.is-reversed .sym,
.dsh-lumina-tool-face .art.is-reversed .sym,
.dsh-lumina-face .art.is-reversed img,
.dsh-lumina-tool-face .art.is-reversed img {
  transform: rotate(180deg);
}
.dsh-lumina-face .art.is-reversed img.is-rws,
.dsh-lumina-tool-face .art.is-reversed img.is-rws {
  transform: rotate(180deg) scale(1.14);
}
.dsh-lumina-readings {
  width: 100%;
  max-width: 480px;
  margin: 4px 0 0;
  text-align: left;
  color: hsl(var(--lumina-overlay-fg));
  text-shadow: var(--lumina-overlay-halo);
}
.dsh-lumina-reading { margin: 0 0 12px; }
.dsh-lumina-reading .hd,
.dsh-lumina-fields .hd {
  font-size: 11px;
  letter-spacing: 0.04em;
  color: hsl(var(--lumina-overlay-muted));
}
.dsh-lumina-reading p { margin: 2px 0 0; font-size: 13px; line-height: 1.5; }
.dsh-lumina-extra {
  margin: 4px 0 0;
  padding: 8px 10px;
  border: 1px solid hsl(var(--lumina-overlay-fg) / 0.18);
  border-radius: 8px;
  background: rgba(8, 10, 16, 0.42);
}
.dsh-lumina-extra summary {
  cursor: pointer;
  font-size: 12px;
  color: hsl(var(--lumina-overlay-muted));
}
.dsh-lumina-extra summary:focus-visible {
  outline: 1px solid hsl(var(--lumina-ink));
  outline-offset: 2px;
}
.dsh-lumina-fields { margin: 8px 0 0; }
.dsh-lumina-fields p { margin: 4px 0 0; font-size: 12px; line-height: 1.5; }
.dsh-lumina-note {
  margin: 12px 0 0;
  font-size: 12px;
  color: hsl(var(--lumina-overlay-muted));
  text-shadow: var(--lumina-overlay-halo);
}
.dsh-lumina-actions {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-top: 20px;
}
.dsh-lumina-actions .dsh-lumina-btn {
  width: auto;
  margin-top: 0;
  text-align: center;
}
.dsh-lumina-cta {
  box-sizing: border-box;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  min-height: 40px;
  margin-right: 8px;
  padding: 0 16px 0 14px;
  appearance: none;
  border: 1px solid hsl(var(--lumina-ink));
  border-radius: 20px;
  background: hsl(var(--lumina-ink));
  color: hsl(var(--lumina-card));
  font: inherit;
  font-size: 14px;
  font-weight: 500;
  line-height: 1;
  letter-spacing: 0.01em;
  cursor: pointer;
  box-shadow: 0 0 0 1px hsl(var(--lumina-card) / 0.28), 0 10px 24px rgba(0,0,0,0.38);
}
.dsh-lumina-cta svg { flex-shrink: 0; }
.dsh-lumina-cta:hover:not(:disabled) {
  filter: brightness(1.08);
}
.dsh-lumina-cta:focus-visible {
  outline: 1px solid hsl(var(--lumina-ink));
  outline-offset: 3px;
}
.dsh-lumina-cta:disabled {
  cursor: not-allowed;
  opacity: 0.78;
}
.dsh-lumina-iconbtn {
  box-sizing: border-box;
  width: 36px;
  height: 36px;
  padding: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 8px;
  background: transparent;
  color: inherit;
  cursor: pointer;
}
.dsh-lumina-stage .dsh-lumina-iconbtn {
  color: hsl(var(--lumina-overlay-fg));
  filter: drop-shadow(0 1px 2px rgba(8, 10, 16, 0.72));
}
.dsh-lumina-iconbtn:hover:not(:disabled) {
  background: var(--dsw-alias-interactive-bg-hover, rgba(38, 49, 72, 0.06));
}
.dsh-lumina-stage .dsh-lumina-iconbtn:hover:not(:disabled) {
  background: hsl(var(--lumina-overlay-fg) / 0.1);
}
.dsh-lumina-iconbtn:focus-visible {
  outline: 1px solid var(--dsw-alias-state-business-primary);
  outline-offset: 2px;
}
.dsh-lumina-iconbtn:disabled {
  opacity: 0.45;
  cursor: not-allowed;
}
.dsh-lumina-question {
  margin: 0 0 12px;
  max-width: 560px;
  font-size: 14px;
  line-height: 1.5;
  color: hsl(var(--lumina-overlay-muted));
  text-shadow: var(--lumina-overlay-halo);
}
.dsh-lumina-stage .dsh-lumina-btn {
  color: hsl(var(--lumina-overlay-fg));
  border-color: hsl(var(--lumina-overlay-fg) / 0.28);
  text-shadow: var(--lumina-overlay-halo);
}
`
