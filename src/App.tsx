import styled from '@emotion/styled'
import DnDResource from './components/DndCalendar'
import { SearchProvider } from './components/Search/Context'

const CalendarContainer = styled.div`
  margin: 2rem;
  height: 800px;
`

const App = () => (
  <SearchProvider>
    <CalendarContainer>
      <DnDResource />
    </CalendarContainer>
  </SearchProvider>
)

export default App
