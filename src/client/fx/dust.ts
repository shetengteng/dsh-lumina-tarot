export type Dust = {
  x: number
  y: number
  r: number
  a: number
  vx: number
  vy: number
  da: number
  color: string
}

const COLORS = ['#c9a961', '#e6cf95', '#f8e9c1']

export function dustCount(level: 'lite' | 'full'): number {
  return level === 'full' ? 60 : 28
}

export function spawnDust(width: number, height: number): Dust {
  return {
    x: Math.random() * width,
    y: Math.random() * height,
    r: 0.6 + Math.random() * 1.2,
    a: 0.25 + Math.random() * 0.5,
    vx: (Math.random() - 0.5) * 0.12,
    vy: -(0.08 + Math.random() * 0.18),
    da: (Math.random() - 0.5) * 0.008,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
  }
}

export function stepDust(dot: Dust, width: number, height: number): void {
  dot.x += dot.vx
  dot.y += dot.vy
  dot.a += dot.da
  if (dot.a < 0.2 || dot.a > 0.75) dot.da *= -1
  if (dot.y < -4) {
    dot.y = height + 4
    dot.x = Math.random() * width
  }
  if (dot.x < -4) dot.x = width + 4
  if (dot.x > width + 4) dot.x = -4
}
