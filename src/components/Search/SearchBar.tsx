import React, { useContext } from 'react'
import { SearchContext } from './Context'

export const SearchBar = () => {
  const { searchText, handleSearchTextChange } = useContext(SearchContext)

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    handleSearchTextChange(value)
  }

  return (
    <div>
      <input type="text" value={searchText} onChange={handleInputChange} />
    </div>
  )
}
