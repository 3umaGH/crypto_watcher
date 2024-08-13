import { useContext } from 'react'
import { TickerContext } from '../context/tickerContext'
import { Ticker } from '../types/common'

const NAME_FILTER = (ticker: Ticker, query: string) => ticker.displayName?.toLowerCase().startsWith(query.toLowerCase())
const SYMBOL_FILTER = (ticker: Ticker, query: string) => ticker.symbol.toLowerCase().startsWith(query.toLowerCase())

export const useTicker = () => {
  const { tickers } = useContext(TickerContext)

  const getTickers = () => {
    return tickers
  }

  const findByDisplayName = (query: string) => {
    return tickers.filter(ticker => NAME_FILTER(ticker, query))
  }

  const findBySymbol = (query: string) => {
    return tickers.filter(ticker => SYMBOL_FILTER(ticker, query))
  }

  const find = (query: string) => {
    return tickers.filter(ticker => {
      return NAME_FILTER(ticker, query) || SYMBOL_FILTER(ticker, query)
    })
  }

  return { getTickers, findByDisplayName, findBySymbol, find }
}
