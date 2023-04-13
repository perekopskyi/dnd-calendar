import styled from '@emotion/styled'


const DAYS_IN_WEEK = 7
export const DayContainer = styled.div<{ isHoliday: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: calc(100% / ${DAYS_IN_WEEK});
  height: 120px;
  padding: 8px;
  border: 2px solid #fff;
  background-color: ${({ isHoliday }) => (isHoliday ? '#f8f8f8' : '#ccc')};
`

export const CalendarContainer = styled.div`
  padding: 1rem;
  height: 800px;
`