import { Form, useNavigate, useParams } from 'react-router-dom'
import FormInput from '../components/FormInput'
import SubmitBtn from '../components/SubmitBtn'
import { useDispatch, useSelector } from 'react-redux'
import {
  clearValues,
  editTopic,
  handleChange,
  setEditTopic,
} from '../features/topic/topicSlice'
import { toast } from 'react-toastify'
import { useState } from 'react'

const EditTopic = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { title, short_desc, subject, long_desc, tags, isLoading } =
    useSelector((state) => state.allTopics)

  const [isHtmlView, setIsHtmlView] = useState(false)
  const [tagInput, setTagInput] = useState('')

  const toggleView = () => setIsHtmlView((prev) => !prev)

  const handleAddTag = (tag) => {
    const trimmedTag = tag.trim()
    if (trimmedTag && !tags.includes(trimmedTag)) {
      dispatch(setEditTopic({ tags: [...tags, trimmedTag] }))
    }
    setTagInput('')
  }

  const handleDeleteTag = (tagToDelete) => {
    dispatch(setEditTopic({ tags: tags.filter((tag) => tag !== tagToDelete) }))
    toast.info('Tag removed!')
  }

  const handleTagInputChange = (e) => {
    const value = e.target.value
    setTagInput(value)
    if (value.endsWith(',')) {
      handleAddTag(value.slice(0, -1))
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleAddTag(tagInput)
    }
  }

  const handleProductInput = (e) => {
    const { name, value } = e.target
    dispatch(handleChange({ name, value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await dispatch(
        editTopic({
          topicId: id,
          topic: { title, short_desc, subject, long_desc, tags },
        })
      )
      dispatch(clearValues())
      navigate('/cms/allTopics')
    } catch (error) {
      toast.error('Failed to update topic')
    }
  }

  if (isLoading) return <div className='text-center text-lg'>Loading...</div>

  return (
    <div className='max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-xl'>
      <Form onSubmit={handleSubmit} className='space-y-6'>
        <h2 className='text-3xl font-semibold text-center'>Edit Topic</h2>
        <FormInput
          label='Title'
          type='text'
          name='title'
          required
          handleChange={handleProductInput}
          value={title}
        />
        <FormInput
          label='Short Description'
          type='text'
          name='short_desc'
          required
          handleChange={handleProductInput}
          value={short_desc || ''}
        />
        <FormInput
          label='Subject'
          type='text'
          name='subject'
          required
          handleChange={handleProductInput}
          value={subject || ''}
        />
        <div>
          <label className='block text-sm font-medium text-gray-700'>
            Long Description
          </label>
          {isHtmlView ? (
            <textarea
              className='w-full h-48 p-4 border border-gray-300 rounded-md'
              placeholder='Write your HTML here...'
              value={long_desc || ''}
              onChange={(e) =>
                dispatch(setEditTopic({ long_desc: e.target.value }))
              }
            />
          ) : (
            <div
              className='p-4 border rounded-lg bg-gray-100'
              dangerouslySetInnerHTML={{ __html: long_desc }}
            />
          )}
          <button
            type='button'
            onClick={toggleView}
            className='mt-2 text-blue-600 hover:underline'
          >
            {isHtmlView ? 'Preview' : 'Edit'}
          </button>
        </div>
        <div>
          <label className='block text-sm font-medium text-gray-700'>
            Tags
          </label>
          <div className='flex flex-wrap gap-2 mt-2'>
            {tags.map((tag) => (
              <span
                key={tag}
                className='px-3 py-1 bg-gray-200 text-sm rounded-md flex items-center gap-2'
              >
                {tag}
                <button
                  type='button'
                  className='text-red-500'
                  onClick={() => handleDeleteTag(tag)}
                >
                  &times;
                </button>
              </span>
            ))}
          </div>
          <input
            type='text'
            value={tagInput}
            onChange={handleTagInputChange}
            onKeyPress={handleKeyPress}
            className='mt-2 w-full p-2 border border-gray-300 rounded-md'
            placeholder='Add a tag (separate with commas)'
          />
        </div>
        <SubmitBtn
          text={isLoading ? 'Updating...' : 'Update Topic'}
          disabled={isLoading}
        />
      </Form>
    </div>
  )
}

export default EditTopic
