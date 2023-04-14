import { SearchProvider } from '../../components/Search/Context'
import { DnDCalendar } from '../../components/DndCalendar'
import { Main } from '../../components/styledComponents'

export const Home = () => (
  <SearchProvider>
    <Main>
      <DnDCalendar />
    </Main>
  </SearchProvider>
)
