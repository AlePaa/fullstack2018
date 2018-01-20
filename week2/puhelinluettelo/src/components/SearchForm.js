import React from 'react'

const SearchForm = ({searchString, handleSearch}) => (
  <div>
    rajaa näytettäviä <input
      value={searchString}
      onChange={handleSearch}
    />
  </div>
)

export default SearchForm
