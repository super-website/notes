// import { useState } from 'react'
// import { FaEye, FaPencilAlt } from 'react-icons/fa'

// const QuillEditor = ({ onChange }) => {
//   const [isHtmlView, setIsHtmlView] = useState(true)

//   const handleChange = (e) => {
//     onChange(e.target.value)
//   }

//   const toggleView = () => {
//     setIsHtmlView(!isHtmlView)
//   }

//   return (
//     <div className='w-full mb-6  '>
//       <h2 className='text-sm mb-4 text-gray-800 '>Long Description</h2>
//       {isHtmlView ? (
//         <textarea
//           className='w-full h-48 p-4 border mockup-code '
//           name='long_desc'
//           onChange={handleChange}
//           placeholder='Write your HTML here...'
//         />
//       ) : (
//         <div
//           className='p-4 border rounded-lg bg-gray-50'
//           dangerouslySetInnerHTML={{ __html: value }}
//         />
//       )}
//       <div className='flex justify-between items-center mt-4'>
//         <button
//           type='button'
//           onClick={toggleView}
//           className='btn btn-secondary'
//         >
//           {isHtmlView ? <FaEye /> : <FaPencilAlt />}
//           {isHtmlView ? ' Preview' : ' Edit'}
//         </button>
//       </div>
//     </div>
//   )
// }

// export default QuillEditor
