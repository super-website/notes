import { useEffect } from 'react'
import { FaClipboardList } from 'react-icons/fa'
import { useOutletContext } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getAllTopics } from '../features/topic/topicSlice'

const Analytics = () => {
  const dispatch = useDispatch()
  const { topics = [] } = useSelector((store) => store.allTopics)
  const { isSidebarVisible } = useOutletContext()

  useEffect(() => {
    dispatch(getAllTopics())
  }, [dispatch])

  const subjectCountMap = topics.reduce((acc, topic) => {
    const title = topic.subject
    if (!acc[title]) {
      acc[title] = { count: 1 }
    } else {
      acc[title].count += 1
    }
    return acc
  }, {})

  const subjectWithCounts = Object.entries(subjectCountMap).map(
    ([title, { count }]) => ({
      title,
      count,
    })
  )
  return (
    <div
      className={`transition-all duration-300 ${
        isSidebarVisible ? 'max-w-5xl' : 'mx-auto max-w-7xl'
      } mx-auto shadow-2xl p-8`}
    >
      <h2 className='text-xl text-center mb-6'>Analytics Overview</h2>
      <hr className='border-2 border-indigo-700 rounded-full mb-10' />

      <div className='stats shadow-xl mb-12 bg-white rounded-xl p-4 transition duration-300 ease-in-out transform hover:scale-105'>
        <div className='stat'>
          <div className='text-primary'>
            <FaClipboardList className='text-6xl text-indigo-600' />
          </div>
          <div className='stat-title text-lg font-medium text-indigo-600'>
            Total Topics
          </div>
          <div className='stat-value text-5xl font-bold text-indigo-900'>
            {topics.length}
          </div>
          <div className='stat-desc text-gray-500'>
            Number of topics you’ve published
          </div>
        </div>
      </div>

      <div>
        <h3 className='text-3xl font-semibold text-indigo-900 mb-6'>
          Subjects
        </h3>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 stats'>
          {subjectWithCounts.map(({ title, count }) => (
            <div
              key={title}
              className='card bg-white shadow-xl p-6 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 hover:bg-indigo-50 border border-indigo-100 stat'
            >
              <h4 className='text-2xl font-semibold text-indigo-700 mb-2 stat-title'>
                {title}
              </h4>
              <p className='text-lg text-center stat-value'>
                Contains {count} topic{count > 1 ? 's' : ''}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Analytics
