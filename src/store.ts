import { configureStore } from '@reduxjs/toolkit'
import reducers from './slices'

const store = configureStore({
  reducer: {
    openModal: reducers.openModal,
    memoryModalData: reducers.memoryModalData
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store