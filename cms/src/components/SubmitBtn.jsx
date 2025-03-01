import { useNavigation } from 'react-router-dom'

const SubmitBtn = ({ text }) => {
  const navigation = useNavigation()
  const isSubmitting = navigation.state === 'submitting'
  return (
    <div className='text-center form-control mt-6'>
      <button
        type='submit'
        disabled={isSubmitting}
        className='btn btn-primary w-full capitalize'
      >
        {isSubmitting ? (
          <>
            <span></span>
            sending....
          </>
        ) : (
          text || 'submit'
        )}
      </button>
    </div>
  )
}

export default SubmitBtn
