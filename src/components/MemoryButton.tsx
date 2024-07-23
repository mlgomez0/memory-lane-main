import React from 'react'
import { Button } from '@mui/material'
import { styled } from '@mui/material/styles'
import { useDispatch } from 'react-redux'
import { setOpenModal } from '../slices'
import MemoryModal  from './MemoryModal'
import { postMemory } from '../utils/service'
import { sharedStyles } from '../utils/sharedStyles'

const CustomButton = styled(Button)({
  ...sharedStyles
})

const MemoryButton: React.FC = () => {

  const dispatch = useDispatch()

  const handleClickOpen = () => {
    dispatch(setOpenModal(true))
  }
  return (
    <div>
      <CustomButton variant="contained" color="primary" onClick={ handleClickOpen }>
        + New Memory
      </CustomButton>
      <MemoryModal modalSubmitHandler={postMemory}/>
    </div>
  )
}

export default MemoryButton
