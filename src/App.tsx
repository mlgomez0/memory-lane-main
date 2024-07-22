import './App.css'
import { useState, useEffect } from 'react'
import MemoryButton from './components/MemoryButton'
import { getMemories } from './utils/service'
import { MemoryModalType } from './utils/types'
import MemoryCarousel from './components/MemoryCarousel'

function App() {
  const [memories, setMemories] = useState<MemoryModalType[]>([])

  useEffect(() => {
    const fetchMemories = async () => {
      const fetchedMemories = await getMemories()
      setMemories(fetchedMemories)
    }

    fetchMemories()
  }, [])

  return (
    <div>
      <div className='mx-auto max-w-7xl sm:px-6 lg:px-8 mt-32'>
        <div className='flex items-center mt-4'>
          <h1 className='text-4xl font-semibold text-gray-900 mb-4 ml-4'>
            Memory lane
          </h1>
        </div>
        <div className='overflow-hidden rounded-lg bg-white shadow height 50rem'>
          <div className='px-4 py-5 sm:p-6 h-full flex flex-col'>
            <div className="flex justify-between items-center mb-4">
                <MemoryButton/>
                <MemoryButton/>
            </div>
            <MemoryCarousel memories={memories}/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App



