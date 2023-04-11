import { useEffect, useState } from 'react'
import { addHours } from 'date-fns'
import { CalendarEvent, Holiday } from '../types'
import { fetchPublicHolidays } from '../api/getHollidays'
import { UA_CODE } from '../utils/constants'

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
    labels: [],
  }
}

// Create 2 custom Events for demo
const initEvents: CalendarEvent[] = [
  createCustomEvent({ allDay: true }),
  createCustomEvent({ allDay: false }),
]

export const useEvents = () => {
  const [events, setEvents] = useState<(Holiday | CalendarEvent)[]>(initEvents)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  useEffect(() => {
    setIsLoading(true)
    async function fetchData() {
      const holidays = await fetchPublicHolidays({
        year: 2023,
        countryCode: UA_CODE.countryCode,
      })

      const holidaysCalendarEvents = holidays.map(holiday => ({
        id: Math.random(),
        title: holiday.name,
        start: new Date(holiday.date),
        end: new Date(holiday.date),
        allDay: true,
        isHoliday: true,
        labels: [],
      }))

      setEvents([...events, ...holidaysCalendarEvents])
      setIsLoading(false)
    }
    fetchData()
  }, [])

  return {
    events,
    setEvents,
    isLoading,
  }
}
