import clsx from 'clsx'
import { ReactNode } from 'react'
import { CommonProps } from '../../types/common'

type Paper = { children: ReactNode } & CommonProps

export const Paper = (props: Paper) => {
  return (
    <div
      className={clsx(
        'border border-gray-200/80 bg-[#fafafa] rounded-md overflow-hidden drop-shadow-md p-4',
        props.className
      )}>
      {props.children}
    </div>
  )
}
