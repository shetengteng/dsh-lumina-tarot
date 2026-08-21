import { ModalDust } from '../fx/ModalDust.tsx'
import { scrimFill } from '../fx/scrim.ts'
import { AskForm } from '../panel/AskForm.tsx'
import type { Tx } from '../i18n.ts'
import type { AnimationLevel, LocaleId, SpreadId } from '../../domain/types.ts'

export function AskDialog(props: {
  tx: Tx
  locale: LocaleId
  pendingSpread: SpreadId
  question: string
  busy: boolean
  opacity: number
  animationLevel: AnimationLevel
  onQuestion: (value: string) => void
  onSubmit: () => void
  onClose: () => void
}) {
  return (
    <div
      className="dsh-lumina-ask-modal"
      onClick={(event) => {
        if (event.target === event.currentTarget) props.onClose()
      }}
    >
      <div className="dsh-lumina-scrim" style={scrimFill(props.opacity)} />
      <ModalDust level={props.animationLevel} />
      <AskForm
        tx={props.tx}
        locale={props.locale}
        pendingSpread={props.pendingSpread}
        question={props.question}
        busy={props.busy}
        onQuestion={props.onQuestion}
        onSubmit={props.onSubmit}
        onClose={props.onClose}
      />
    </div>
  )
}
