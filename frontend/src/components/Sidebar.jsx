import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const Sidebar = () => {
  const [topics, setTopics] = useState([])

  const fetchData = async () => {
    try {
      const response = await axios('http://localhost:5000/api/v1/topics')
      setTopics(response.data.products)
    } catch (error) {
      console.error('Failed to fetch topics:', error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const subjectCountMap = topics.reduce((acc, subject) => {
    const title = subject.subject

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
    <div className='hidden md:block w-52 text-white '>
      <h2 className='pb-5  text-customGray text-lg font-medium'>Subjects</h2>
      <ul className='flex flex-col'>
        {subjectWithCounts.map(({ title, count }) => (
          <Link
            to={`/subject/${title}`}
            key={title}
            className='border-b py-2  text-customGray text-sm font-medium flex justify-between items-center'
          >
            {title}
            <span className='badge badge-primary'>{count}</span>
          </Link>
        ))}
      </ul>
    </div>
  )
}

export default Sidebar
