import axios from 'axios'
import { MemoryModalType } from './types'

const apiEndpoint = 'http://localhost:4001/memories'

const prepareFormData = (memory: MemoryModalType) => {

  const formData = new FormData()

  formData.append('name', memory.name)
  formData.append('description', memory.description)
  formData.append('timestamp', memory.timestamp)

  if (memory.image && memory.image instanceof File) {
    formData.append('image', memory.image, memory.image.name)
  }

  console.log("FormData: ", formData)

  return formData
}

export const postMemory = async (memory: MemoryModalType) => {
  try {
    const formData = prepareFormData(memory)

    const response = await axios.post(apiEndpoint, formData, {
      headers: {
         'Content-Type': 'multipart/form-data'
      }
    });
    console.log('Response:', response.data)
    return response.data
  } catch (error) {
    console.error('Error:', error)
    throw error
  }
};

export const updateMemory = async (memory: MemoryModalType) => {
  try {
    const formData = prepareFormData(memory)
    const putEndpoint = `${apiEndpoint}/${memory.id}`
    console.log("Memory", memory)

    const response = await axios.put(putEndpoint, formData, {
      headers: {
         'Content-Type': 'multipart/form-data'
      }
    });

    console.log('Response:', response.data)
    return response.data
  } catch (error) {
    console.error('Error:', error)
    throw error
  }
};

export const getMemory = async (id: string): Promise<MemoryModalType> => {
  try {  
    const response = await axios.get(apiEndpoint + '/' + id)

    console.log('Response:', response.data)
    return response.data.memory
  } catch (error) {
    console.error('Error:', error)
    throw error
  }
}