import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'

const HomeLayout = () => {
  return (
    <>
      <Navbar />
      <div className='max-w-6xl md:mx-auto pt-8 '>
        <Outlet />
      </div>
    </>
  )
}

export default HomeLayout
