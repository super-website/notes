import { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const Subjects = () => {
  const [searchResults, setSearchResults] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios(`http://localhost:5000/api/v1/topics`)
        console.log(response)

        setSearchResults(response.data.products)
      } catch (error) {
        console.error('Failed to fetch topics:', error)
      }
    }

    fetchData()
  }, [])

  const subjectCountMap = searchResults.reduce((acc, subject) => {
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
    <div className='max-w-2xl mx-auto'>
      <h1 className='text-lg text-customGray font-bold '>MBA Subjects</h1>
      <div className='grid grid-cols-1 md:grid-cols-2 m-5 gap-6'>
        {subjectWithCounts.map(({ title, count }) => (
          <div
            key={title}
            className='bg-[#f8f8f8]  border-gray-100 border shadow-sm  bg-opacity-40  flex flex-col  p-4 space-y-2 '
          >
            <Link to={`/subject/${title}`} className='text-xs  text-primary/80'>
              {title}
            </Link>
            <span className='text-xs text-customGray'>
              Contains ({count}) Topics
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Subjects
