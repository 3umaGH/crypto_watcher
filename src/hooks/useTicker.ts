import { useContext } from 'react'
import { TickerContext } from '../context/tickerContext'

export const useTicker = () => {
  const { tickers } = useContext(TickerContext)

  const getTickers = () => {
    return tickers
  }

  const findByDisplayName = (query: string) => {
    return tickers.filter(ticker => ticker.displayName?.toLowerCase().startsWith(query.toLowerCase()))
  }

  const findBySymbol = (query: string) => {
    return tickers.filter(ticker => ticker.symbol.toLowerCase().includes(query.toLowerCase()))
  }

  return { getTickers, findByDisplayName, findBySymbol }
}
