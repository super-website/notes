import axios from 'axios'
import { logoutUser } from '../features/user/userSlice'

const authUrl = 'http://localhost:5000'

export const customFetch = axios.create({
  baseURL: authUrl,
})

export const checkForUnauthorizedResponse = (error, thunkAPI) => {
  if (error?.response?.status === 401) {
    thunkAPI.dispatch(logoutUser())
  }
  return thunkAPI.rejectWithValue(
    error?.response?.data?.msg || 'Something went wrong'
  )
}
