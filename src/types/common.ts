export type CommonProps = {
  className?: string
}

export type CandlestickInterval =
  | '1s'
  | '1m'
  | '3m'
  | '5m'
  | '15m'
  | '30m'
  | '1h'
  | '2h'
  | '4h'
  | '6h'
  | '8h'
  | '12h'
  | '1d'
  | '3d'
  | '1w'
  | '1M'

export type Ticker = { symbol: string; displayName: string; price: string }
export type KLine = {
  openTime: number
  openPrice: string
  highPrice: string
  lowPrice: string
  closePrice: string
  volume: string
  closeTime: number
  quoteAssetVol: string
  numberOfTrades: number
  takerBuyBaseAssetVol: string
  takerBuyQuoteAssetVol: string
}
