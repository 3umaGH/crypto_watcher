import clsx from 'clsx'
import { useEffect, useState } from 'react'
import { CommonProps } from '../types/common'

type TickerImage = {
  ticker: string
} & CommonProps

const FALLBACK_ICON = 'icons/generic-cryptocurrency.svg'

export const TickerLogo = (props: TickerImage) => {
  const [src, setSrc] = useState(`https://cryptofonts.com/img/SVG/${props.ticker.toLowerCase()}.svg`)

  useEffect(() => {
    setSrc(`https://cryptofonts.com/img/SVG/${props.ticker.toLowerCase()}.svg`)
  }, [props.ticker])

  const handleFallbackImage = () => {
    setSrc(FALLBACK_ICON)
  }

  return (
    <img loading='lazy' className={clsx(props.className)} alt={props.ticker} src={src} onError={handleFallbackImage} />
  )
}
