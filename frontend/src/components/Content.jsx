import ContentCard from './ContentCard'
import { useGlobalContext } from './Context'

const Content = () => {
  const { searchResults: topics } = useGlobalContext()

  return (
    <main className='flex flex-col max-w-3xl mx-auto'>
      <h2 className='text-xl font-medium  text-customGray mb-6 text'>
        MBA / Management Sciences / Business Study Notes
      </h2>
      {topics.length === 0 ? (
        <h2 className='text-lg text-center text-gray-600'>
          Nothing Found According to your search
        </h2>
      ) : (
        <div>
          {topics.map((topic) => (
            <ContentCard key={topic._id} {...topic} />
          ))}
        </div>
      )}
    </main>
  )
}

export default Content
