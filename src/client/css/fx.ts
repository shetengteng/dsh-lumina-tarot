export const FX_CSS = `
.dsh-lumina-mask,
.dsh-lumina-ask-modal {
  position: fixed;
  inset: 0;
  z-index: 2147483002;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: auto;
}
.dsh-lumina-ask-modal { padding: 16px; }
.dsh-lumina-scrim {
  position: absolute;
  inset: 0;
  pointer-events: none;
  backdrop-filter: blur(14px) saturate(0.85);
  -webkit-backdrop-filter: blur(14px) saturate(0.85);
}
.dsh-lumina-fx {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  pointer-events: none;
}
.dsh-lumina-fx canvas {
  display: block;
  width: 100%;
  height: 100%;
}
`