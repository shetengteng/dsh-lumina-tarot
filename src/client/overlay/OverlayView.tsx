import type { MouseEvent, PointerEvent, RefObject } from 'react'
import type { LuminaConfig } from '../defaults.ts'
import { FloatCard } from '../dock/FloatCard.tsx'
import { HistoryDialog } from '../history/HistoryDialog.tsx'
import type { Tx } from '../i18n.ts'
import { ResultPanel } from '../panel/ResultPanel.tsx'
import type {
  AnimationLevel,
  CardArtTheme,
  CardBackVariant,
  HistoryListItem,
  LocaleId,
  ReadingPayload,
  SpreadId,
  ThemeId,
} from '../../domain/types.ts'
import { AskDialog } from './AskDialog.tsx'
import { OverlayGuard } from './OverlayGuard.tsx'
import { SpreadMenu } from './SpreadMenu.tsx'

type PointerHandlers = {
  onPointerDown: (event: PointerEvent<HTMLDivElement>) => void
  onPointerMove: (event: PointerEvent<HTMLDivElement>) => void
  onPointerUp: (event: PointerEvent<HTMLDivElement>) => void
  onContextMenu: (event: MouseEvent<HTMLDivElement>) => void
}

export function OverlayView(props: {
  theme: ThemeId
  showFloat: boolean
  menu: boolean
  ask: boolean
  historyOpen: boolean
  phase: 'idle' | 'loading' | 'result' | 'error'
  cardRef: RefObject<HTMLDivElement>
  menuRef: RefObject<HTMLDivElement>
  title: string
  left: number
  top: number
  radius: number
  animationLevel: AnimationLevel
  cardBack: CardBackVariant
  cardArtTheme: CardArtTheme
  pointer: PointerHandlers
  pendingSpread: SpreadId
  busy: boolean
  locale: LocaleId
  tx: Tx
  lastLabel: string
  historyLabel: string
  onPickSpread: (id: SpreadId) => void
  onOpenLast: () => void
  onOpenHistory: () => void
  onCloseMenu: () => void
  question: string
  opacity: number
  onQuestion: (value: string) => void
  onAskSubmit: () => void
  onAskClose: () => void
  loadHistory: () => Promise<HistoryListItem[]>
  onHistoryClose: () => void
  config: LuminaConfig
  errorText: string
  reading: ReadingPayload | null
  panelBusy: boolean
  canInterpret: boolean
  interpretNote: string
  startDraw: (line: string, asked?: string) => void
  startInterpret: () => void
  setPhase: (phase: 'idle') => void
}) {
  return (
    <div className="dsh-lumina dsh-lumina-dock" data-theme={props.theme}>
      {props.menu ? <div className="dsh-lumina-dismiss" onPointerDown={props.onCloseMenu} /> : null}
      {props.showFloat
        ? (
          <FloatCard
            cardRef={props.cardRef}
            title={props.title}
            left={props.left}
            top={props.top}
            radius={props.radius}
            animationLevel={props.animationLevel}
            cardBack={props.cardBack}
            cardArtTheme={props.cardArtTheme}
            {...props.pointer}
          />
        )
        : null}
      {props.menu
        ? (
          <SpreadMenu
            menuRef={props.menuRef}
            left={props.left}
            top={props.top}
            pendingSpread={props.pendingSpread}
            busy={props.busy}
            theme={props.theme}
            locale={props.locale}
            lastLabel={props.lastLabel}
            historyLabel={props.historyLabel}
            onPick={props.onPickSpread}
            onOpenLast={props.onOpenLast}
            onOpenHistory={props.onOpenHistory}
          />
        )
        : null}
      <OverlayGuard>
        {props.ask
          ? (
            <AskDialog
              tx={props.tx}
              locale={props.locale}
              pendingSpread={props.pendingSpread}
              question={props.question}
              busy={props.busy}
              opacity={props.opacity}
              animationLevel={props.animationLevel}
              onQuestion={props.onQuestion}
              onSubmit={props.onAskSubmit}
              onClose={props.onAskClose}
            />
          )
          : null}
      </OverlayGuard>
      <OverlayGuard>
        {props.historyOpen
          ? (
            <HistoryDialog
              tx={props.tx}
              locale={props.locale}
              opacity={props.opacity}
              animationLevel={props.animationLevel}
              config={props.config}
              load={props.loadHistory}
              onClose={props.onHistoryClose}
            />
          )
          : null}
      </OverlayGuard>
      <OverlayGuard>
        {props.phase === 'idle'
          ? null
          : (
            <ResultPanel
              phase={props.phase}
              config={props.config}
              back={props.cardBack}
              radius={props.radius}
              locale={props.locale}
              tx={props.tx}
              errorText={props.errorText}
              reading={props.reading}
              busy={props.panelBusy}
              pendingSpread={props.pendingSpread}
              question={props.question}
              canInterpret={props.canInterpret}
              interpretNote={props.interpretNote}
              startDraw={props.startDraw}
              startInterpret={props.startInterpret}
              setPhase={props.setPhase}
            />
          )}
      </OverlayGuard>
    </div>
  )
}
