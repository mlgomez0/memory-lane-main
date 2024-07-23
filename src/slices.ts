import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { MemoryModalType } from './utils/types'

interface OpenModalState {
  value: boolean
}

interface MemoriesState {
  memories: MemoryModalType[]
}

const initialOpenModalState: OpenModalState = {
  value: false,
}



const initialMemoriesState: MemoriesState = {
  memories: []
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

const memoriesSlice = createSlice({
  name: 'memories',
  initialState: initialMemoriesState,
  reducers: {
    setMemories: (state, action: PayloadAction<MemoriesState['memories']>) => {
      state.memories = action.payload
    },
  },
})

export const { setOpenModal } = openModalSlice.actions
export const { setMemories } = memoriesSlice.actions
export default {
  openModal: openModalSlice.reducer,
  memories: memoriesSlice.reducer,
}