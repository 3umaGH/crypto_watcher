import clsx from 'clsx'
import { useState } from 'react'
import { CommonProps } from '../types/common'

type TickerImage = {
  ticker: string
} & CommonProps

const FALLBACK_ICON = 'icons/generic-cryptocurrency.svg'

export const TickerLogo = (props: TickerImage) => {
  const [src, setSrc] = useState(`https://cryptofonts.com/img/SVG/${props.ticker.toLowerCase()}.svg`)

  const handleFallbackImage = () => {
    setSrc(FALLBACK_ICON)
  }

  return <img className={clsx(props.className)} alt={props.ticker} src={src} onError={handleFallbackImage} />
}
