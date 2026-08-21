export const HISTORY_CSS = `
.dsh-lumina-history {
  position: relative;
  z-index: 1;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  width: min(640px, 100%);
  max-height: min(82vh, 740px);
  padding: 20px 20px 16px;
  text-align: left;
  color: hsl(var(--lumina-fg));
  background: hsl(var(--lumina-card));
  border: 1px solid hsl(var(--lumina-border));
  overflow: hidden;
  border-radius: 24px;
  box-shadow: 0 18px 44px rgba(0,0,0,0.42);
}
.dsh-lumina-history-head {
  display: flex;
  flex-shrink: 0;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
}
.dsh-lumina-history-title {
  margin: 0;
  font-family: 'Noto Serif SC', 'Songti SC', 'PingFang SC', ui-serif, Georgia, serif;
  font-size: 20px;
  font-weight: 600;
  letter-spacing: 0.04em;
  line-height: 1.4;
}
.dsh-lumina-history-count {
  margin: 6px 0 0;
  font-size: 13px;
  color: hsl(var(--lumina-fg) / 0.72);
}
.dsh-lumina-history-body {
  flex: 1 1 auto;
  min-height: 0;
  margin-top: 16px;
  overflow: auto;
  overscroll-behavior: contain;
}
.dsh-lumina-history-status {
  margin: 8px 0 0;
  font-size: 14px;
  line-height: 1.6;
  color: hsl(var(--lumina-fg) / 0.88);
}
.dsh-lumina-history-status.is-error {
  color: #c45b5b;
}
.dsh-lumina-history-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 28px 12px 20px;
  text-align: center;
}
.dsh-lumina-history-empty-mark {
  font-size: 36px;
  line-height: 1;
  color: hsl(var(--lumina-ink));
}
.dsh-lumina-history-empty-title {
  margin: 12px 0 0;
  font-size: 15px;
  line-height: 1.5;
  color: hsl(var(--lumina-fg));
}
.dsh-lumina-history-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin: 0;
  padding: 0;
  list-style: none;
}
.dsh-lumina-history-more {
  height: 1px;
  margin: 0;
  padding: 0;
  list-style: none;
  pointer-events: none;
}
.dsh-lumina-history-item {
  display: block;
  width: 100%;
  box-sizing: border-box;
  padding: 14px 14px 12px;
  border: 1px solid hsl(var(--lumina-border));
  border-radius: 14px;
  background: hsl(var(--lumina-bg) / 0.45);
  color: hsl(var(--lumina-fg));
  text-align: left;
  cursor: pointer;
}
.dsh-lumina-history-item:hover {
  border-color: hsl(var(--lumina-ink) / 0.45);
}
.dsh-lumina-history-item:focus-visible {
  outline: 1px solid hsl(var(--lumina-ink));
  outline-offset: 2px;
}
.dsh-lumina-history-item.is-open {
  background: hsl(var(--lumina-bg) / 0.62);
}
.dsh-lumina-history-meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  margin: 0;
  font-size: 12px;
  line-height: 1.4;
  color: hsl(var(--lumina-fg) / 0.72);
}
.dsh-lumina-history-period {
  flex-shrink: 0;
  padding: 2px 8px;
  border-radius: 999px;
  background: hsl(var(--lumina-ink) / 0.12);
  color: hsl(var(--lumina-fg) / 0.82);
  font-size: 11px;
}
.dsh-lumina-history-q {
  margin: 8px 0 0;
  font-family: 'Noto Serif SC', 'Songti SC', 'PingFang SC', ui-serif, Georgia, serif;
  font-size: 16px;
  line-height: 1.45;
  color: hsl(var(--lumina-fg));
}
.dsh-lumina-history-q span {
  color: hsl(var(--lumina-ink));
}
.dsh-lumina-history-sum {
  margin: 8px 0 0;
  font-size: 13px;
  line-height: 1.55;
  color: hsl(var(--lumina-fg) / 0.82);
}
.dsh-lumina-history-thumbs {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  gap: 8px;
  margin: 12px 0 0;
}
.dsh-lumina-history-thumbs .dsh-lumina-face {
  width: 88px;
  min-height: 158px;
  padding: 7px 6px 8px;
  flex: 0 0 auto;
}
.dsh-lumina-history-thumbs .dsh-lumina-face .nm {
  font-size: 11px;
  line-height: 1.25;
}
.dsh-lumina-history-thumbs .dsh-lumina-face .meta {
  font-size: 10px;
}
.dsh-lumina-history-thumbs .dsh-lumina-face .art {
  min-height: 72px;
}
.dsh-lumina-history-thumbs .dsh-lumina-face .art svg {
  max-height: 64px;
}
.dsh-lumina-history-thumbs .dsh-lumina-face .sym {
  font-size: 22px;
}
.dsh-lumina-hcard.is-photo {
  position: relative;
  width: 88px;
  height: 151px;
  flex: 0 0 auto;
  overflow: hidden;
  border: 1px solid hsl(var(--lumina-border));
  background: hsl(var(--lumina-card));
  color: hsl(var(--lumina-fg));
}
.dsh-lumina-hcard.is-photo .art {
  position: absolute;
  inset: 0;
  width: 88px;
  height: 151px;
  display: block;
  min-height: 0;
  overflow: hidden;
  color: hsl(var(--lumina-ink));
}
.dsh-lumina-hcard.is-photo .art img {
  width: 88px;
  height: 151px;
  object-fit: cover;
  display: block;
}
.dsh-lumina-hcard.is-photo .art img.is-rws {
  transform: scale(1.14);
  transform-origin: center;
}
.dsh-lumina-hcard.is-photo .art.is-reversed img {
  transform: rotate(180deg);
}
.dsh-lumina-hcard.is-photo .art.is-reversed img.is-rws {
  transform: rotate(180deg) scale(1.14);
}
.dsh-lumina-hcard.is-photo .art svg {
  width: 70%;
  height: auto;
  max-height: 70%;
  margin: 16% auto 0;
  display: block;
  pointer-events: none;
}
.dsh-lumina-hcard.is-photo .sym {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
}
.dsh-lumina-hcard-rev {
  position: absolute;
  top: 5px;
  right: 5px;
  z-index: 1;
  padding: 2px 4px;
  border-radius: 3px;
  background: #c45b5b;
  color: #f6ecec;
  font-size: 9px;
  font-weight: 600;
  line-height: 1.2;
}
.dsh-lumina-hcard-caption {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
  padding: 18px 4px 5px;
  background: linear-gradient(transparent, rgba(18, 16, 12, 0.78));
  color: #f3ece0;
  font-size: 10px;
  line-height: 1.2;
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.dsh-lumina-history-detail {
  margin: 12px 0 0;
  padding-top: 10px;
  border-top: 1px solid hsl(var(--lumina-border));
  font-size: 13px;
  line-height: 1.55;
  color: hsl(var(--lumina-fg));
}
.dsh-lumina-history-detail p {
  margin: 0 0 8px;
}
.dsh-lumina-history-detail p:last-child {
  margin-bottom: 0;
}
.dsh-lumina-history .dsh-lumina-iconbtn {
  color: hsl(var(--lumina-fg));
}
`
