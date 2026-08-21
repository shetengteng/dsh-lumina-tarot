import { Component, type ReactNode } from 'react'

export class OverlayGuard extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false }

  static getDerivedStateFromError(): { failed: boolean } {
    return { failed: true }
  }

  componentDidCatch(error: unknown) {
    console.error('[lumina-tarot] overlay panel failed', error)
  }

  render() {
    if (this.state.failed) return null
    return this.props.children
  }
}
