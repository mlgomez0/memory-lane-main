import './App.css'
import { useEffect } from 'react'
import MemoryButton from './components/MemoryButton'
import { getMemories } from './utils/service'
import MemoryCarousel from './components/MemoryCarousel'
import SelectSort from './components/SortSelector'
import { useSelector, useDispatch } from 'react-redux'
import { setMemories } from './slices'
import { RootState } from './store'


function App() {
  const memories = useSelector((state: RootState) => state.memories.memories)
  const dispatch = useDispatch()

  useEffect(() => {
    const fetchMemories = async () => {
      const fetchedMemories = await getMemories()
      dispatch(setMemories(fetchedMemories))
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



