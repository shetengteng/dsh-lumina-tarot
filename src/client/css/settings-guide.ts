export const GUIDE_CSS = `
.lumina-set-guide {
  border-bottom: 1px solid var(--dsw-alias-border-l2);
}
.lumina-set-guide-head {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 16px 0;
}
.lumina-set-guide-head .lumina-set-row-text {
  padding-right: 0;
}
.lumina-set-guide-toggle {
  box-sizing: border-box;
  flex: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  margin: 0;
  padding: 0;
  border: none;
  border-radius: 8px;
  background: none;
  color: var(--dsw-alias-label-tertiary);
  cursor: pointer;
}
.lumina-set-guide-toggle:hover {
  background: var(--dsw-alias-interactive-bg-hover);
}
.lumina-set-guide-toggle:focus-visible {
  outline: 1px solid var(--dsw-alias-label-primary);
  outline-offset: 2px;
}
.lumina-set-guide-chevron {
  display: block;
  pointer-events: none;
  transition: transform .15s ease;
}
.lumina-set-guide-chevron.is-open {
  transform: rotate(180deg);
}
.lumina-set-guide-body {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 0 0 16px;
}
.lumina-set-guide-h {
  margin: 14px 0 6px;
  font-size: 13px;
  font-weight: 500;
  line-height: 20px;
  color: var(--dsw-alias-label-primary);
}
.lumina-set-guide-h:first-child {
  margin-top: 0;
}
.lumina-set-guide-says {
  margin: 8px 0 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.lumina-set-guide-says li {
  margin: 0;
  padding: 8px 12px;
  border-radius: 8px;
  background: var(--dsw-alias-bg-module-platform);
  color: var(--dsw-alias-label-primary);
  font-size: 13px;
  line-height: 20px;
}
.lumina-set-guide-list {
  margin: 6px 0 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.lumina-set-guide-list li {
  margin: 0;
  font-size: 13px;
  line-height: 20px;
  color: var(--dsw-alias-label-tertiary);
}
.lumina-set-guide-spreads {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 8px;
}
.lumina-set-guide-spread {
  border: 1px solid var(--dsw-alias-border-l2);
  border-radius: 10px;
  padding: 0 12px;
}
.lumina-set-guide-spread-head {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 0;
}
.lumina-set-guide-spread-name {
  flex: 1;
  min-width: 0;
  font-size: 13px;
  line-height: 20px;
  color: var(--dsw-alias-label-primary);
}
.lumina-set-guide-spread-meta {
  flex: none;
  font-size: 12px;
  line-height: 18px;
  color: var(--dsw-alias-label-tertiary);
}
.lumina-set-guide-spread .lumina-set-guide-toggle {
  width: 24px;
  height: 24px;
}
.lumina-set-guide-spread .lumina-set-guide-chevron {
  width: 14px;
  height: 14px;
}
.lumina-set-guide-spread .lumina-set-desc {
  margin: 0 0 10px;
}
.lumina-set-guide-pos {
  margin: 0 0 10px;
  padding: 0;
  list-style: none;
}
.lumina-set-guide-pos li {
  display: flex;
  gap: 8px;
  padding: 6px 0;
  border-top: 1px solid var(--dsw-alias-border-l2);
  font-size: 13px;
  line-height: 20px;
  color: var(--dsw-alias-label-tertiary);
}
.lumina-set-guide-pos b {
  flex: 0 0 8.5em;
  font-weight: 500;
  color: var(--dsw-alias-label-primary);
}
`
