import { useState } from 'react'
import { addHours } from 'date-fns'
import { CalendarEvent } from '../types'

interface CreateCustomEvent {
  allDay: boolean
}

const createCustomEvent = ({ allDay }: CreateCustomEvent): CalendarEvent => {
  const now = new Date()
  const eventStart = now
  const eventEnd = addHours(now, 2)

  return {
    id: Date.now(),
    title: allDay ? 'New custom all day event' : 'New custom event',
    start: eventStart,
    end: eventEnd,
    allDay,
  }
}

// Create 2 custom Events for demo
const initEvents: CalendarEvent[] = [
  createCustomEvent({ allDay: true }),
  createCustomEvent({ allDay: false }),
]

export const useEvents = () => {
  const [events, setEvents] = useState<CalendarEvent[]>(initEvents)

  return {
    events,
    setEvents,
  }
}
