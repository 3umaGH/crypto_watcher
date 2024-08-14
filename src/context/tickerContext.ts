import { createContext } from 'react'
import { Ticker } from '../types/common'

type TickerContext = {
  tickers: Ticker[]
  watchedTickers: string[]
  setWatchedTickers: React.Dispatch<React.SetStateAction<string[]>>
}

export const TickerContext = createContext<TickerContext>({
  tickers: [],
  watchedTickers: [],
  setWatchedTickers: () => {},
})
