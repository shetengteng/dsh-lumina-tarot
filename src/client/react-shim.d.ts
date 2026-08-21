declare module '@deepseek-ai/dsh-client-ui-primitives' {
  import type { ReactNode } from 'react'
  type Comp = (props: Record<string, unknown> & { children?: ReactNode }) => ReactNode
  export const Button: Comp
  export const Menu: Comp
  export const IconChevronDownOutline14: Comp
  export const IconThinkOutline16: Comp
  export const IconRefreshOutline16: Comp
  export const IconCloseOutline16: Comp
}

declare module '*.webp' {
  const src: string
  export default src
}

declare module '*.json' {
  const value: unknown
  export default value
}
