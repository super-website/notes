import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  deleteTopic,
  getAllTopics,
  setEditTopic,
} from '../features/topic/topicSlice'
import { Link } from 'react-router-dom'

const AllTopics = () => {
  const dispatch = useDispatch()
  const { topics } = useSelector((store) => store.allTopics)

  useEffect(() => {
    dispatch(getAllTopics())
  }, [dispatch, topics])

  const handleDelete = async (id) => {
    try {
      await dispatch(deleteTopic(id))
    } catch (error) {
      console.error('Failed to delete topic:', error)
    }
  }

  const handleEdit = (topic) => {
    const { _id, title, short_desc, long_desc, tags, pdf } = topic
    dispatch(
      setEditTopic({
        editTopicId: _id,
        title,
        short_desc,
        long_desc,
        tags,
        pdf,
      })
    )
  }

  const formattedDate = (date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(new Date(date || Date.now()))
  }

  return (
    <section
      className='transition-all duration-300 mx-auto rounded-2xl p-8 
       max-w-7xl'
    >
      <h4 className='text-sm font-semibold'>View Topics</h4>
      <hr className='mt-4' />

      <div className='mt-4 glass '>
        <div className='overflow-x-auto'>
          <table className='table table-zebra'>
            {/* head */}
            <thead>
              <tr>
                <th>Title</th>
                <th>Subject</th>
                <th>Created At</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {topics.length < 1 ? (
                <tr>
                  <td
                    colSpan='3'
                    className='text-center p-6 text-lg text-gray-500 italic'
                  >
                    No Records Found
                  </td>
                </tr>
              ) : (
                topics.map((topic) => (
                  <tr
                    key={topic._id}
                    className='hover:bg-indigo-50 transition duration-200'
                  >
                    <td className='text-xs'>{topic.title}</td>
                    <td className=' text-xs'>{topic.subject}</td>
                    <td className='text-xs'>
                      {formattedDate(topic.createdAt)}
                    </td>
                    <td>
                      <div className='flex gap-3'>
                        <Link
                          to={`/cms/edit-topic/${topic._id}`}
                          className='btn btn-outline btn-warning btn-sm'
                          onClick={() => handleEdit(topic)}
                        >
                          Edit
                        </Link>
                        <button
                          className='btn btn-outline btn-error btn-sm'
                          onClick={() => handleDelete(topic._id)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <div className='text-right p-4 text-xs'>
          Total Topics: <span>{topics.length}</span>
        </div>
      </div>
    </section>
  )
}

export default AllTopics
