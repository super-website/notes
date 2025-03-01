import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

const links = [
  { id: 1, name: 'All Topics', link: 'allTopics' },
  { id: 2, name: 'Add Topic', link: 'addnew' },
  { id: 3, name: 'Add Gallery', link: 'addgallery' },
]
const Header = () => {
  const [active, setActive] = useState(null)
  const location = useLocation()

  useEffect(() => {
    const activeLink = links.find((link) =>
      location.pathname.includes(link.link)
    )
    setActive(activeLink ? activeLink.id : null)
  }, [location])

  return (
    <div className='flex justify-center bg-primary text-black '>
      <div className='hidden lg:flex'>
        <ul className='menu menu-horizontal px-1'>
          {links.map((link) => (
            <Link
              key={link.id}
              to={link.link}
              className={`${
                active === link.id
                  ? ' text-secondary rounded-lg'
                  : 'text-gray-200 hover:text-white hover:bg-primary'
              } px-4 py-2 transition duration-300 transform hover:scale-105`}
              onClick={() => setActive(link.id)}
            >
              {link.name}
            </Link>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Header
