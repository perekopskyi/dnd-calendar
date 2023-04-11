import { useContext, useMemo } from 'react'
import { SearchContext } from './Context'

interface FilterProps<T> {
  items: T[]
  searchKeys: (keyof T)[]
}

export function useFilter<T>({ items, searchKeys }: FilterProps<T>): T[] {
  const { searchText } = useContext(SearchContext)

  const filteredItems = useMemo(() => {
    if (!searchText) {
      return items
    }

    return items.filter(item =>
      searchKeys.some(key =>
        String(item[key]).toLowerCase().includes(searchText.toLowerCase())
      )
    )
  }, [items, searchKeys, searchText])

  return filteredItems
}
