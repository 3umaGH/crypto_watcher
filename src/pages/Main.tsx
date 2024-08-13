import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import clsx from 'clsx'
import { useEffect, useState } from 'react'
import { Draggable } from '../components/dnd/Draggable'
import { Droppable } from '../components/dnd/Droppable'
import { Paper } from '../components/layout/Paper'
import { TickerItem } from '../components/TickerItem'
import { useTicker } from '../hooks/useTicker'
import { Ticker } from '../types/common'

export const Main = () => {
  const crypto = useTicker()
  const [displayedTickers, setDisplayedTickers] = useState<Ticker[]>([])
  const [watchedTickers, setWatchedTickers] = useState<string[]>([])

  const [activeTicker, setActiveTicker] = useState<Ticker | null>(null)
  const DRAGGING_ITEM_FILTER = (ticker: Ticker) => activeTicker?.symbol !== ticker.symbol
  const WATCHED_ITEMS_FILTER = (ticker: Ticker) => !watchedTickers.find(wTicker => wTicker === ticker.symbol)

  useEffect(() => {
    setDisplayedTickers(crypto.getTickers())
  }, [crypto])

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value

    if (value === '') {
      setDisplayedTickers(crypto.getTickers())
      return
    }

    const newTickers = crypto.find(value)
    setDisplayedTickers(newTickers)
  }

  const handleDragEnd = (e: DragEndEvent) => {
    const over = e.over?.id

    // Not over any droppable zone
    if (!over) {
      return
    }

    if (activeTicker) {
      if (over === 'watched') {
        setWatchedTickers(p => [...p, activeTicker.symbol])
      }

      if (over === 'unwatched') {
        setWatchedTickers(p => p.filter(ticker => ticker !== activeTicker.symbol))
      }
      setActiveTicker(null)
    }
  }

  const handleDragStart = (e: DragStartEvent) => {
    setActiveTicker(crypto.findBySymbol(e.active.id as string)[0])
  }

  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        delay: 0,
        tolerance: 8,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 80,
        tolerance: 8,
      },
    })
  )

  return (
    <DndContext sensors={sensors} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <DragOverlay className='z-[1000]'>
        {activeTicker ? (
          <TickerItem
            key={activeTicker.symbol}
            displayName={activeTicker.displayName}
            ticker={activeTicker.symbol}
            price={activeTicker.price}
            showChart={watchedTickers.includes(activeTicker.symbol)}
          />
        ) : null}
      </DragOverlay>

      <div className='flex justify-center items-center flex-col h-screen p-4'>
        <Paper className='w-[50svw] flex flex-col gap-4 max-h-[1000px] h-full'>
          <p className='text-3xl'>Cryptocurrencies</p>

          <div className='flex justify-between mt-4 h-full gap-4 overflow-hidden'>
            <div className='w-1/3 px-2 flex flex-col gap-2 '>
              <input
                onChange={handleSearchChange}
                className='w-full'
                type='text'
                placeholder='Enter display name / symbol'
              />

              <Droppable id='unwatched'>
                <div className={'flex flex-col overflow-y-auto gap-1 py-2 px-4'}>
                  {displayedTickers
                    .filter(DRAGGING_ITEM_FILTER)
                    .filter(WATCHED_ITEMS_FILTER)
                    .map(ticker => (
                      <Draggable key={ticker.symbol} id={ticker.symbol}>
                        <TickerItem
                          displayName={ticker.displayName}
                          ticker={ticker.symbol}
                          price={ticker.price}
                          showChart={false}
                        />
                      </Draggable>
                    ))}
                </div>
              </Droppable>
            </div>

            <div className='w-1/3 px-2'>
              <Droppable id='watched'>
                <div className={'w-full flex flex-col gap-1 overflow-y-auto py-2 px-4'}>
                  {watchedTickers.length === 0 ? <span className={clsx('text-center')}>DROP HERE</span> : ''}

                  {watchedTickers.map(symbol => {
                    const ticker = displayedTickers.find(dTicker => dTicker.symbol === symbol)

                    if (!ticker) {
                      return
                    }

                    return (
                      <Draggable key={ticker.symbol} id={ticker.symbol}>
                        <TickerItem
                          key={ticker.symbol}
                          displayName={ticker.displayName}
                          ticker={ticker.symbol}
                          price={ticker.price}
                          showChart={true}
                        />
                      </Draggable>
                    )
                  })}
                </div>
              </Droppable>
            </div>
          </div>
        </Paper>
      </div>
    </DndContext>
  )
}
