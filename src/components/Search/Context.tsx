import { ReactNode, createContext, useState } from 'react'

interface SearchContextData {
  searchText: string
  handleSearchTextChange: (text: string) => void
}

interface SearchProviderProps {
  children: ReactNode
}

// create the search context
export const SearchContext = createContext<SearchContextData>({
  searchText: '',
  handleSearchTextChange: () => {},
})

// create a provider component that will hold the search state and provide it to its children
export const SearchProvider = ({ children }: SearchProviderProps) => {
  const [searchText, setSearchText] = useState('')

  const handleSearchTextChange = (text: string) => {
    setSearchText(text)
  }

  // value of the context is an object that holds the search state and the function to update it
  const value: SearchContextData = {
    searchText,
    handleSearchTextChange,
  }

  // provide the value to its children
  return (
    <SearchContext.Provider value={value}>{children}</SearchContext.Provider>
  )
}
