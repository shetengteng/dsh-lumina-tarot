export const ASK_CSS = `
.dsh-lumina-ask {
  position: relative;
  z-index: 1;
  box-sizing: border-box;
  width: min(560px, 100%);
  padding: 24px 24px 20px;
  text-align: left;
  color: hsl(var(--lumina-fg));
  background: hsl(var(--lumina-card));
  border: 1px solid hsl(var(--lumina-border));
  border-radius: 24px;
  box-shadow: 0 18px 44px rgba(0,0,0,0.42);
}
.dsh-lumina-ask-title {
  margin: 0;
  font-family: 'Noto Serif SC', 'Songti SC', 'PingFang SC', ui-serif, Georgia, serif;
  font-size: 22px;
  font-weight: 600;
  letter-spacing: 0.04em;
  line-height: 1.4;
  color: hsl(var(--lumina-fg));
}
.dsh-lumina-ask-sub {
  margin: 10px 0 0;
  font-size: 14px;
  line-height: 1.6;
  color: hsl(var(--lumina-fg) / 0.88);
}
.dsh-lumina-ask-spread {
  margin: 16px 0 0;
  font-size: 14px;
  line-height: 1.5;
  color: hsl(var(--lumina-fg) / 0.88);
}
.dsh-lumina-ask-spread b {
  color: hsl(var(--lumina-fg));
  font-weight: 600;
}
.dsh-lumina-ask-label {
  display: block;
  margin: 16px 0 8px;
  font-size: 14px;
  font-weight: 500;
  color: hsl(var(--lumina-fg));
}
.dsh-lumina-ask-input {
  display: block;
  width: 100%;
  box-sizing: border-box;
  min-height: 120px;
  padding: 12px 14px;
  resize: vertical;
  appearance: none;
  border: 1px solid hsl(var(--lumina-border));
  border-radius: 8px;
  background: hsl(var(--lumina-bg));
  color: hsl(var(--lumina-fg));
  font: inherit;
  font-size: 15px;
  line-height: 1.6;
}
.dsh-lumina-ask-input::placeholder {
  color: hsl(var(--lumina-fg) / 0.62);
  opacity: 1;
}
.dsh-lumina-ask-input:focus {
  outline: 1px solid hsl(var(--lumina-ink));
  outline-offset: 1px;
}
.dsh-lumina-ask-meta {
  display: flex;
  justify-content: space-between;
  gap: 8px;
  margin-top: 8px;
  font-size: 13px;
  color: hsl(var(--lumina-fg) / 0.72);
}
.dsh-lumina-ask .dsh-lumina-actions {
  justify-content: flex-end;
}
.dsh-lumina-ask .dsh-lumina-cta { margin-right: 0; padding: 0 16px; }
.dsh-lumina-ask .dsh-lumina-cta:disabled { opacity: 0.55; }
.dsh-lumina-ask .dsh-lumina-cta.is-ghost {
  background: transparent;
  color: hsl(var(--lumina-ink));
  box-shadow: none;
}
.dsh-lumina-ask .dsh-lumina-cta.is-ghost:hover:not(:disabled) {
  filter: none;
  background: hsl(var(--lumina-ink) / 0.08);
}
`
