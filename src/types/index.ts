export type Label = {
  text: string
  color: string
}

export interface CalendarEvent {
  id: number
  title: string
  start: Date
  end: Date
  allDay: boolean
  labels: Label[]
}

export interface Holiday extends CalendarEvent {
  isHoliday: boolean
}

export interface NewCalendarEvent {
  event: Holiday
  start?: Date
  end?: Date
  isAllDay?: boolean
}

export interface EventComponentProps {
  event: CalendarEvent
  title: string
}
