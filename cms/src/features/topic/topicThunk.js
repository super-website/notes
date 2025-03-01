import { customFetch } from '../../utils'
import { clearValues } from './topicSlice'

export const createTopicThunk = async (topic, thunkAPI) => {
  try {
    const resp = await customFetch.post('/api/v1/topics', topic)
    thunkAPI.dispatch(clearValues())
    return resp.data.msg
  } catch (error) {
    console.error('Error creating topic:', error)
    return thunkAPI.rejectWithValue('Failed to create topic')
  }
}

export const uploadImageThunk = async (url, notesPDF, thunkAPI) => {
  try {
    const resp = await customFetch.post(url, notesPDF, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    return resp.data
  } catch (error) {
    const errorMessage = error.response?.data?.msg || 'Failed to upload pdf'
    return thunkAPI.rejectWithValue(errorMessage)
  }
}

export const getAllTopicsThunk = async (_, thunkAPI) => {
  const url = '/api/v1/topics'

  try {
    const resp = await customFetch(url)
    return resp.data
  } catch (error) {
    console.error('Error fetching topics:', error)
    return thunkAPI.rejectWithValue('Failed to fetch topics')
  }
}

export const deleteTopicThunk = async (topicId, thunkAPI) => {
  try {
    const resp = await customFetch.delete(`/api/v1/topics/${topicId}`)
    console.log('Deleted topic:', resp.data)
    return resp.data.msg
  } catch (error) {
    console.error('Error deleting topic:', error)
    return thunkAPI.rejectWithValue('Failed to delete topic')
  }
}

export const editTopicThunk = async ({ topicId, topic }, thunkAPI) => {
  try {
    const resp = await customFetch.patch(`/api/v1/topics/${topicId}`, topic, {
      headers: {
        Accept: 'application/json',
      },
    })
    console.log(resp.data.product)

    return resp.data
  } catch (error) {
    console.error('Error editing topic:', error)
    return thunkAPI.rejectWithValue('Failed to edit topic')
  }
}
