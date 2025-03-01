import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FaHeart } from 'react-icons/fa'

const Gallery = () => {
  const [gallery, setGallery] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios(`http://localhost:5000/api/v1/gallery`)
        setGallery(response.data.galleries)
      } catch (error) {
        console.error('Error:', error)
      }
    }

    fetchData()
  }, [])

  return (
    <div>
      <h2 className='py-4'>Subject Notes</h2>
      {/* Gallery Grid */}
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8'>
        {gallery.map((image) => (
          <Link
            to={`/gallery/${image._id}`}
            key={image._id}
            className='rounded-lg shadow-xl bg-white overflow-hidden transform transition-all hover:scale-105 relative group'
          >
            <div className='p-4'>
              <div className='grid'>
                <img
                  src={image.images[0]}
                  alt={image.subject}
                  className='w-full h-64 object-cover rounded-md transition-transform group-hover:scale-105'
                  loading='lazy'
                />
              </div>
              <h2 className='text-lg font-semibold text-gray-800 capitalize mt-4'>
                {image.subject}
              </h2>
            </div>

            {/* Like Icon */}
            <div className='absolute inset-0 flex justify-center items-center opacity-0 group-hover:opacity-100 transition-all'>
              <button className='bg-white p-2 rounded-full shadow-lg text-pink-500 hover:bg-pink-100'>
                <span className='flex items-center gap-2'>
                  <FaHeart className='text-2xl' />
                  {image.likes}
                </span>
              </button>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Gallery
