import { luminaConfig } from '../store.ts'
import { resolveUiLocale, spreadLabel, t } from '../i18n.ts'
import { CardArt } from '../face/CardArt.tsx'
import type { ToolReadingView } from '../../domain/types.ts'

export function ReadingChatCard(props: {
  reading?: ToolReadingView | null
  running?: boolean
  error?: string
  note?: string
}) {
  const config = luminaConfig()
  const locale = resolveUiLocale(config)
  const tx = (key: 'drawing' | 'upright' | 'reversed' | 'reversedShort' | 'today') => t(locale, key)

  if (props.running) {
    return (
      <div className="dsh-lumina dsh-lumina-tool is-running" data-theme={config.theme}>
        <p className="dsh-lumina-tool-cap">{tx('drawing')}</p>
      </div>
    )
  }

  if (props.error) {
    return (
      <div className="dsh-lumina dsh-lumina-tool is-error" data-theme={config.theme}>
        <p className="dsh-lumina-tool-cap">{props.error}</p>
      </div>
    )
  }

  if (!props.reading) {
    return (
      <div className="dsh-lumina dsh-lumina-tool" data-theme={config.theme}>
        <p className="dsh-lumina-tool-cap">{props.note || '抽牌失败'}</p>
      </div>
    )
  }

  const reading = props.reading
  const title = reading.kind === 'today'
    ? tx('today')
    : (locale === 'en-US' ? spreadLabel(locale, reading.spreadId) : reading.spreadName)

  return (
    <div className="dsh-lumina dsh-lumina-tool" data-theme={config.theme}>
      <p className="dsh-lumina-tool-cap">{title}</p>
      {reading.question ? <p className="dsh-lumina-tool-q">{`「${reading.question}」`}</p> : null}
      <div className="dsh-lumina-tool-grid">
        {reading.cards.map((card) => (
          <div key={`${card.positionIndex}-${card.cardId}`} className="dsh-lumina-tool-face">
            <div className="pos">{locale === 'en-US' ? card.positionRole : card.positionName}</div>
            <CardArt
              symbol={card.symbol}
              reversed={card.reversed}
              arcana={card.arcana}
              suit={card.suit}
              rank={card.rank}
              minorStyle={config.minorStyle}
              cardId={card.cardId}
              artTheme={config.cardArtTheme}
            />
            <div className="nm">{locale === 'en-US' ? card.nameEn : card.name}</div>
            <div className="ori">{card.reversed ? tx('reversed') : tx('upright')}</div>
            {card.keywords.length > 0
              ? <div className="keys">{card.keywords.slice(0, 3).join(' · ')}</div>
              : null}
          </div>
        ))}
      </div>
      <div className="dsh-lumina-tool-detail">
        {reading.cards.map((card) => {
          const pos = locale === 'en-US' ? card.positionRole : card.positionName
          const name = locale === 'en-US' ? card.nameEn : card.name
          const mark = card.reversed ? tx('reversedShort') : ''
          return (
            <div key={`${card.positionIndex}-${card.cardId}`}>
              <div className="hd">{`${pos} · ${name}${mark}`}</div>
              <p>{card.meaning}</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}
