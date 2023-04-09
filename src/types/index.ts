export interface CalendarEvent {
  id: number
  title: string
  start: Date
  end: Date
  allDay: boolean
}

export interface Holiday extends CalendarEvent {
  isHoliday: boolean
}

export interface NewCalendarEvent {
  event: CalendarEvent | Holiday
  start?: Date
  end?: Date
  isAllDay?: boolean
}

export interface EventComponentProps {
  event: CalendarEvent
  title: string
}
