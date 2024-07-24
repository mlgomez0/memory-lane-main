import { useDispatch } from 'react-redux'
import { setMemories } from '../slices'
import { postMemory, updateMemory, deleteMemory, getMemories } from '../utils/service'
import { MemoryModalType } from '../utils/types'

export const useMemories = () => {
  const dispatch = useDispatch()

  const refreshMemories = async () => {
    const memories = await getMemories()
    dispatch(setMemories(memories))
  }

  const addMemory = async (memory: MemoryModalType) => {
    await postMemory(memory)
    await refreshMemories()
  }

  const editMemory = async (memory: MemoryModalType) => {
    await updateMemory(memory)
    await refreshMemories()
  }

  const removeMemory = async (id: string) => {
    await deleteMemory(id)
    await refreshMemories()
  }

  return { addMemory, editMemory, removeMemory, refreshMemories }
}
