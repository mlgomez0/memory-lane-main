import './App.css'
import { useEffect } from 'react'
import MemoryButton from './components/MemoryButton'
import MemoryCarousel from './components/MemoryCarousel'
import SelectSort from './components/SortSelector'
import { useSelector } from 'react-redux'
import { RootState } from './store'
import { CubeIcon } from '@heroicons/react/20/solid'
import ShareButton from './components/ShareButton'
import { useMemories } from './hooks/useMemories'


function App() {
  const memories = useSelector((state: RootState) => state.memories.memories)
  const { refreshMemories } = useMemories()

  useEffect(() => {
    const fetchMemories = async () => {
      await refreshMemories()
    }

    fetchMemories()
  }, [])

  return (
    <div>
      <div className='mx-auto max-w-7xl sm:px-6 lg:px-8 mt-32'>
        <div className='overflow-hidden rounded-lg bg-white shadow height 50rem'>
          <div className='px-4 py-5 sm:p-6 h-full flex flex-col'>
            <div className='flex justify-between items-center'>
              <div className='flex items-center mt-4'>
                <CubeIcon className='h-16 w-16 inline-block' />
                <h1 className='text-4xl font-semibold text-gray-900 mb-4 ml-4'>
                  Mary's memory lane
                </h1>
              </div>
              <ShareButton/>
            </div>
            <div className="mt-5 mb-5 border border-gray-300 px-4 py-2 rounded-md shadow-sm min-h-[90px]">
              <p>I am lucky; I have traveled worldwide,
                met wonderful people, and tasted incredible food!
                I want to keep all those memories as part of who I am.
                This memory lane helps me remember and live those moments again.
              </p>
            </div>
            <div className="flex justify-between items-center mb-4">
                <SelectSort/>
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



