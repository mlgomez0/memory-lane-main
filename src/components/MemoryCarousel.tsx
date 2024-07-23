import { useState } from 'react'
import MemoryCard from './MemoryCard'
import { MemoryModalType } from '../utils/types'
import { ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/20/solid'


const MemoryCarousel = ({ memories }: { memories: MemoryModalType[] }) => {
	const [currentIndex, setCurrentIndex] = useState(0)

	const nextMemories = () => {
		setCurrentIndex((prevIndex) => 
			prevIndex + 3 < memories.length ? prevIndex + 1 : prevIndex
		)
	}
	
	const prevMemories = () => {
		setCurrentIndex((prevIndex) => prevIndex > 0 ? prevIndex - 1 : prevIndex)
	}
	
	const visibleMemories = memories.slice(currentIndex, currentIndex + 3)

	return (
		<div>
			<div className='flex-grow flex flex-col items-center justify-center'>
				{visibleMemories.map((memory) => (
					<div key={memory.id} className="mb-4">
						<MemoryCard memory={memory} />
					</div>
				))}
			</div>
			<div className='flex justify-center items-center mt-4 space-x-4'>
				<button 
					onClick={prevMemories} 
					className="bg-white rounded-full p-2 shadow-md"
					disabled={currentIndex === 0}
				>
					<ChevronUpIcon className="h-6 w-6 text-gray-600" />
				</button>
				<button 
					onClick={nextMemories} 
					className="bg-white rounded-full p-2 shadow-md"
					disabled={currentIndex + 3 >= memories.length}
				>
					<ChevronDownIcon className="h-6 w-6 text-gray-600" />
				</button>
			</div>
		</div>
	)
}
  
export default MemoryCarousel