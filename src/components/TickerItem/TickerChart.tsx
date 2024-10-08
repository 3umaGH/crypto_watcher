import { Chart as ChartJS, TooltipItem } from 'chart.js'
import { memo, useRef } from 'react'
import { Chart } from 'react-chartjs-2'
import { CommonProps, KLine } from '../../types/common'

type TickerChart = {
  data: KLine[]
  isLoading?: boolean
} & CommonProps

const OPTIONS = {
  responsive: true,
  maintainAspectRatio: false,
  layout: {
    padding: {
      top: -50,
      bottom: -50,
      left: -50,
      right: -50,
    },
  },
  scales: {
    x: {
      ticks: {
        display: false,
      },
      grid: {
        display: false,
        color: '#1E252C',
      },
      border: {
        display: false,
      },
    },
    y: {
      ticks: {
        display: false,
      },
      grid: {
        display: true,
        color: '#2b3640',
      },
      border: {
        display: false,
      },
    },
  },
  plugins: {
    tooltip: {
      callbacks: {
        label: (context: TooltipItem<'line'>) => {
          const kline = context.raw as KLine

          const floatPrice = parseFloat(kline.closePrice)
          const priceDecimals = floatPrice > 0.1 ? 2 : floatPrice > 0.0001 ? 4 : 7

          return [
            `Price: $${floatPrice.toFixed(priceDecimals)} / Vol: ${Number(kline.volume).toFixed(1)}`,
            `Number of trades: ${Number(kline.numberOfTrades).toLocaleString()}`,
          ]
        },
        title: (context: TooltipItem<'line'>[]) => new Date(Number(context[0].label)).toLocaleString(),
      },
    },
    zoom: {
      pan: {
        enabled: false,
        mode: 'xy' as const,
      },
      zoom: {
        wheel: {
          enabled: true,
        },
        pinch: {
          enabled: true,
        },
      },
    },
  },
}

export const TickerChart = memo((props: TickerChart) => {
  const chartRef = useRef<ChartJS<'line', unknown>>(null)
  const data = {
    labels: props.data.map(kline => kline.openTime),
    datasets: [
      {
        label: '',
        data: props.data.map(kline => ({
          x: kline.closeTime,
          y: kline.closePrice,
          ...kline,
        })),
        tension: 0,
        borderColor: 'transparent',
        backgroundColor: 'transparent',
        fill: false,
        segment: {
          borderColor: function (context: { p0: { y: number }; p1: { y: number } }) {
            const { p0, p1 } = context
            return p1.y <= p0.y ? 'rgba(50,255,50,0.8)' : 'rgba(255,0,0,0.8)' // Green if increasing, red if decreasing
          },
          borderWidth: 1.5,
        },
      },
    ],
  }

  return (
    <div className='border bg-[#0E1318] h-[80px] w-full max-w-[100%] box-border rounded-md m-0 p-0 relative'>
      {props.isLoading && (
        <span className='text-white absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-30%]'>
          Loading...
        </span>
      )}

      <Chart ref={chartRef} type='line' data={data} options={OPTIONS} onClick={() => chartRef.current?.resetZoom()} />
    </div>
  )
})
