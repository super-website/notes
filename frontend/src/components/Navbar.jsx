import { Link, useLocation } from 'react-router-dom'
import { useGlobalContext } from './Context'
import { useEffect, useState } from 'react'

const Navbar = () => {
  const { setSearchQuery, searchQuery } = useGlobalContext()
  const [inputValue, setInputValue] = useState(searchQuery)
  const location = useLocation()

  useEffect(() => {
    setInputValue(searchQuery)
  }, [searchQuery])

  const handleSearchChange = (e) => {
    setInputValue(e.target.value)
    setSearchQuery(e.target.value)
  }

  return (
    <div className='bg-bgNavbar shadow-md  z-50 sticky top-0 left-0 right-0'>
      <div className='max-w-6xl mx-auto navbar p-0'>
        {/* Start */}
        <div className='navbar-start'>
          <Link to='/'>
            <img
              src='https://notesformba.com/images/logo.png'
              alt='logo'
              width={168}
              height={30}
            />
          </Link>
        </div>

        {/* Center */}
        <div className='navbar-center'>
          <input
            aria-label='Search'
            type='text'
            placeholder='Search'
            value={inputValue}
            className='input input-sm md:w-72 rounded-full bg-white bg-opacity-10 text-white placeholder-gray-400 outline-0 transition-all duration-300 px-6'
            onChange={handleSearchChange}
          />
        </div>

        {/* End */}
        <div className='navbar-end flex space-x-10'>
          <Link
            to='/'
            className={`transition-all duration-300 badge text-sm badge-outline  border-0 rounded-full bg-white bg-opacity-10 text-white ${
              location.pathname == '/' ? 'text-blue-500' : ''
            }
            `}
          >
            Home
          </Link>
          <Link
            to='subjects'
            className={`transition-all duration-300 badge text-sm badge-outline  border-0 rounded-full bg-white bg-opacity-10 text-white ${
              location.pathname === '/subjects' ? 'text-blue-500' : ''
            }`}
          >
            MBA Subjects
          </Link>
          <Link
            to='gallery'
            className={`transition-all duration-300 badge text-sm badge-outline  border-0 rounded-full bg-white bg-opacity-10 text-white ${
              location.pathname === '/gallery' ? 'text-blue-500' : ''
            }`}
          >
            Gallery
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Navbar
