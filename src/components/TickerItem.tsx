import clsx from 'clsx'
import { CommonProps } from '../types/common'
import { TickerLogo } from './TickerImage'

type TickerItem = {
  displayName: string | null
  ticker: string
  price: string
} & CommonProps

export const TickerItem = (props: TickerItem) => {
  const floatPrice = parseFloat(props.price)
  const priceDecimals = floatPrice > 0.1 ? 2 : floatPrice > 0.0001 ? 4 : 7
  const convertedPrice = Number(props.price).toFixed(priceDecimals)
  const mainSymbol = props.ticker.replace('USDT', '')

  return (
    <div
      className={clsx(
        'border shadow-sm flex items-center gap-2 overflow-hidden rounded-md min-w-[170px] p-2 shrink-0 bg-white',
        props.className
      )}>
      <TickerLogo className='w-8 h-8 border rounded-full p-0.5' ticker={mainSymbol} />
      <div className='flex flex-col md:text-xl'>
        {props.displayName ? (
          <div>
            <span>{props.displayName}</span> <span className='text-sm text-gray-500 font-light'>({mainSymbol})</span>
          </div>
        ) : (
          <span>{mainSymbol}</span>
        )}
        <span className='font-light'>${convertedPrice}</span>
      </div>
    </div>
  )
}
