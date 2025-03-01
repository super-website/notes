import { Form, useNavigate } from 'react-router-dom'
import FormInput from '../components/FormInput'
import SubmitBtn from '../components/SubmitBtn'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import {
  createTopic,
  handleChange,
  clearValues,
  uploadPdf,
} from '../features/topic/topicSlice'

const AddNew = () => {
  const { isLoading, title, short_desc, long_desc, tags, subject, pdf } =
    useSelector((store) => store.allTopics)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [isHtmlView, setIsHtmlView] = useState(true)
  const [tagInput, setTagInput] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!title || !short_desc || !long_desc || !tags.length) {
      toast.error('Please fill out all fields')
      return
    }

    try {
      await dispatch(
        createTopic({
          title,
          short_desc,
          long_desc,
          tags,
          pdf,
          subject,
        })
      ).unwrap()
      dispatch(clearValues())
      navigate('/cms/allTopics')
    } catch (error) {
      toast.error('Failed to create topic: ' + error.message)
    }
  }

  const toggleView = () => setIsHtmlView(!isHtmlView)

  const handleTopicInput = (e) => {
    const { name, value, type, files } = e.target
    if (type === 'file') {
      const file = files[0]
      dispatch(uploadPdf(file))
    } else {
      dispatch(handleChange({ name, value }))
    }
  }

  const handleAddTag = () => {
    const newTags = tagInput
      .split(',')
      .map((tag) => tag.trim())
      .filter((tag) => tag && !tags.includes(tag))

    if (newTags.length) {
      dispatch(handleChange({ name: 'tags', value: [...tags, ...newTags] }))
    }
    setTagInput('')
  }

  const handleDeleteTag = (tagToRemove) => {
    const updatedTags = tags.filter((tag) => tag !== tagToRemove)
    dispatch(handleChange({ name: 'tags', value: updatedTags }))
  }

  return (
    <div className='max-w-7xl mx-auto pb-8'>
      <div className='card bg-base-100 shadow-xl p-6'>
        <Form onSubmit={handleSubmit}>
          <h2 className='text-2xl font-bold mb-4'>Add New Topic</h2>
          <hr className='mb-6' />

          <div className='grid lg:grid-cols-3 gap-8'>
            {/* Left Column */}
            <div className='lg:col-span-2 space-y-6'>
              <FormInput
                label='Title'
                type='text'
                name='title'
                value={title}
                handleChange={handleTopicInput}
                placeholder='Enter the topic title'
              />

              {/* Long Description */}
              <div className='space-y-2'>
                <label className='block text-sm font-semibold'>
                  Long Description
                </label>
                {isHtmlView ? (
                  <textarea
                    className='p-6 w-full  mockup-code'
                    placeholder='Write your content...'
                    name='long_desc'
                    value={long_desc}
                    onChange={handleTopicInput}
                  />
                ) : (
                  <div
                    className='p-4 border border-gray-300 rounded-lg bg-gray-50 text-gray-700'
                    dangerouslySetInnerHTML={{ __html: long_desc }}
                  />
                )}
                <button
                  type='button'
                  onClick={toggleView}
                  className='btn btn-sm btn-outline btn-secondary'
                >
                  {isHtmlView ? 'Preview' : 'Edit'}
                </button>
              </div>

              {/* Tags */}
              <div className='space-y-2'>
                <label className='block text-sm font-semibold'>Tags</label>
                <div className='flex flex-wrap gap-2'>
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      className='badge badge-outline badge-secondary'
                    >
                      {tag}
                      <button
                        type='button'
                        className='ml-2 text-red-500'
                        onClick={() => handleDeleteTag(tag)}
                      >
                        &times;
                      </button>
                    </span>
                  ))}
                </div>
                <div className='flex gap-2'>
                  <input
                    type='text'
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    className='input input-bordered w-full'
                    placeholder='Add a tag'
                  />
                  <button
                    type='button'
                    onClick={handleAddTag}
                    className='btn btn-primary'
                  >
                    Add Tag
                  </button>
                </div>
              </div>

              {/* PDF Upload */}
              <FormInput
                label='Upload PDF'
                type='file'
                name='pdf'
                handleChange={handleTopicInput}
              />
              {pdf && (
                <a href={pdf} download={pdf} className='text-sm text-gray-600'>
                  File uploaded: {pdf}
                </a>
              )}
            </div>

            {/* Right Column */}
            <div className='space-y-6'>
              <FormInput
                label='Subject'
                type='text'
                name='subject'
                value={subject}
                handleChange={handleTopicInput}
                placeholder='Enter the subject'
              />
              <FormInput
                label='Short Description'
                type='text'
                name='short_desc'
                value={short_desc}
                handleChange={handleTopicInput}
                placeholder='Enter a short description'
              />
              <div className='space-y-6'>
                <SubmitBtn
                  text={isLoading ? 'Loading...' : 'Add Topic'}
                  disabled={isLoading}
                />
              </div>
            </div>
          </div>
        </Form>
      </div>
    </div>
  )
}

export default AddNew
