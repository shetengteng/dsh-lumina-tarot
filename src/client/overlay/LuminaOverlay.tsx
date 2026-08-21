import { useCallback, useEffect, useRef, useState } from 'react'
import {
  effectiveCardBack,
  minShuffleMs,
  radiusFor,
  type LuminaConfig,
} from '../defaults.ts'
import { posToPx } from '../dock/geometry.ts'
import { createFloatPointer, type DragState } from '../dock/pointer.ts'
import { resolveUiLocale, t, type LocaleHandle } from '../i18n.ts'
import {
  luminaConfig,
  persistLuminaField,
  watchLuminaConfig,
  type SettingsHandle,
} from '../store.ts'
import { listenToolReading } from './live-reading.ts'
import type { ReadingPayload, SpreadId } from '../../domain/types.ts'
import { LUMINA_HISTORY_CLEARED, parseReading, unwrapCommandResult } from './commands.ts'
import { useOverlayDismiss } from './dismiss.ts'
import { useHistoryLayer } from './history-layer.ts'
import { OverlayView } from './OverlayView.tsx'
import {
  bindSessionActions,
  commandWithQuestion,
  ensureSession,
  mirroredSession,
  mirrorSession,
  readRecentWorkspaceId,
  readSessionId,
  type SessionActions,
  type SessionsHandle,
  type WorkspacesHandle,
} from './session-source.ts'

export type OverlayHost = {
  locale?: LocaleHandle
  remote?: { commands?: { execute: (sessionId: string, line: string, images: readonly unknown[], signal?: AbortSignal) => Promise<unknown> } }
  sessions?: SessionsHandle
  workspaces?: WorkspacesHandle
}

type OverlayProps = SessionActions & {
  useCurrentSessionId?: (sel: (id: string | undefined) => unknown) => unknown
  useSessions?: (sel: (s: { current?: string }) => unknown) => unknown
  useWorkspaces?: (sel: (s: {
    recentWorkspaceId?: string
    items?: readonly { workspaceId: string }[]
  }) => unknown) => unknown
}

function failText(error: unknown, fallback: string): string {
  const text = error instanceof Error ? error.message : String(error)
  return text === 'need-session' ? fallback : text
}

let interpretLock = false

export function createLuminaOverlay(
  ctx: OverlayHost,
  scope: SettingsHandle | undefined,
) {
  const fallbackActions = bindSessionActions(ctx)
  return function LuminaOverlay(props: OverlayProps) {
    const [config, setConfig] = useState(() => luminaConfig())
    const [menu, setMenu] = useState(false)
    const [ask, setAsk] = useState(false)
    const [pendingSpread, setPendingSpread] = useState(() => luminaConfig().defaultSpread as SpreadId)
    const [question, setQuestion] = useState('')
    const [phase, setPhase] = useState<'idle' | 'loading' | 'result' | 'error'>('idle')
    const [errorText, setErrorText] = useState('')
    const [reading, setReading] = useState<ReadingPayload | null>(null)
    const [busy, setBusy] = useState(false)
    const [interpreting, setInterpreting] = useState(false)
    const [interpretNote, setInterpretNote] = useState('')
    const [dshLocale, setDshLocale] = useState(() => ctx.locale?.getSnapshot?.()?.active ?? 'zh')
    const dragRef = useRef(null as DragState | null)
    const cardRef = useRef<HTMLDivElement>(null)
    const menuRef = useRef<HTMLDivElement>(null)
    const drawingRef = useRef(false)
    const interpretingRef = useRef(false)
    const phaseRef = useRef(phase)
    phaseRef.current = phase

    useEffect(() => watchLuminaConfig(() => setConfig({ ...luminaConfig() })), [])
    useEffect(() => ctx.locale?.subscribe?.(() => setDshLocale(ctx.locale?.getSnapshot?.()?.active ?? 'zh')) ?? (() => undefined), [])
    useEffect(() => {
      const onCleared = () => {
        setReading(null)
        setQuestion('')
        setPhase('idle')
        setErrorText('')
        setInterpretNote('')
      }
      window.addEventListener(LUMINA_HISTORY_CLEARED, onCleared)
      return () => window.removeEventListener(LUMINA_HISTORY_CLEARED, onCleared)
    }, [])

    const locale = resolveUiLocale(config, dshLocale)
    const tx = (key: Parameters<typeof t>[1]) => t(locale, key)
    const persist = useCallback((field: keyof LuminaConfig, value: LuminaConfig[keyof LuminaConfig]) => {
      void persistLuminaField(scope, field, value)
    }, [])

    const sessionId = readSessionId(props)
    if (sessionId) mirrorSession(sessionId)
    const recentWorkspaceId = readRecentWorkspaceId(props)

    const executeLine = useCallback(async (line: string) => {
      const execute = ctx.remote?.commands?.execute
      if (typeof execute !== 'function') throw new Error('当前环境没有命令通道')
      const id = await ensureSession(sessionId, recentWorkspaceId, {
        connectWorkspace: props.connectWorkspace ?? fallbackActions.connectWorkspace,
        openSession: props.openSession ?? fallbackActions.openSession,
        createSession: props.createSession ?? fallbackActions.createSession,
      })
      const result = unwrapCommandResult(await execute(id, line, []))
      if (result.kind === 'error') throw new Error(result.text || '命令失败')
      return result
    }, [sessionId, recentWorkspaceId, props.connectWorkspace, props.openSession, props.createSession])

    const history = useHistoryLayer(executeLine)
    const closeLayers = useCallback(() => {
      setMenu(false)
      setAsk(false)
      history.setOpen(false)
    }, [history.setOpen])
    useOverlayDismiss({
      active: menu || ask || history.open,
      modal: ask || history.open,
      menuRef,
      cardRef,
      onDismiss: closeLayers,
    })

    const runCommand = useCallback(async (line: string) => {
      return parseReading((await executeLine(line)).text)
    }, [executeLine])

    const startDraw = useCallback(async (line: string, asked = '') => {
      if (drawingRef.current) return
      drawingRef.current = true
      setBusy(true)
      closeLayers()
      setPhase('loading')
      setErrorText('')
      setInterpretNote('')
      const wait = new Promise((resolve) => setTimeout(resolve, minShuffleMs(config.animationLevel)))
      try {
        const [payload] = await Promise.all([runCommand(commandWithQuestion(line, asked)), wait])
        setReading({ ...payload, question: payload.question || asked.trim() || undefined })
        setPhase('result')
      } catch (error) {
        await wait.catch(() => undefined)
        setReading(null)
        setErrorText(failText(error, '请先打开一个会话再抽牌'))
        setPhase('error')
      } finally {
        drawingRef.current = false
        setBusy(false)
      }
    }, [closeLayers, config.animationLevel, runCommand])

    const startInterpret = useCallback(async () => {
      if (drawingRef.current || interpretingRef.current || interpretLock || !reading) return
      interpretLock = true
      interpretingRef.current = true
      setInterpreting(true)
      setInterpretNote('')
      setPhase('idle')
      try {
        await executeLine('/lumina interpret')
      } catch (error) {
        setInterpretNote(failText(error, tx('interpretNeedSession')))
        setPhase('result')
      } finally {
        interpretLock = false
        interpretingRef.current = false
        setInterpreting(false)
      }
    }, [executeLine, reading])

    const openLast = useCallback(async () => {
      if (drawingRef.current) return
      closeLayers()
      setBusy(true)
      setErrorText('')
      try {
        const payload = await runCommand('/lumina last')
        setReading(payload)
        setQuestion(payload.question ?? '')
        setPhase('result')
      } catch (error) {
        setReading(null)
        setErrorText(failText(error, '请先打开一个会话再抽牌'))
        setPhase('error')
      } finally {
        setBusy(false)
      }
    }, [closeLayers, runCommand])

    useEffect(() => listenToolReading({
      drawingRef,
      phaseRef,
      animationLevel: config.animationLevel,
      setBusy,
      setMenu,
      setAsk,
      setHistoryOpen: history.setOpen,
      setPhase,
      setErrorText,
      setReading,
    }), [config.animationLevel, history.setOpen])

    const pointer = createFloatPointer({
      dragRef,
      cardRef,
      drawingRef,
      scope,
      getAsk: () => ask,
      getMenu: () => menu,
      getDefaultSpread: () => config.defaultSpread,
      onAsk: () => setAsk(true),
      setMenu,
      setPendingSpread,
    })

    if (!config.showFloatCard && phase === 'idle' && !menu && !ask && !history.open) return null

    const px = posToPx(config.floatX, config.floatY)
    return (
      <OverlayView
        theme={config.theme}
        showFloat={config.showFloatCard}
        menu={menu}
        ask={ask}
        historyOpen={history.open}
        phase={phase}
        cardRef={cardRef}
        menuRef={menuRef}
        title={tx('floatTitle')}
        left={px.left}
        top={px.top}
        radius={radiusFor(config.theme)}
        animationLevel={config.animationLevel}
        cardBack={effectiveCardBack(config)}
        cardArtTheme={config.cardArtTheme}
        pointer={pointer}
        pendingSpread={pendingSpread}
        busy={busy}
        locale={locale}
        tx={tx}
        lastLabel={tx('openLast')}
        historyLabel={tx('viewHistory')}
        onPickSpread={(id) => {
          setPendingSpread(id)
          persist('defaultSpread', id)
          setMenu(false)
          setAsk(true)
        }}
        onOpenLast={() => void openLast()}
        onOpenHistory={() => {
          setMenu(false)
          history.setOpen(true)
        }}
        onCloseMenu={() => setMenu(false)}
        question={question}
        opacity={config.panelOpacity}
        onQuestion={setQuestion}
        onAskSubmit={() => void startDraw(`/lumina draw ${pendingSpread}`, question.trim())}
        onAskClose={() => setAsk(false)}
        loadHistory={history.load}
        onHistoryClose={() => history.setOpen(false)}
        config={config}
        errorText={errorText}
        reading={reading}
        panelBusy={busy || interpreting}
        canInterpret={Boolean((sessionId || mirroredSession()) && reading && !busy && !interpreting)}
        interpretNote={interpretNote}
        startDraw={startDraw}
        startInterpret={() => void startInterpret()}
        setPhase={setPhase}
      />
    )
  }
}
