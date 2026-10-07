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

/** Session row as the 0.2.x catalog exposes it; `retainedBy` carries main-view ownership. */
export type SessionRow = {
  blank?: boolean
  retainedBy?: Readonly<Partial<Record<string, number>>>
}

export type SessionListSnapshot = {
  ids?: readonly string[]
  byId?: Record<string, SessionRow>
  phase?: 'pending' | 'ready'
}

export type SessionsHandle = {
  open?: (id: string) => void
  create?: (opts?: { workspaceId?: string; cwd?: string; sessionId?: string }) => Promise<string>
  list?: { getSnapshot?: () => SessionListSnapshot }
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
  /** Current main-view session, or undefined when none is open (or no catalog exists). */
  listedCurrent: (preferred?: string) => string | undefined
  /** False while the catalog has not delivered rows yet, so absence proves nothing. */
  catalogReady?: () => boolean
}

/**
 * Pick the Session currently shown in the main view.
 *
 * The catalog exposes no `current` field. Navigation belongs to view owners, and
 * the shell's own `UiSession.isMain` decides "main" purely from the row's main-view
 * retain count, so that is the only predicate to share:
 *   `(byId[id].retainedBy.mainView ?? 0) > 0`
 *
 * `ids` gives the host order; without it, fall back to insertion order. A row whose
 * own main-view count dropped is skipped, so a stale preference cannot win.
 */
export function currentFromList(
  list: SessionListSnapshot | undefined,
  preferred?: string,
): string | undefined {
  const byId = list?.byId
  if (!byId) return undefined
  const owned = (id: string | undefined) =>
    id !== undefined && (byId[id]?.retainedBy?.mainView ?? 0) > 0
  if (owned(preferred)) return preferred
  const order = list?.ids?.length ? list.ids : Object.keys(byId)
  return order.find(owned)
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
    listedCurrent: (preferred?: string) => {
      try {
        return currentFromList(ctx.sessions?.list?.getSnapshot?.(), preferred)
      } catch {
        return undefined
      }
    },
    catalogReady: () => {
      try {
        const list = ctx.sessions?.list?.getSnapshot?.()
        if (!list) return false
        return list.phase === 'ready' && Object.keys(list.byId ?? {}).length > 0
      } catch {
        return false
      }
    },
  }
}

export function readSessionId(props: {
  useSessions?: (sel: (s: SessionListSnapshot) => unknown) => unknown
}): string | undefined {
  try {
    if (typeof props.useSessions === 'function') {
      return props.useSessions((s) => currentFromList(s)) as string | undefined
    }
  } catch { /* standing seat may throw outside session scope */ }
  return undefined
}

export function readRecentWorkspaceId(props: {
  useWorkspaces?: (sel: (s: {
    items?: readonly { workspaceId: string }[]
  }) => unknown) => unknown
}): string | undefined {
  try {
    if (typeof props.useWorkspaces === 'function') {
      // 0.2.x dropped `recentWorkspaceId`; the first row is the most recent workspace.
      return props.useWorkspaces((s) => s?.items?.[0]?.workspaceId) as string | undefined
    }
  } catch { return undefined }
}

const SETTLE_MS = 280

function settle(): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, SETTLE_MS))
}

export { settle }

/**
 * The workspace store loads asynchronously, so `connectWorkspace` can reject with
 * "unknown workspace <id>" while `items` is still empty. That is a race, not a
 * verdict — retry a few times before giving up.
 */
async function connectWorkspaceWithRetry(
  recentWorkspaceId: string,
  actions: SessionActions,
): Promise<string> {
  let lastError: unknown
  for (let attempt = 0; attempt < 3; attempt += 1) {
    if (attempt > 0) await settle()
    try {
      const id = await actions.connectWorkspace(recentWorkspaceId)
      if (id) return id
    } catch (error) {
      lastError = error
    }
  }
  throw lastError instanceof Error ? lastError : new Error('need-session')
}

async function openNewSession(
  recentWorkspaceId: string | undefined,
  actions: SessionActions,
): Promise<string> {
  let id: string | undefined
  if (recentWorkspaceId) {
    // A known workspace is the user's own context, so prefer it. If it never
    // becomes connectable the list itself is unusable, and letting the error
    // surface is better than silently opening a session somewhere else.
    id = await connectWorkspaceWithRetry(recentWorkspaceId, actions)
  } else if (typeof actions.createSession === 'function') {
    id = await actions.createSession({})
  }
  if (!id) throw new Error('need-session')
  actions.openSession(id)
  mirrorSession(id)
  await settle()
  return id
}

/**
 * Resolve a session the Host will accept a command against.
 *
 * Only a session the catalog still reports as main-view owned is safe to reuse;
 * the catalog is the sole authority on what the user is currently looking at.
 * Creating a session is the last resort, and it does move the shell's main view.
 */
export async function ensureSession(
  current: string | undefined,
  recentWorkspaceId: string | undefined,
  actions: SessionActions,
): Promise<string> {
  if (current) {
    mirrorSession(current)
    return current
  }
  // Prefer the session we last used, but only while the catalog still agrees.
  const remembered = mirroredSession()
  const listed = actions.listedCurrent?.(remembered)
  if (listed) {
    mirrorSession(listed)
    return listed
  }
  // Absence only means "none is open" once the catalog has actually delivered
  // rows. Before that, a remembered id beats forcing a new session into view.
  if (remembered && actions.catalogReady?.() === false) return remembered
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
