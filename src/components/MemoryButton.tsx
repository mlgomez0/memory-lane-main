import React from 'react';
import { Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useDispatch } from 'react-redux';
import { setOpenModal } from '../slices';

const CustomButton = styled(Button)({
  backgroundColor: 'white',
  border: '1px solid #D1D5DB',
  color: '#4B5563',
  padding: '8px 16px',
  borderRadius: '0.375rem',
  boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
  textTransform: 'none',
  '&:hover': {
    backgroundColor: '#F9FAFB',
  }
});



const MemoryButton: React.FC = () => {

  const dispatch = useDispatch();

  const handleClickOpen = () => {
    dispatch(setOpenModal(true))
  };
  return (
    <div>
      <CustomButton variant="contained" color="primary" onClick={ handleClickOpen }>
        + New Memory
      </CustomButton>
    </div>
  );
};

export default MemoryButton;
