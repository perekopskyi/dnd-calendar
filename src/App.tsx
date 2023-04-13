import styled from '@emotion/styled'
import DnDResource from './components/DndCalendar'
import { SearchProvider } from './components/Search/Context'

const AppContainer = styled.div`
  margin: 1rem;
`

const App = () => (
  <SearchProvider>
    <AppContainer>
      <DnDResource />
    </AppContainer>
  </SearchProvider>
)

export default App
