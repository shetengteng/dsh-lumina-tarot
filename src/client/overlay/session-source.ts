export function commandWithQuestion(base: string, asked: string): string {
  const question = asked.trim().replace(/\s+/g, ' ')
  return question ? `${base} ${question}` : base
}

let mirroredSessionId: string | undefined
let pendingEnsure: Promise<string> | undefined

export function mirrorSession(id: string | undefined): void {
  mirroredSessionId = id
}

export function mirroredSession(): string | undefined {
  return mirroredSessionId
}

type PromptResult = {
  ok?: boolean
  error?: { message?: string; code?: string }
}

export type SessionsHandle = {
  open: (id: string) => void
  create?: (opts?: { workspaceId?: string; cwd?: string }) => Promise<string>
  list?: {
    getSnapshot?: () => {
      current?: string
      byId?: Record<string, { blank?: boolean }>
    }
  }
  binding?: (id: string) => { session?: { prompt?: (content: Array<{ type: 'text'; text: string }>, mode: 'queue' | 'steer') => Promise<PromptResult> } } | undefined
}

export type WorkspacesHandle = {
  connectWorkspace: (workspaceId: string) => Promise<string>
  startSession?: (workspaceId?: string) => void
  list?: {
    getSnapshot?: () => {
      recentWorkspaceId?: string
      items?: readonly { workspaceId: string }[]
    }
  }
}

export type SessionActions = {
  connectWorkspace: (workspaceId: string) => Promise<string>
  openSession: (id: string) => void
  createSession?: (opts?: { workspaceId?: string }) => Promise<string>
  listedCurrent: () => string | undefined
}

export function bindSessionActions(ctx: {
  sessions?: SessionsHandle
  workspaces?: WorkspacesHandle
}): SessionActions {
  return {
    connectWorkspace: (workspaceId) => {
      const fn = ctx.workspaces?.connectWorkspace
      if (typeof fn !== 'function') throw new Error('need-session')
      return fn.call(ctx.workspaces, workspaceId)
    },
    openSession: (id) => {
      const fn = ctx.sessions?.open
      if (typeof fn !== 'function') throw new Error('need-session')
      fn.call(ctx.sessions, id)
    },
    createSession: (opts) => {
      const fn = ctx.sessions?.create
      if (typeof fn !== 'function') throw new Error('need-session')
      return fn.call(ctx.sessions, opts)
    },
    listedCurrent: () => {
      try {
        return ctx.sessions?.list?.getSnapshot?.()?.current
      } catch {
        return undefined
      }
    },
  }
}

export function readSessionId(props: {
  useCurrentSessionId?: (sel: (id: string | undefined) => unknown) => unknown
  useSessions?: (sel: (s: { current?: string }) => unknown) => unknown
}): string | undefined {
  try {
    if (typeof props.useCurrentSessionId === 'function') {
      return props.useCurrentSessionId((id) => id) as string | undefined
    }
  } catch { /* overlay is root-scoped; bound hook may be absent */ }
  try {
    if (typeof props.useSessions === 'function') {
      return props.useSessions((s) => s?.current) as string | undefined
    }
  } catch { /* standing seat may throw outside session scope */ }
  return undefined
}

export function readRecentWorkspaceId(props: {
  useWorkspaces?: (sel: (s: {
    recentWorkspaceId?: string
    items?: readonly { workspaceId: string }[]
  }) => unknown) => unknown
}): string | undefined {
  try {
    if (typeof props.useWorkspaces === 'function') {
      return props.useWorkspaces((s) => s?.recentWorkspaceId ?? s?.items?.[0]?.workspaceId) as string | undefined
    }
  } catch { return undefined }
}

const SETTLE_MS = 280

function settle(): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, SETTLE_MS))
}

export { settle }

async function openNewSession(
  recentWorkspaceId: string | undefined,
  actions: SessionActions,
): Promise<string> {
  let id: string | undefined
  if (recentWorkspaceId) {
    id = await actions.connectWorkspace(recentWorkspaceId)
  } else if (typeof actions.createSession === 'function') {
    id = await actions.createSession({})
  }
  if (!id) throw new Error('need-session')
  actions.openSession(id)
  mirrorSession(id)
  await settle()
  return id
}

export async function ensureSession(
  current: string | undefined,
  recentWorkspaceId: string | undefined,
  actions: SessionActions,
): Promise<string> {
  if (current) {
    mirrorSession(current)
    return current
  }
  const listed = actions.listedCurrent?.()
  if (listed) {
    mirrorSession(listed)
    return listed
  }
  const remembered = mirroredSession()
  if (remembered) return remembered
  if (!pendingEnsure) {
    pendingEnsure = openNewSession(recentWorkspaceId, actions).finally(() => {
      pendingEnsure = undefined
    })
  }
  return pendingEnsure
}

export async function promptSession(
  sessions: SessionsHandle | undefined,
  id: string,
  text: string,
): Promise<void> {
  let prompt = sessions?.binding?.(id)?.session?.prompt
  if (typeof prompt !== 'function') {
    await settle()
    prompt = sessions?.binding?.(id)?.session?.prompt
  }
  const session = sessions?.binding?.(id)?.session
  if (typeof prompt !== 'function' || !session) throw new Error('need-session')
  const result = await prompt.call(session, [{ type: 'text', text }], 'queue')
  if (result && result.ok === false) {
    throw new Error(result.error?.message || result.error?.code || '未能把解读发到会话')
  }
}
