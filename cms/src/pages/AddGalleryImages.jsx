import { useDispatch, useSelector } from 'react-redux'
import {
  createGallery,
  handleChange,
  uploadImage,
} from '../features/topic/gallerySlice.js'
import { useState } from 'react'
import { Form } from 'react-router-dom'
import FormInput from '../components/FormInput.jsx'

const AddGalleryImages = () => {
  const { isLoading, images, subject } = useSelector((state) => state.gallery)
  const [localImages, setLocalImages] = useState([])
  const dispatch = useDispatch()

  const handleInputChange = (e) => {
    const { files, name, value } = e.target
    if (e.target.type === 'file' && files.length > 0) {
      const fileArray = Array.from(files)
      setLocalImages(fileArray)
    } else {
      dispatch(handleChange({ name, value }))
    }
  }

  const handleAddImage = () => {
    if (localImages.length) {
      dispatch(uploadImage(localImages))
      setLocalImages([])
    }
  }

  const handleRemoveImage = (index) => {
    dispatch(
      handleChange({
        name: 'images',
        value: images.filter((_, i) => i !== index),
      })
    )
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!subject || images.length === 0) {
      alert('Please fill out all fields')
      return
    }

    const cleanedImages = images
      .flat()
      .map((img) => (typeof img === 'string' ? img : img.src))

    dispatch(createGallery({ subject, images: cleanedImages }))
  }

  return (
    <div className='max-w-3xl mx-auto p-4 bg-white shadow-lg rounded-lg mt-8'>
      <Form onSubmit={handleSubmit} className='space-y-6'>
        <div>
          <FormInput
            name='subject'
            value={subject}
            handleChange={handleInputChange}
            label='Gallery Subject'
            className='w-full'
          />
        </div>

        <div>
          <label className='block text-sm font-medium text-gray-700'>
            Upload Images
          </label>
          <input
            type='file'
            name='image'
            onChange={handleInputChange}
            multiple
            disabled={isLoading}
            className='file-input file-input-bordered w-full mt-2'
          />
        </div>

        <div className='flex gap-4 flex-col'>
          <button
            type='button'
            onClick={handleAddImage}
            disabled={isLoading || localImages.length === 0}
            className={`btn ${
              isLoading || localImages.length === 0
                ? 'btn-disabled'
                : 'btn-primary'
            } w-full`}
          >
            Add Images
          </button>
          <button
            type='submit'
            disabled={isLoading}
            className={`btn ${
              isLoading ? 'btn-secondary' : 'btn-success'
            } w-full`}
          >
            {isLoading ? 'Submitting...' : 'Create Gallery'}
          </button>
        </div>

        {images.length > 0 && (
          <div>
            <h3 className='text-xl font-semibold text-gray-800'>Preview</h3>
            <ul className='grid grid-cols-3 gap-4 mt-4'>
              {images.map((img, index) => (
                <li key={index} className='flex justify-center relative'>
                  <img
                    src={img.src}
                    alt={`Image ${index}`}
                    className='rounded-lg w-24 h-24 object-cover'
                  />
                  <button
                    type='button'
                    onClick={() => handleRemoveImage(index)}
                    className='badge badge-primary text-white absolute right-14 -top-2'
                  >
                    X
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </Form>
    </div>
  )
}

export default AddGalleryImages
