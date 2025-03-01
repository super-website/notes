import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import {
  createTopicThunk,
  editTopicThunk,
  deleteTopicThunk,
  getAllTopicsThunk,
  uploadImageThunk,
} from './topicThunk'
import { toast } from 'react-toastify'

const initialState = {
  slug: '',
  short_desc: '',
  subject: '',
  long_desc: '',
  pdf: '',
  topics: [],
  tags: [],
  isEditing: false,
  editTopicId: '',
  isLoading: false,
  title: '',
}

export const createTopic = createAsyncThunk(
  'topic/createTopic',
  createTopicThunk
)
export const deleteTopic = createAsyncThunk(
  'topic/deleteTopic',
  deleteTopicThunk
)
export const getAllTopics = createAsyncThunk(
  'topic/getAllTopics',
  getAllTopicsThunk
)
export const editTopic = createAsyncThunk('topic/editTopic', editTopicThunk)

export const uploadPdf = createAsyncThunk(
  'topic/uploadPdf',
  async (pdf, thunkAPI) => {
    try {
      const formData = new FormData()

      formData.append('pdf', pdf)
      console.log(...formData)

      const resp = await uploadImageThunk(
        '/api/v1/topics/uploads',
        formData,
        thunkAPI
      )
      console.log(resp)

      return resp.pdf
    } catch (error) {
      console.log(error)

      const errorMessage = error.response?.data?.msg || 'Failed to upload pdf'
      return thunkAPI.rejectWithValue(errorMessage)
    }
  }
)

const topicSlice = createSlice({
  name: 'topic',
  initialState,
  reducers: {
    handleChange: (state, { payload: { name, value } }) => {
      state[name] = value
    },
    clearValues: () => {
      return { ...initialState }
    },
    setEditTopic: (state, { payload }) => {
      return { ...state, isEditing: true, ...payload }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createTopic.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createTopic.fulfilled, (state, { payload }) => {
        state.isLoading = false
        toast.success('Topic created successfully')
      })
      .addCase(createTopic.rejected, (state, { payload }) => {
        console.log(payload)

        state.isLoading = false
        toast.error('Failed to create topic')
      })
      .addCase(editTopic.pending, (state) => {
        state.isLoading = true
      })
      .addCase(editTopic.fulfilled, (state, { payload }) => {
        state.isLoading = false
        toast.success('Topic updated successfully')
      })
      .addCase(editTopic.rejected, (state, { payload }) => {
        state.isLoading = false
        toast.error('Failed to update topic')
      })
      .addCase(deleteTopic.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteTopic.fulfilled, (state, { payload }) => {
        state.isLoading = false
        toast.success('Topic deleted successfully')
      })
      .addCase(deleteTopic.rejected, (state, { payload }) => {
        state.isLoading = false
        toast.error('Failed to delete topic')
      })
      .addCase(getAllTopics.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getAllTopics.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.topics = payload.products
      })
      .addCase(getAllTopics.rejected, (state, { payload }) => {
        state.isLoading = false
        console.error('Error fetching topics:', payload)
      })
      .addCase(uploadPdf.pending, (state) => {
        state.isLoading = true
      })
      .addCase(uploadPdf.fulfilled, (state, action) => {
        state.isLoading = false
        console.log(action)

        state.pdf = action.payload.src
      })
      .addCase(uploadPdf.rejected, (state, { payload }) => {
        state.isLoading = false
        console.log(payload)
      })
  },
})

export const { handleChange, clearValues, setEditTopic } = topicSlice.actions
export default topicSlice.reducer
