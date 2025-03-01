import { Link } from 'react-router-dom'
import { useGlobalContext } from './Context' // Import the context

const ContentCard = ({
  title,
  short_desc,
  tags,
  slug,
  _id,
  subject,
  createdAt,
}) => {
  const { setSearchQuery } = useGlobalContext()

  const handleTagClick = (tag) => {
    setSearchQuery(tag)
  }

  const formattedDate = new Intl.DateTimeFormat('en', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(createdAt || 'Jan 12 2022'))

  return (
    <div className='card bg-bgNavbar bg-opacity-5 max-w-xl md:max-w-2xl mb-10 shadow-lg rounded-none'>
      <div className='card-body p-6'>
        <Link
          to={`/singlePage/${_id}`}
          className='card-title text-black text-[16px] border-b pb-2'
        >
          {title}
        </Link>
        <p className='text-sm border-b pb-3 leading-relaxed  text-customGray '>
          {short_desc}
        </p>

        <div className='flex justify-between pb-2 border-b'>
          <span className='text-sm text-customGray'>
            {new Date().getFullYear()}
          </span>
          <span className='badge-primary text-white badge cursor-pointer'>
            {subject}
          </span>
        </div>
        <div className='card-actions '>
          {tags.map((tag) => (
            <span
              className='badge badge-outline cursor-pointer text-primary border-primary hover:bg-primary hover:text-white transition-colors duration-200'
              key={tag}
              onClick={() => handleTagClick(tag)}
            >
              {tag}
            </span>
          ))}
        </div>
        {formattedDate}
      </div>
    </div>
  )
}

export default ContentCard
