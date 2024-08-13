import { useState } from 'react'
import { Paper } from '../components/layout/Paper'
import { TickerItem } from '../components/TickerItem'
import { useTicker } from '../hooks/useTicker'

export const Main = () => {
  const crypto = useTicker()
  const [displayedTickers, setDisplayedTickers] = useState(() => crypto.getTickers())

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value

    if (value === '') {
      setDisplayedTickers(crypto.getTickers())
      return
    }

    const newTickers = crypto.find(value)
    setDisplayedTickers(newTickers)
  }

  return (
    <div className='flex justify-center items-center flex-col h-screen p-4'>
      <Paper className='w-[50svw] flex flex-col gap-4 max-h-[1000px] h-[100svh]'>
        <p className='text-3xl'>Cryptocurrencies</p>

        <div className='flex justify-between mt-4 h-full gap-4 overflow-hidden'>
          <div className='w-1/3 px-2 flex flex-col gap-2'>
            <input
              onChange={handleSearchChange}
              className='w-full'
              type='text'
              placeholder='Enter display name / symbol'
            />
            <div className='flex flex-col h-full overflow-auto gap-1 py-2'>
              {displayedTickers.map(ticker => (
                <TickerItem
                  key={ticker.symbol}
                  displayName={ticker.displayName}
                  ticker={ticker.symbol}
                  price={ticker.price}
                />
              ))}
            </div>
          </div>

          <div className='w-1/3 flex flex-col h-full overflow-auto gap-1 py-1'></div>
        </div>
      </Paper>
    </div>
  )
}
