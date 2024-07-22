import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { MemoryModalType } from './utils/types'
import { initMemoryType } from './constants'

interface OpenModalState {
  value: boolean
}

interface MemoryModalState {
  memoryModalData: MemoryModalType
}

const initialOpenModalState: OpenModalState = {
  value: false,
}


const initialMemoryModalState: MemoryModalState = {
  memoryModalData: initMemoryType
}

const openModalSlice = createSlice({
  name: 'openModal',
  initialState: initialOpenModalState,
  reducers: {
    setOpenModal: (state, action: PayloadAction<boolean>) => {
      state.value = action.payload
    },
  },
})

const memoryModalSlice = createSlice({
  name: 'memoryModalData',
  initialState: initialMemoryModalState,
  reducers: {
    setMemoryModalData: (state, action: PayloadAction<MemoryModalState['memoryModalData']>) => {
      state.memoryModalData = action.payload
    },
  },
})

export const { setOpenModal } = openModalSlice.actions
export const { setMemoryModalData } = memoryModalSlice.actions
export default {
  openModal: openModalSlice.reducer,
  memoryModalData: memoryModalSlice.reducer,
}