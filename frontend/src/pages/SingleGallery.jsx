import axios from 'axios'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { FaDownload, FaHeart, FaTimes } from 'react-icons/fa'

const SingleGallery = () => {
  const { id } = useParams()
  const [gallery, setGallery] = useState({})
  const [likes, setLikes] = useState(0)
  const [selectedImage, setSelectedImage] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/v1/gallery/${id}`
        )
        setGallery(response.data.gallery)
        setLikes(response.data.gallery.likes || 0)
      } catch (error) {
        console.error('Error:', error)
      }
    }

    fetchData()
  }, [id])

  const handleLike = async (galleryId) => {
    try {
      await axios.post(`http://localhost:5000/api/v1/gallery/${galleryId}/like`)
      setLikes((prev) => prev + 1)
    } catch (error) {
      console.error('Error:', error)
    }
  }

  return (
    <div className='max-w-4xl mx-auto p-4'>
      <div className='flex items-center justify-between mb-4'>
        <h1 className='text-xl font-bold'>{gallery.subject}</h1>
        <button
          onClick={() => handleLike(id)}
          className='flex items-center gap-2 text-pink-600'
        >
          <FaHeart className='text-lg' /> {likes}
        </button>
      </div>

      {selectedImage && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-10'>
          <div className='relative'>
            <img
              src={selectedImage}
              alt='Selected'
              className='w-auto h-[80vh] object-contain rounded-lg'
            />
            <button
              className='absolute top-4 right-4 text-white bg-gray-800 rounded-full p-2 hover:bg-gray-700'
              onClick={() => setSelectedImage(null)}
            >
              <FaTimes className='text-xl' />
            </button>
            <button
              className='absolute bottom-4 right-4 text-white bg-gray-800 rounded-full p-2 hover:bg-gray-700'
              onClick={() => {
                fetch(selectedImage)
                  .then((response) => response.blob())
                  .then((blob) => {
                    const link = document.createElement('a')
                    link.href = URL.createObjectURL(blob)
                    link.setAttribute('download', `image-${id}.jpg`)
                    document.body.appendChild(link)
                    link.click()
                    document.body.removeChild(link)
                  })
                  .catch((error) => console.error('Download error:', error))
              }}
            >
              <FaDownload className='text-xl' />
            </button>
          </div>
        </div>
      )}

      <div className='grid grid-cols-3 gap-1'>
        {gallery.images?.map((image, index) => (
          <div
            key={index}
            className='relative cursor-pointer'
            onClick={() => setSelectedImage(image)}
          >
            <img
              src={image}
              alt={`Gallery image ${index + 1}`}
              className='w-full h-40 object-cover'
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default SingleGallery
