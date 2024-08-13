import clsx from 'clsx'
import { memo, useEffect, useState } from 'react'
import { getKLines } from '../api/api'
import { CommonProps, KLine } from '../types/common'
import { mapKlineResponse } from '../util/mapper'
import { TickerChart } from './TickerChart'
import { TickerLogo } from './TickerImage'
import { getErrorMessage } from '../util/util'

type TickerItem = {
  displayName: string | null
  ticker: string
  price: string
  showChart: boolean
} & CommonProps

export const TickerItem = memo((props: TickerItem) => {
  const [kLines, setKLines] = useState<KLine[]>([])
  const [isLoading, setLoading] = useState(false)
  const [error, setError] = useState<null | string>(null)

  const floatPrice = parseFloat(props.price)
  const priceDecimals = floatPrice > 0.1 ? 2 : floatPrice > 0.0001 ? 4 : 7
  const convertedPrice = Number(props.price).toFixed(priceDecimals)
  const mainSymbol = props.ticker.replace('USDT', '')

  useEffect(() => {
    if (props.showChart) {
      setLoading(true)

      getKLines(props.ticker, '15m')
        .then(resp => {
          setKLines(mapKlineResponse(resp.data))
        })
        .catch(err => setError(getErrorMessage(err)))
        .finally(() => {
          setLoading(false)
        })
    }
  }, [props.showChart, props.ticker])

  return (
    <div
      className={clsx(
        'border shadow-sm flex items-center gap-2 overflow-visible rounded-md min-w-[170px] flex-wrap p-2 shrink-0 bg-white',
        props.className
      )}>
      <TickerLogo className='w-8 h-8 border rounded-full p-0.5' ticker={mainSymbol} />
      <div className='flex flex-col md:text-xl whitespace-nowrap'>
        {props.displayName ? (
          <div>
            <span>{props.displayName}</span> <span className='text-sm text-gray-500 font-light'>({mainSymbol})</span>
          </div>
        ) : (
          <span>{mainSymbol}</span>
        )}
        <span className='font-light'>${convertedPrice}</span>
      </div>
      {props.showChart && (
        <div className='flex justify-center items-center flex-col w-full border-md overflow-hidden'>
          {error ? (
            <span className='text-red-700'>Chart: {error}</span>
          ) : (
            <TickerChart isLoading={isLoading} data={kLines} />
          )}
        </div>
      )}
    </div>
  )
})
