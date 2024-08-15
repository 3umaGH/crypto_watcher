import { useDraggable } from '@dnd-kit/core'
import clsx from 'clsx'
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
    <div className='relative overflow-hidden'>
      <div
        {...listeners}
        {...attributes}
        ref={setNodeRef}
        className={'absolute z-[1] handle cursor-pointer h-full w-full'}
      />

      <div
        className={clsx('relative', props.className)}
        style={{ userSelect: 'none' }}
        onTouchStart={e => e.stopPropagation()}
        onMouseDown={e => e.stopPropagation()}>
        {props.children}
      </div>
    </div>
  )
}
