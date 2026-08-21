export const TOOL_CSS = `
.dsh-lumina-tool {
  padding: 10px 12px 12px;
  border-radius: 10px;
  border: 1px solid hsl(var(--lumina-border));
  background: hsl(var(--lumina-card));
  color: hsl(var(--lumina-fg));
}
.dsh-lumina-tool.is-running .dsh-lumina-tool-cap {
  opacity: 0.7;
}
.dsh-lumina-tool.is-error .dsh-lumina-tool-cap {
  color: #c45b5b;
}
.dsh-lumina-tool-cap {
  margin: 0 0 8px;
  font-size: 13px;
}
.dsh-lumina-tool-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
.dsh-lumina-tool-face {
  width: 108px;
  min-height: 186px;
  padding: 10px 8px;
  border-radius: 8px;
  border: 1px solid hsl(var(--lumina-border));
  background: hsl(var(--lumina-bg));
  display: flex;
  flex-direction: column;
  gap: 6px;
  text-align: center;
}
.dsh-lumina-tool-face .sym { font-size: 28px; line-height: 1; }
.dsh-lumina-tool-face .nm { font-size: 13px; }
.dsh-lumina-tool-face .pos,
.dsh-lumina-tool-face .ori { font-size: 11px; color: hsl(var(--lumina-muted)); }
.dsh-lumina-tool-face .keys { font-size: 11px; color: hsl(var(--lumina-muted)); line-height: 1.3; }
.dsh-lumina-tool-q {
  margin: 0 0 8px;
  font-size: 12px;
  line-height: 1.45;
  color: hsl(var(--lumina-muted));
}
.dsh-lumina-tool-detail {
  margin: 10px 0 0;
  color: hsl(var(--lumina-fg));
}
.dsh-lumina-tool-detail > div { margin: 0 0 8px; }
.dsh-lumina-tool-detail > div:last-child { margin-bottom: 0; }
.dsh-lumina-tool-detail .hd {
  font-size: 11px;
  letter-spacing: 0.04em;
  color: hsl(var(--lumina-muted));
}
.dsh-lumina-tool-detail p {
  margin: 2px 0 0;
  font-size: 12px;
  line-height: 1.5;
}
`
