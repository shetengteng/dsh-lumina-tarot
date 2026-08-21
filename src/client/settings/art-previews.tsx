import type { CardArtTheme } from '../../domain/types.ts'
import aquaticFool from '../decks/aquatic/fool.webp'
import rwsFool from '../decks/rws/fool.webp'

function MinimalPreview() {
  return (
    <svg viewBox="0 0 68 117" aria-hidden="true">
      <rect width="68" height="117" rx="4" fill="#1c2233" />
      <rect x="5" y="5" width="58" height="107" rx="3" fill="none" stroke="#c9a961" strokeWidth="1" opacity="0.55" />
      <text x="10" y="18" fill="#c9a961" fontSize="8" fontFamily="Georgia, serif">0</text>
      <circle cx="34" cy="52" r="14" fill="none" stroke="#c9a961" strokeWidth="1.2" />
      <circle cx="34" cy="52" r="4" fill="#c9a961" />
      <path d="M34 38 L36 50 L48 52 L36 54 L34 66 L32 54 L20 52 L32 50 Z" fill="#e8d5a3" />
      <text x="34" y="96" textAnchor="middle" fill="#e8d5a3" fontSize="9" fontFamily="Georgia, serif">☀</text>
    </svg>
  )
}

export function ArtPreview(props: { id: CardArtTheme }) {
  if (props.id === 'minimal') return <MinimalPreview />
  const src = props.id === 'rws' ? rwsFool : aquaticFool
  return <img src={src} alt="" decoding="async" />
}
