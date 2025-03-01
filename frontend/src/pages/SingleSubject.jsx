import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'
import Sidebar from '../components/Sidebar'
import ContentCard from '../components/ContentCard'

const SingleSubject = () => {
  const { id } = useParams()
  const [topics, setTopics] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios(`http://localhost:5000/api/v1/topics`)
        setTopics(response.data.products)
      } catch (error) {
        setError('Failed to fetch topics.')
        console.error('Error:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  const singleSubject = topics.filter((topic) => topic.subject === id)

  console.log(singleSubject)

  if (isLoading) {
    return <p>Loading...</p>
  }

  if (error) {
    return <p>{error}</p>
  }

  return (
    <main className='flex md:flex-row flex-col gap-10'>
      <Sidebar />
      <div>
        <h2 className='pb-5  text-customGray text-lg font-medium'>{id}</h2>
        {singleSubject.map((topic) => (
          <ContentCard key={topic._id} {...topic} />
        ))}
      </div>
    </main>
  )
}

export default SingleSubject
