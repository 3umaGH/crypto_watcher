import axios from 'axios'
import { CandlestickInterval } from '../types/common'

const BASE_URL = 'https://api.binance.com/api/v3'

export const getTickers = () => {
  return axios.get(`${BASE_URL}/ticker/price`)
}

export const getKLines = (symbol: string, interval: CandlestickInterval, startTime: number, endTime: number) => {
  return axios.get(`${BASE_URL}/klines?symbol=${symbol}&interval=${interval}&startTime=${startTime}&endTime=${endTime}`)
}
