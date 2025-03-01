import { customFetch } from '../../utils'

const handleError = (error, thunkAPI, customMessage) => {
  console.error(error)
  const errorMessage =
    error.response?.data?.msg || customMessage || 'Something went wrong'
  return thunkAPI.rejectWithValue(errorMessage)
}

export const createGalleryThunk = async (gallery, thunkAPI) => {
  try {
    const resp = await customFetch.post('/api/v1/gallery', gallery)
    return resp.data
  } catch (error) {
    return handleError(error, thunkAPI, 'Failed to create gallery')
  }
}

export const uploadImageThunk = async (url, images, thunkAPI) => {
  try {
    const resp = await customFetch.post(url, images, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    return resp.data
  } catch (error) {
    return handleError(error, thunkAPI, 'Failed to upload image')
  }
}

export const getAllGalleriesThunk = async (_, thunkAPI) => {
  const url = '/api/v1/gallery'

  try {
    const resp = await customFetch(url)
    return resp.data
  } catch (error) {
    return handleError(error, thunkAPI, 'Failed to fetch galleries')
  }
}
