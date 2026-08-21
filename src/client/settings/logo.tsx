export function BrandLogo() {
  return (
    <svg className="lumina-set-logo" viewBox="0 0 64 64" aria-hidden="true" focusable="false">
      <rect width={64} height={64} rx={12} fill="#0b0d1a" />
      <circle cx={32} cy={32} r={22} fill="none" stroke="#c9a961" strokeWidth={1} opacity={0.35} />
      <circle cx={32} cy={32} r={14} fill="none" stroke="#c9a961" strokeWidth={1} opacity={0.55} />
      <path d="M32 14 L33.6 30.4 L50 32 L33.6 33.6 L32 50 L30.4 33.6 L14 32 L30.4 30.4 Z" fill="#e9c978" />
      <circle cx={32} cy={32} r={2} fill="#0b0d1a" />
    </svg>
  )
}
