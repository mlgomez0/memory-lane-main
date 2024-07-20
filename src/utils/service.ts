import axios from 'axios'
import { MemoryModalType } from './types'

const apiEndpoint = 'http://localhost:4001/memories'

export const postMemory = async (memory: MemoryModalType) => {
  try {
    const formData = new FormData()

    formData.append('name', memory.name)
    formData.append('description', memory.description)
    formData.append('timestamp', memory.timestamp)

    if (memory.image) {
      formData.append('image', memory.image, memory.image.name)
    }

    console.log("FormData: ", formData)

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

export const getMemory = async (id: string): Promise<MemoryModalType> => {
  try {  
    const response = await axios.get(apiEndpoint + '/' + id)

    console.log('Response:', response.data)
    return response.data.memory
  } catch (error) {
    console.error('Error:', error)
    throw error
  }
};