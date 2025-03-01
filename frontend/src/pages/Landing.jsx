import { useEffect } from 'react'
import axios from 'axios'
import Sidebar from '../components/Sidebar'
import Content from '../components/Content'
import Ads from '../components/Ads'
import { useGlobalContext } from '../components/Context'

const Landing = () => {
  const { searchQuery, setSearchResults } = useGlobalContext()
  const fetchData = async () => {
    try {
      const response = await axios(
        `http://localhost:5000/api/v1/topics?search=${searchQuery}`
      )
      setSearchResults(response.data.products)
    } catch (error) {
      console.error('Failed to fetch topics:', error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [searchQuery])

  return (
    <>
      <main className='flex md:flex-row flex-col gap-10'>
        <Sidebar />
        <Content />
        <Ads />
      </main>
    </>
  )
}

export default Landing
