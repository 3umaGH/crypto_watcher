import { KLineAPIResponse } from '../types/api'
import { KLine } from '../types/common'

export const mapKlineResponse = (resp: KLineAPIResponse): KLine[] => {
  return resp.map(
    kline =>
      ({
        openTime: kline[0],
        openPrice: kline[1],
        highPrice: kline[2],
        lowPrice: kline[3],
        closePrice: kline[4],
        volume: kline[5],
        closeTime: kline[6],
        quoteAssetVol: kline[7],
        numberOfTrades: kline[8],
        takerBuyBaseAssetVol: kline[9],
        takerBuyQuoteAssetVol: kline[10],
      }) as KLine
  )
}
