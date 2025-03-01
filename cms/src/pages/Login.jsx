import { Form, redirect, useActionData } from 'react-router-dom'
import FormInput from '../components/FormInput'
import SubmitBtn from '../components/SubmitBtn'
import { customFetch } from '../utils'
import { loginUser } from '../features/user/userSlice'

export const action =
  (store) =>
  async ({ request }) => {
    const formData = await request.formData()
    const data = Object.fromEntries(formData)

    try {
      const response = await customFetch.post('/api/v1/auth/login', data)
      store.dispatch(loginUser(response.data))
      return redirect('/cms/')
    } catch (error) {
      const errorMessage =
        error?.response?.data?.error?.message ||
        'Please double-check your credentials'
      return { errorMessage }
    }
  }

const Login = () => {
  const actionData = useActionData()

  const errorMessage = actionData?.errorMessage

  return (
    <section className='flex min-h-screen justify-center items-center'>
      <div className='card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl'>
        <Form method='POST' className='card-body'>
          <h4 className='text-center py-5 text-3xl'>Login</h4>

          {errorMessage && (
            <div className='alert alert-error text-black mb-4'>
              {errorMessage}
            </div>
          )}

          <FormInput type='email' label='Email' name='email' />
          <FormInput type='password' label='Password' name='password' />
          <div>
            <SubmitBtn text='Login' />
          </div>
        </Form>
      </div>
    </section>
  )
}

export default Login
