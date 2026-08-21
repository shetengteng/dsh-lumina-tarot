import type { CSSProperties } from 'react'
import type { AnimationLevel, CardBackVariant } from '../../domain/types.ts'
import { CardBack } from '../card-back.tsx'
import { radiusFor, type LuminaConfig } from '../defaults.ts'

export function ShuffleStack(config: LuminaConfig) {
  const level: AnimationLevel = config.animationLevel
  const count = level === 'lite' ? 4 : 6
  const dance = level !== 'off'
  return (
    <div className="dsh-lumina-shuffle" data-level={level}>
      {Array.from({ length: count }, (_, i) => (
        <div
          key={i}
          className={`dsh-lumina-shuffle-card${dance ? ' is-dancing' : ''}`}
          style={{
            ['--i']: String(i),
            borderRadius: radiusFor(config.theme),
            overflow: 'hidden',
            background: 'hsl(var(--lumina-card))',
            color: 'hsl(var(--lumina-ink))',
            border: '1px solid hsl(var(--lumina-border))',
          } as CSSProperties}
        >
          <CardBack variant={config.cardBack as CardBackVariant} art={config.cardArtTheme} />
        </div>
      ))}
    </div>
  )
}
