import { Link } from 'react-router-dom'
import img from '../assets/images/not-found.svg'
const Error = () => {
  return (
    <div className='flex justify-center items-center w-full h-lvh m-auto'>
      <div className='text-center'>
        <img src={img} alt='not found' className='w-96' />
        <h3 className='font-bold m-2'>Ohh! Page Not Found</h3>
        <p className='text-gray-600'>
          We can't seem to find the page you're looking for
        </p>
        <Link to='/' className='capitalize text-blue-300'>
          back home
        </Link>
      </div>
    </div>
  )
}
export default Error
