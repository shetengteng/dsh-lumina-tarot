import type { CSSProperties } from 'react'
import {
  IconCloseOutline16,
  IconRefreshOutline16,
  IconThinkOutline16,
} from '@deepseek-ai/dsh-client-ui-primitives'
import { CardArt, cornerLabel } from '../face/CardArt.tsx'
import { ModalDust } from '../fx/ModalDust.tsx'
import { scrimFill } from '../fx/scrim.ts'
import { ShuffleStack } from '../shuffle/ShuffleStack.tsx'
import { spreadLabel, type Tx } from '../i18n.ts'
import type { LuminaConfig } from '../defaults.ts'
import type { LocaleId, ReadingCardView, ReadingPayload, SpreadId } from '../../domain/types.ts'

function posLabel(card: ReadingCardView, locale: LocaleId): string {
  return locale === 'en-US' ? card.positionRole : card.positionName
}

function cardLabel(card: ReadingCardView, locale: LocaleId, tx: Tx): string {
  const name = locale === 'en-US' ? card.nameEn : card.name
  return `${posLabel(card, locale)} · ${name}${card.reversed ? tx('reversedShort') : ''}`
}

function CardFace(props: {
  card: ReadingCardView
  index: number
  radius: number
  locale: LocaleId
  tx: Tx
  reveal: boolean
  minorStyle: LuminaConfig['minorStyle']
  artTheme: LuminaConfig['cardArtTheme']
}) {
  const { card, locale, tx } = props
  const corner = cornerLabel(card.arcana, card.number, card.rank)
  return (
    <div
      className={props.reveal ? 'dsh-lumina-face is-reveal' : 'dsh-lumina-face'}
      style={{ borderRadius: props.radius, ['--i']: String(props.index) } as CSSProperties}
    >
      <div className="meta row">
        <span>{posLabel(card, locale)}</span>
        {corner ? <span>{corner}</span> : null}
      </div>
      <CardArt
        symbol={card.symbol}
        reversed={card.reversed}
        arcana={card.arcana}
        suit={card.suit}
        rank={card.rank}
        minorStyle={props.minorStyle}
        cardId={card.cardId}
        artTheme={props.artTheme}
      />
      <div className="nm">{locale === 'en-US' ? card.nameEn : card.name}</div>
      <div className="meta">{card.reversed ? tx('reversed') : tx('upright')}</div>
      <div className="meta">{(card.keywords ?? []).slice(0, 3).join(' · ')}</div>
    </div>
  )
}

function CardReadings(props: { cards: ReadingCardView[]; locale: LocaleId; tx: Tx }) {
  const { cards, locale, tx } = props
  const extras = cards.filter((card) => card.love || card.career || card.advice)
  return (
    <div className="dsh-lumina-readings">
      {cards.map((card) => (
        <div key={`${card.positionIndex}-${card.cardId}`} className="dsh-lumina-reading">
          <div className="hd">{cardLabel(card, locale, tx)}</div>
          <p>{card.meaning}</p>
        </div>
      ))}
      {extras.length > 0 ? (
        <details className="dsh-lumina-extra">
          <summary>{tx('moreFields')}</summary>
          {extras.map((card) => (
            <div key={`${card.positionIndex}-${card.cardId}-x`} className="dsh-lumina-fields">
              <div className="hd">{posLabel(card, locale)}</div>
              {card.love ? <p>{`${tx('love')}：${card.love}`}</p> : null}
              {card.career ? <p>{`${tx('career')}：${card.career}`}</p> : null}
              {card.advice ? <p>{`${tx('advice')}：${card.advice}`}</p> : null}
            </div>
          ))}
        </details>
      ) : null}
    </div>
  )
}

export function ResultPanel(props: {
  phase: 'loading' | 'result' | 'error'
  config: LuminaConfig
  back: LuminaConfig['cardBack']
  radius: number
  locale: LocaleId
  tx: Tx
  errorText: string
  reading: ReadingPayload | null
  busy: boolean
  pendingSpread: SpreadId
  question: string
  canInterpret: boolean
  interpretNote: string
  startDraw: (line: string, asked?: string) => void
  startInterpret: () => void
  setPhase: (phase: 'idle') => void
}) {
  const {
    phase, config, back, radius, locale, tx, errorText, reading, busy,
    pendingSpread, question, canInterpret, interpretNote, startDraw, startInterpret, setPhase,
  } = props
  const reveal = config.animationLevel !== 'off'

  let body
  if (phase === 'loading') {
    body = (
      <>
        <ShuffleStack {...config} cardBack={back} />
        <p className="dsh-lumina-caption">{config.animationLevel === 'off' ? tx('drawing') : tx('shuffling')}</p>
      </>
    )
  } else if (phase === 'error') {
    body = (
      <>
        <p className="dsh-lumina-error">{errorText}</p>
        <div className="dsh-lumina-actions">
          <button className="dsh-lumina-btn" onClick={() => startDraw(`/lumina draw ${pendingSpread}`, question.trim())}>{tx('retry')}</button>
          <button className="dsh-lumina-btn" onClick={() => setPhase('idle')}>{tx('close')}</button>
        </div>
      </>
    )
  } else {
    body = (
      <>
        <p className="dsh-lumina-caption">
          {reading?.kind === 'today' ? tx('today') : (reading ? spreadLabel(locale, reading.spreadId) : null)}
        </p>
        {reading?.question ? <p className="dsh-lumina-question">{`「${reading.question}」`}</p> : null}
        <div className="dsh-lumina-grid" data-level={config.animationLevel}>
          {(reading?.cards ?? []).map((card, index) => (
            <CardFace
              key={`${card.positionIndex}-${card.cardId}`}
              card={card}
              index={index}
              radius={radius}
              locale={locale}
              tx={tx}
              reveal={reveal}
              minorStyle={config.minorStyle}
              artTheme={config.cardArtTheme}
            />
          ))}
        </div>
        <CardReadings cards={reading?.cards ?? []} locale={locale} tx={tx} />
        {interpretNote ? <p className="dsh-lumina-note">{interpretNote}</p> : null}
        <div className="dsh-lumina-actions">
          <button
            type="button"
            className="dsh-lumina-cta"
            aria-label={tx('interpret')}
            title={canInterpret ? tx('interpret') : tx('interpretNeedSession')}
            disabled={!canInterpret}
            onClick={() => startInterpret()}
          >
            <IconThinkOutline16 size={16} />
            {tx('interpret')}
          </button>
          <button
            type="button"
            className="dsh-lumina-iconbtn"
            aria-label={tx('shuffleAgain')}
            title={tx('shuffleAgain')}
            disabled={busy}
            onClick={() => startDraw(reading?.kind === 'today' ? '/lumina today' : `/lumina draw ${reading?.spreadId ?? pendingSpread}`, reading?.question ?? question.trim())}
          >
            <IconRefreshOutline16 size={16} />
          </button>
          <button
            type="button"
            className="dsh-lumina-iconbtn"
            aria-label={tx('close')}
            title={tx('close')}
            onClick={() => setPhase('idle')}
          >
            <IconCloseOutline16 size={16} />
          </button>
        </div>
      </>
    )
  }

  return (
    <div
      className="dsh-lumina-mask"
      onClick={(event) => {
        if (event.target === event.currentTarget && phase !== 'loading') setPhase('idle')
      }}
    >
      <div className="dsh-lumina-scrim" style={scrimFill(config.panelOpacity)} />
      <ModalDust level={config.animationLevel} />
      <div className="dsh-lumina-stage">{body}</div>
    </div>
  )
}
