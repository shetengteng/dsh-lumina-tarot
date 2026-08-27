import { buildInterpretPrompt } from '../../domain/interpret-prompt.ts'
import type { ReadingPayload } from '../../domain/types.ts'
import {
  ensureSession,
  promptSession,
  settle,
  type SessionActions,
  type SessionsHandle,
} from './session-source.ts'

export function liveSessionId(
  current: string | undefined,
  sessions: SessionsHandle | undefined,
  listedCurrent: () => string | undefined,
): string | undefined {
  const id = current || listedCurrent?.()
  if (!id) return undefined
  if (sessions?.list?.getSnapshot?.()?.byId?.[id]?.blank === true) return undefined
  return id
}

export async function runInterpret(opts: {
  reading: ReadingPayload
  current: string | undefined
  recentWorkspaceId: string | undefined
  actions: SessionActions
  sessions: SessionsHandle | undefined
  executeInterpret: () => Promise<unknown>
}): Promise<void> {
  if (liveSessionId(opts.current, opts.sessions, opts.actions.listedCurrent)) {
    await opts.executeInterpret()
    return
  }
  const id = await ensureSession(opts.current, opts.recentWorkspaceId, opts.actions)
  opts.actions.openSession(id)
  await settle()
  await promptSession(opts.sessions, id, buildInterpretPrompt(opts.reading))
}
