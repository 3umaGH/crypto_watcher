import { useEffect, useState } from 'react'
import { getTickers } from './api/api'
import { TickerContext } from './context/tickerContext'
import cryptocurrencies from './crypto/cryptocurrencies.json'
import { Main } from './pages/Main'
import { Ticker } from './types/common'
import { getErrorMessage } from './util/util'
import { TICKER_UPDATE_INTERVAL_MS } from './config'

const CRYPTO_NAMES: { [key: string]: string } = cryptocurrencies
const USDT_PAIR_FILTER = (ticker: { symbol: string }) => ticker.symbol.endsWith('USDT')

function App() {
  const [tickers, setTickers] = useState<Ticker[]>([])
  const [watchedTickers, setWatchedTickers] = useState<string[]>([])
  const [error, setError] = useState<null | string>(null)

  const updateTickers = () => {
    getTickers()
      .then(resp => {
        const filteredTickers = resp.data.filter(USDT_PAIR_FILTER)
        const mappedTickers = filteredTickers.map(ticker => ({
          ...ticker,
          displayName: CRYPTO_NAMES[ticker.symbol.replace('USDT', '')] ?? null,
        }))

        setTickers(mappedTickers)
        setError(null)

        console.log('update')
      })
      .catch(err => {
        setError(getErrorMessage(err))
      })
  }

  useEffect(() => {
    updateTickers() // Initial fetch

    const updateInterval = setInterval(() => updateTickers(), TICKER_UPDATE_INTERVAL_MS)

    return () => clearInterval(updateInterval)
  }, [])

  if (error) {
    return (
      <div className='flex items-center justify-center h-screen'>
        <p className='text-red-800'>Error occured: {error}</p>
      </div>
    )
  }

  if (tickers.length === 0) {
    return (
      <div className='flex items-center justify-center h-screen'>
        <p>Loading...</p>
      </div>
    )
  }

  return (
    <TickerContext.Provider
      value={{ tickers: tickers, watchedTickers: watchedTickers, setWatchedTickers: setWatchedTickers }}>
      <button onClick={updateTickers}>asdf</button>
      <Main />
    </TickerContext.Provider>
  )
}

export default App
