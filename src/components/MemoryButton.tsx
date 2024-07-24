import React from 'react'
import { Button } from '@mui/material'
import styled from '@emotion/styled';
import { useDispatch } from 'react-redux'
import { setOpenModal } from '../slices'
import MemoryModal  from './MemoryModal'


const CustomButton = styled(Button)({
  backgroundColor: 'white',
  border: '1px solid #D1D5DB',
  fontFamily: 'Arial',
  height:'40px',
  fontSize: 'medium',
  color: '#4B5563',
  borderRadius: '0.375rem',
  boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
  textTransform: 'none',
  '&:hover': {
    backgroundColor: 'white',
  }
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
      <MemoryModal/>
    </div>
  )
}

export default MemoryButton
