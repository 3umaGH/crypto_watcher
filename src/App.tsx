import { useEffect, useState } from 'react'
import { getTickers } from './api/api'
import { TickerItem } from './components/TickerItem'
import { TickerContext } from './context/tickerContext'
import { Ticker } from './types/common'
import { getErrorMessage } from './util/util'

const USDT_PAIR_FILTER = (ticker: Ticker) => ticker.symbol.endsWith('USDT')

function App() {
  const [tickers, setTickers] = useState<Ticker[]>([])
  const [error, setError] = useState<null | string>(null)

  const updateTickers = () => {
    getTickers()
      .then(resp => {
        setTickers(resp.data.filter(USDT_PAIR_FILTER))
      })
      .catch(err => {
        setError(getErrorMessage(err))
      })
  }

  useEffect(() => {
    updateTickers()
  }, [])

  if (error) {
    return <p className='text-red-800 text-center'>Error occured: {error}</p>
  }

  return (
    <TickerContext.Provider value={{ tickers: tickers }}>
      <div>App</div>
    </TickerContext.Provider>
  )
}

export default App
