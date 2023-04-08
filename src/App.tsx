import styled from '@emotion/styled'
import DnDResource from './components/DndCalendar'

const CalendarContainer = styled.div`
  margin: 2rem;
  height: 700px;
`

const App = () => (
  <CalendarContainer>
    <DnDResource />
  </CalendarContainer>
)

export default App
