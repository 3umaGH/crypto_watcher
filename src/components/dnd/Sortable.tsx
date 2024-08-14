import { useSortable } from '@dnd-kit/sortable'
import { ReactNode } from 'react'
import { CommonProps } from '../../types/common'

type SortableT = {
  id: string
  children: ReactNode
} & CommonProps

export const Sortable = (props: SortableT) => {
  const { attributes, listeners, setNodeRef } = useSortable({ id: props.id })

  return (
    <div className={props.className} ref={setNodeRef} {...attributes} {...listeners} {...props}>
      {props.children}
    </div>
  )
}
