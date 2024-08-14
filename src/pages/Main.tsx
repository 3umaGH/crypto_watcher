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
import { arrayMove } from '@dnd-kit/sortable'
import { useState } from 'react'
import { Draggable } from '../components/dnd/Draggable'
import { Droppable } from '../components/dnd/Droppable'
import { Sortable } from '../components/dnd/Sortable'
import { Paper } from '../components/layout/Paper'
import { TickerItem } from '../components/TickerItem/TickerItem'
import { useTicker } from '../hooks/useTicker'
import { Ticker } from '../types/common'

export const Main = () => {
  const crypto = useTicker()
  const [searchQuery, setSearchQuery] = useState<string | null>(null)
  const [activeTicker, setActiveTicker] = useState<Ticker | null>(null) // Dragged item

  // Filters out item that is currently dragged
  const DRAGGING_ITEM_FILTER = (ticker: Ticker) => activeTicker?.symbol !== ticker.symbol
  // Filters out item that is currently dragged (but used for filtering from watchedTickers which is string[])
  const DRAGGING_ITEM_FILTER_WATCHED = (wTick: string) => wTick !== activeTicker?.symbol
  // Filters out tickers that exist in watchedTickers: string[]
  const WATCHED_ITEMS_FILTER = (ticker: Ticker) =>
    !crypto.getWatchedTickers().find(wTicker => wTicker === ticker.symbol)

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value

    if (value === '') {
      setSearchQuery(null)
    }

    setSearchQuery(value)
  }

  const handleDragEnd = (e: DragEndEvent) => {
    const over = e.over?.id
    const active = e.active

    // Not over any droppable zone
    if (!over || !active) {
      return
    }

    if (activeTicker) {
      if (over === 'watched' && !crypto.getWatchedTickers().includes(activeTicker.symbol)) {
        // On dragging from unwatched => watched tickers droppable zone
        crypto.setWatchedTickers(p => [...p, activeTicker.symbol])
      } else if (over === 'unwatched') {
        // On dragging from watched => unwatched tickers droppable zone
        crypto.setWatchedTickers(p => p.filter(ticker => ticker !== activeTicker.symbol))
      } else {
        const overIndex = crypto.getWatchedTickers().findIndex(ticker => ticker === over)
        const activeIndex = crypto.getWatchedTickers().findIndex(ticker => ticker === active.id)

        if (activeIndex !== -1) {
          // On dragging watched items inside of watched droppable zone (sorting)
          crypto.setWatchedTickers(arrayMove(crypto.getWatchedTickers(), activeIndex, overIndex))
        } else {
          // On dragging from unwatched => watched tickers, but inserting item between other items

          crypto.setWatchedTickers(p => {
            const newItems = [...p]
            newItems.splice(overIndex, 0, activeTicker.symbol)
            return newItems
          })
        }
      }

      setActiveTicker(null)
      console.log(over)
    }
  }

  const handleDragStart = (e: DragStartEvent) => {
    setActiveTicker(crypto.findBySymbol(e.active.id as string)[0])
  }

  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        delay: 200,
        tolerance: 10,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 200,
        tolerance: 10,
      },
    })
  )

  return (
    <DndContext sensors={sensors} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <DragOverlay className='z-[1000]'>
        {activeTicker ? (
          <TickerItem
            className='max-w-[300px]'
            displayName={activeTicker.displayName}
            ticker={activeTicker.symbol}
            price={activeTicker.price}
            showChart={false}
          />
        ) : null}
      </DragOverlay>

      <div className='flex flex-col items-center justify-center h-screen p-2 lg:p-4'>
        <Paper className='w-full xl:w-[50svw] flex flex-col gap-4 max-h-[1000px] h-full'>
          <p className='text-xl xl:text-3xl'>Cryptocurrencies</p>

          <div className='-mt-4 xl:mt-0'>
            <Droppable id='watched'>
              <div className={'w-full flex flex-row gap-1 overflow-y-auto py-2'}>
                {crypto.getWatchedTickers().length === 0 && <span className={'text-center w-full'}>DROP HERE</span>}

                {crypto
                  .getWatchedTickers()
                  .filter(DRAGGING_ITEM_FILTER_WATCHED)
                  .map(symbol => {
                    const ticker = crypto.getTickers().find(dTicker => dTicker.symbol === symbol)

                    if (!ticker) {
                      return
                    }

                    return (
                      <Sortable key={ticker.symbol} id={ticker.symbol}>
                        <Draggable id={ticker.symbol}>
                          <TickerItem
                            className='min-w-[200px] md:min-w-[300px]'
                            displayName={ticker.displayName}
                            ticker={ticker.symbol}
                            price={ticker.price}
                            showChart={true}
                          />
                        </Draggable>
                      </Sortable>
                    )
                  })}
              </div>
            </Droppable>
          </div>

          <div className='min-h-[1px] bg-gray-200' />

          <div className='flex flex-col gap-4 overflow-hidden'>
            <div className='flex flex-col w-full h-full gap-2'>
              <input
                onChange={handleSearchChange}
                className='block w-full p-2 pt-3 text-sm text-gray-900 bg-white border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500'
                type='text'
                placeholder='Enter display name / symbol'
              />

              <Droppable id='unwatched'>
                <div className={'flex flex-row flex-wrap overflow-visible gap-1 justify-center'}>
                  {(searchQuery ? crypto.find(searchQuery) : crypto.getTickers())
                    .filter(DRAGGING_ITEM_FILTER)
                    .filter(WATCHED_ITEMS_FILTER)
                    .map(ticker => (
                      <Draggable key={ticker.symbol} id={ticker.symbol}>
                        <TickerItem
                          className='w-[250px] md:w-[300px] overflow-hidden'
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
          </div>
        </Paper>
      </div>
    </DndContext>
  )
}
