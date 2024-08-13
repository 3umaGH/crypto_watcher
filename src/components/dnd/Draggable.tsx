import { useDraggable } from '@dnd-kit/core'
import { ReactNode } from 'react'
import { CommonProps } from '../../types/common'

type DraggableT = {
  id: string
  children: ReactNode
} & CommonProps

export const Draggable = (props: DraggableT) => {
  const { attributes, listeners, setNodeRef } = useDraggable({
    id: props.id,
  })

  return (
    <div ref={setNodeRef} style={{ userSelect: 'none' }} {...listeners} {...attributes}>
      {props.children}
    </div>
  )
}
