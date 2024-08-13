import axios, { AxiosResponse } from 'axios'
import { CandlestickInterval, Ticker } from '../types/common'

const BASE_URL = 'https://api.binance.com/api/v3'

export const getTickers = (): Promise<AxiosResponse<Ticker[], unknown>> => {
  return axios.get(`${BASE_URL}/ticker/price`)
}

export const getKLines = (
  symbol: string,
  interval: CandlestickInterval,
  startTime: number,
  endTime: number
): Promise<AxiosResponse<(number | string)[][], unknown>> => {
  return axios.get(`${BASE_URL}/klines?symbol=${symbol}&interval=${interval}&startTime=${startTime}&endTime=${endTime}`)
}
