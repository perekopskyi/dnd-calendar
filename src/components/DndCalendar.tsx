import { useMemo, useCallback } from 'react'
import { Calendar, SlotInfo, Views, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop'
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css'
import 'react-big-calendar/lib/css/react-big-calendar.css'

import { useEvents } from './useEvents'
import { CalendarEvent, NewCalendarEvent } from '../types'
import { DayContainer } from './styledComponents'
import { Event } from './Event'
import { SearchBar } from './Search/SearchBar'
import { useFilter } from './Search/useFilter'

const DragAndDropCalendar = withDragAndDrop(Calendar)

export default function DnDCalendar() {
  const { events, setEvents, isLoading } = useEvents()
  const filteredEvents = useFilter({ items: events, searchKeys: ['title'] })
  const localizer = momentLocalizer(moment)

  const moveEvent = useCallback(
    ({
      event,
      start,
      end,
      isAllDay: droppedOnAllDaySlot = false,
    }: NewCalendarEvent): void => {
      if (event.isHoliday) return

      const { allDay } = event
      if (!allDay && droppedOnAllDaySlot) {
        event.allDay = true
      } else if (allDay && !droppedOnAllDaySlot) {
        event.allDay = false
      }

      setEvents((prev: CalendarEvent[]) => {
        const existing = prev.find(ev => ev.id === event.id) ?? {}
        const filtered = prev.filter(ev => ev.id !== event.id)
        return [
          ...filtered,
          { ...existing, start, end, allDay: event.allDay },
        ] as CalendarEvent[]
      })
    },
    [setEvents]
  ) as any

  const resizeEvent = useCallback(
    ({ event, start, end }: any) => {
      setEvents((prev: CalendarEvent[]): any => {
        const existing = prev.find(ev => ev.id === event.id) ?? {}
        const filtered = prev.filter(ev => ev.id !== event.id)
        return [...filtered, { ...existing, start, end }]
      })
    },
    [setEvents]
  )

  const handleSelectSlot = ({ start, end }: SlotInfo) => {
    const title = window.prompt('Enter the event title:')
    if (title) {
      const newEvent: CalendarEvent = {
        id: new Date().valueOf(),
        start,
        end,
        title,
        allDay: false,
      }
      setEvents([...events, newEvent])
    }
  }

  const defaultDate = useMemo(() => new Date(2023, 3, 8), [])

  const components = useMemo(
    () => ({
      event: Event as any, // used by each view (Month, Day, Week)
      dateCellWrapper: DayContainer as any,
      month: {
        event: (eventProps: any) => <p>{eventProps.title}</p>,
      },
    }),
    []
  )

  if (isLoading) {
    return <p>Loading...</p>
  }

  return (
    <>
      <SearchBar />
      <DragAndDropCalendar
        {...{ components, defaultDate, events: filteredEvents, localizer }}
        defaultView={Views.MONTH}
        onEventDrop={moveEvent}
        onEventResize={resizeEvent}
        showMultiDayTimes={true}
        step={15}
        popup
        resizable
        selectable
        onSelectSlot={handleSelectSlot}
        views={['month', 'week', 'day']}
      />
    </>
  )
}
