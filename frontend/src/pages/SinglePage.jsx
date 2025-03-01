import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Ads from '../components/Ads'
import Sidebar from '../components/Sidebar'

const SinglePage = () => {
  const { id } = useParams()
  const [topic, setTopic] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/v1/topics/${id}`
        )
        console.log(response.data)

        setTopic(response.data.product)
      } catch (error) {
        console.error('Failed to fetch topic:', error)
      }
    }

    fetchData()
  }, [id])

  if (!topic) return <div>Loading...</div>

  const formattedDate = new Intl.DateTimeFormat('en', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(topic.updatedAt))

  return (
    <main className='flex md:flex-row flex-col gap-10'>
      <Sidebar />
      <div className='max-w-2xl mx-auto'>
        <div className='breadcrumbs text-sm mb-3'>
          <ul>
            <li>
              <Link to='/' className='text-primary font-semibold'>
                Home
              </Link>
            </li>
            <li>
              <Link to='/subjects' className=' font-semibold text-primary'>
                {topic.subject}
              </Link>
            </li>
            <li>{topic.title}</li>
          </ul>
        </div>
        <div className='bg-bgPrimary p-4 border'>
          <p className='text-xs mb-2 text-[#31708f]'>{topic.short_desc}</p>
        </div>
        <div className='card bg-bgNavbar bg-opacity-5 max-w-xl md:max-w-2xl mb-10 shadow-xl mt-6 rounded-none p-6'>
          <h1 className='text-[22px] font-bold text-black border-b pb-3 '>
            {topic.title}
          </h1>
          <div
            className='text-customGray text-[13px] mt-3 space-y-2 border-b pb-3'
            dangerouslySetInnerHTML={{ __html: topic.long_desc }}
          />
          <div className='text-sm text-customGray mt-2 flex justify-between items-center'>
            <span>{formattedDate}</span>
            <span className='bg-primary badge text-white'>{topic.subject}</span>
          </div>
          <div>
            <a href={topic.pdf} download>
              {`${topic.title} pdf`}
            </a>
          </div>
        </div>
      </div>
      <Ads />
    </main>
  )
}

export default SinglePage
