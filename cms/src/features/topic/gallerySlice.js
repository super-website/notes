import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { createGalleryThunk, uploadImageThunk } from './galleryThunk'
import { toast } from 'react-toastify'

const initialState = {
  images: [],
  isLoading: false,
  subject: '',
  error: null,
  image: '',
}

export const createGallery = createAsyncThunk(
  'gallery/createGallery',
  async (data, thunkAPI) => {
    try {
      const response = await createGalleryThunk(data, thunkAPI)
      return response.data
    } catch (error) {
      console.error('Create Gallery Error:', error)
      const errorMessage =
        error.response?.data?.msg || 'Failed to create gallery'
      return thunkAPI.rejectWithValue(errorMessage)
    }
  }
)

export const uploadImage = createAsyncThunk(
  'gallery/uploadImage',
  async (images, thunkAPI) => {
    try {
      const formData = new FormData()
      images.forEach((image) => {
        if (image) {
          formData.append('images', image)
        }
      })

      const resp = await uploadImageThunk(
        '/api/v1/gallery/uploads',
        formData,
        thunkAPI
      )

      return resp.image
    } catch (error) {
      console.error('Upload Image Error:', error)
      const errorMessage =
        error.response?.data?.msg || 'Failed to upload images'
      return thunkAPI.rejectWithValue(errorMessage)
    }
  }
)
const gallerySlice = createSlice({
  name: 'gallery',
  initialState,
  reducers: {
    handleChange: (state, { payload: { name, value } }) => {
      state[name] = value
    },
    clearError: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createGallery.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(createGallery.fulfilled, (state, { payload }) => {
        state.isLoading = false
        toast.success(payload)
        state.subject = ''
        state.images = []
      })
      .addCase(createGallery.rejected, (state, { payload }) => {
        state.isLoading = false
        state.error = payload
      })
      .addCase(uploadImage.pending, (state) => {
        state.isLoading = true
      })
      .addCase(uploadImage.fulfilled, (state, { payload }) => {
        state.isLoading = false
        if (Array.isArray(payload)) {
          state.images = [...state.images, ...payload]
        } else {
          state.images.push(payload)
        }
      })
      .addCase(uploadImage.rejected, (state, { payload }) => {
        state.isLoading = false
        state.error = payload || 'An unknown error occurred'
      })
  },
})

export const { handleChange, clearError } = gallerySlice.actions
export default gallerySlice.reducer
