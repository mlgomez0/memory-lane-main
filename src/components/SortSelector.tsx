import {useState} from 'react'
import { styled } from '@mui/material/styles'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import { setMemories } from '../slices'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../store'
import { MemoryModalType } from '../utils/types'


const CustomFormControl = styled(FormControl)(({ theme }) => ({
  margin: theme.spacing(1),
  minWidth: 120,
  borderRadius: theme.shape.borderRadius,
  backgroundColor: '#fff',
  boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.1)',
  '& .MuiOutlinedInput-root': {
    borderRadius: theme.shape.borderRadius,
  },
  '& .MuiInputLabel-root': {
    color: '#000',
    fontWeight: 500,
  },
}))

const CustomSelect = styled(Select)(({ theme }) => ({
  '& .MuiSelect-select': {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing(1, 2),
  },
  '& .MuiSvgIcon-root': {
    right: '10px',
  },
}))


const sortMemoriesByTimestamp = (memories: MemoryModalType[], ascending: boolean): MemoryModalType[] => {
  return [...memories].sort((a, b) => {
    const dateA = new Date(a.timestamp)
    const dateB = new Date(b.timestamp)
    return ascending ? dateA.getTime() - dateB.getTime() : dateB.getTime() - dateA.getTime()
  })
}

const SelectSort = () => {
	const [selected, setSelected] = useState('20')
	const memories = useSelector((state: RootState) => state.memories.memories)
	const dispatch = useDispatch()

  const handleChange = (event: SelectChangeEvent<string>) => {
		const value = event.target.value
    setSelected(value)
    if (value) {
      const newMemories = sortMemoriesByTimestamp(memories, value === '10')
      dispatch(setMemories(newMemories))
    }
  }

  return (
    <CustomFormControl size="small">
        <CustomSelect
        labelId="demo-select-small-label"
        id="demo-select-small"
        value={selected}
        onChange={handleChange}
      >
        <MenuItem value='10'>Older to new</MenuItem>
        <MenuItem value='20'>New to older</MenuItem>
      </CustomSelect>
    </CustomFormControl>
  )
}

export default SelectSort

