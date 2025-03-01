import { createContext, useState, useContext } from 'react'

const AppContext = createContext()

export const AppProvider = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [limit, setLimit] = useState(6)
  const [searchResults, setSearchResults] = useState([])

  return (
    <AppContext.Provider
      value={{
        searchQuery,
        setSearchQuery,
        searchResults,
        setSearchResults,
        limit,
        setLimit,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export const useGlobalContext = () => {
  return useContext(AppContext)
}
