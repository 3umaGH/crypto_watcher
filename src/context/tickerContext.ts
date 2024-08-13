import { createContext } from 'react'
import { Ticker } from '../types/common'

type TickerContext = {
  tickers: Ticker[]
}

export const TickerContext = createContext<TickerContext>({ tickers: [] })
