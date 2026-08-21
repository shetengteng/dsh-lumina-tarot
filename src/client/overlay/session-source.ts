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

export type SessionsHandle = {
  open: (id: string) => void
  create?: (opts?: { workspaceId?: string; cwd?: string }) => Promise<string>
  list?: { getSnapshot?: () => { current?: string } }
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
  if (!pendingEnsure) {
    pendingEnsure = openNewSession(recentWorkspaceId, actions).finally(() => {
      pendingEnsure = undefined
    })
  }
  return pendingEnsure
}
