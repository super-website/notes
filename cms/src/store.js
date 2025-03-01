import { configureStore } from '@reduxjs/toolkit'
import userReducer from './features/user/userSlice'
import topicSlice from './features/topic/topicSlice'
import gallerySlice from './features/topic/gallerySlice'

export const store = configureStore({
  reducer: {
    userState: userReducer,
    allTopics: topicSlice,
    gallery: gallerySlice,
  },
})
