export function scrimFill(opacity: number): { background: string } {
  const clamped = Math.min(0.8, Math.max(0.2, opacity))
  return { background: `rgba(16, 18, 26, ${(0.38 + clamped * 0.5).toFixed(3)})` }
}
