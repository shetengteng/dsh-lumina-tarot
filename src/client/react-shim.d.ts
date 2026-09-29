declare module '@deepseek-ai/dsh-client-ui-primitives' {
  import type { ReactNode } from 'react'
  type Comp = (props: Record<string, unknown> & { children?: ReactNode }) => ReactNode
  export const Button: Comp
  export const Menu: Comp
  export const IconChevronDownOutlineRegular: Comp
  export const IconThinkOutlineRegular: Comp
  export const IconRefreshOutlineRegular: Comp
  export const IconCloseOutlineRegular: Comp
}

declare module '*.webp' {
  const src: string
  export default src
}

declare module '*.json' {
  const value: unknown
  export default value
}
