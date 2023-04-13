import styled from '@emotion/styled'
import { SearchProvider } from '../../components/Search/Context'
import { DnDCalendar } from '../../components/DndCalendar'

const AppContainer = styled.div`
  margin: 1rem;
`

export const Home = () => (
  <SearchProvider>
    <AppContainer>
      <DnDCalendar />
    </AppContainer>
  </SearchProvider>
)
