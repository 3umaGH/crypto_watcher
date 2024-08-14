import { useDroppable } from '@dnd-kit/core'
import { ReactNode } from 'react'
import { CommonProps } from '../../types/common'

type DroppableT = {
  id: string
  children: ReactNode
} & CommonProps

export const Droppable = (props: DroppableT) => {
  const { isOver, setNodeRef } = useDroppable({
    id: props.id,
  })

  const style = {
    width: '100%',
    height: '100%',
    overflow: 'auto',
    fontSize: isOver ? '1.15rem' : '1rem',
  }

  return (
    <div className={props.className} ref={setNodeRef} style={style}>
      {props.children}
    </div>
  )
}
