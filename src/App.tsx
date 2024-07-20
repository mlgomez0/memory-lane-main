// import { CubeIcon } from '@heroicons/react/20/solid'
import './App.css'
import MemoryModal  from './components/MemoryModal'
import MemoryButton from './components/MemoryButton'
import { postMemory } from './utils/service'


function App() {
  return (
    <div>
      <div className='mx-auto max-w-7xl sm:px-6 lg:px-8 mt-32'>
        <div className='overflow-hidden rounded-lg bg-white shadow h-96'>
          <div className='px-4 py-5 sm:p-6'>
            <div className="flex justify-between items-center mb-4">
              <div>
                <MemoryButton/>
                <MemoryModal modalSubmitHandler={postMemory}/>
              </div>
              <div>
                <MemoryButton/>
                <MemoryModal modalSubmitHandler={postMemory}/>
              </div>
            </div>
            <div className='flex items-center'>
              {/* <CubeIcon className='h-16 w-16 inline-block' /> */}
              <h1 className='text-4xl font-semibold text-gray-900 mb-4 ml-4 mt-4'>
                Memory lane
              </h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default App
