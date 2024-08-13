import clsx from 'clsx'
import { memo, useEffect, useState } from 'react'
import { getKLines } from '../api/api'
import { CandlestickInterval, CommonProps, KLine } from '../types/common'
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

const CANDLESTICK_INTERVALS = [
  '1m',
  '3m',
  '5m',
  '15m',
  '30m',
  '1h',
  '2h',
  '4h',
  '6h',
  '8h',
  '12h',
  '1d',
  '3d',
  '1w',
  '1M',
]

export const TickerItem = memo((props: TickerItem) => {
  const [kLinesInterval, setKLinesInterval] = useState<CandlestickInterval>('3m')
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

      getKLines(props.ticker, kLinesInterval)
        .then(resp => {
          setKLines(mapKlineResponse(resp.data))
        })
        .catch(err => setError(getErrorMessage(err)))
        .finally(() => {
          setLoading(false)
        })
    }
  }, [kLinesInterval, props.showChart, props.ticker])

  const handleIntervalChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setKLinesInterval(e.currentTarget.value as CandlestickInterval)
  }
  return (
    <div
      className={clsx(
        'border shadow-sm grid grid-cols-1 gap-2 overflow-visible rounded-md min-w-[170px]  p-2 shrink-0 bg-white',
        props.className
      )}>
      <div className={`flex gap-1 col-span-1`}>
        <TickerLogo className='w-8 h-8 border rounded-full p-0.5' ticker={mainSymbol} />
        <div className='flex flex-col md:text-xl whitespace-nowrap w-full'>
          <div className='w-full flex'>
            {props.displayName ? (
              <div>
                <span>{props.displayName}</span>{' '}
                <span className='text-sm text-gray-500 font-light'>({mainSymbol})</span>
              </div>
            ) : (
              <span>{mainSymbol}</span>
            )}

            {props.showChart && (
              <div className='ml-auto text-sm'>
                <select onChange={handleIntervalChange}>
                  {CANDLESTICK_INTERVALS.map(int => (
                    <option value={int}>{int}</option>
                  ))}
                </select>
              </div>
            )}
          </div>

          <span className='font-light'>${convertedPrice}</span>
        </div>
      </div>

      {props.showChart && (
        <div className='col-span-1 flex justify-center items-center flex-col w-full border-md overflow-hidden'>
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
