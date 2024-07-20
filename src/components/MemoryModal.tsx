import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  InputLabel,
  Input,
  FormControl
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { MemoryModalType } from '../utils/types';
import { useSelector, useDispatch } from 'react-redux';
import { setOpenModal } from '../slices';
import { RootState } from '../store';

const StyledTextField = styled(TextField)(({ theme }) => ({
  margin: theme.spacing(2, 0),
  '& .MuiInputLabel-root': {
    top: '-6px',
    left: '14px',
    fontSize: '0.75rem',
  },
  '& .MuiInputBase-root': {
    padding: '10px 14px',
  },
  '& .MuiOutlinedInput-root': {
    padding: '10px 14px',
  }
}));

const StyledFormControl = styled(FormControl)(({ theme }) => ({
  margin: theme.spacing(2, 0),
  '& .MuiInputLabel-root': {
    fontSize: '0.875rem',
    color: theme.palette.text.primary,
  },
  '& .MuiInput-root': {
    padding: theme.spacing(1),
    borderRadius: theme.shape.borderRadius,
    border: `1px solid ${theme.palette.grey[300]}`,
    backgroundColor: theme.palette.background.paper,
  },
}));

interface MemoryModalProps {
  memory?: MemoryModalType;
  modalSubmitHandler: (memory: MemoryModalType) => void
}

const MemoryModal: React.FC<MemoryModalProps> = ({ memory, modalSubmitHandler }) => {
  const openModal = useSelector((state: RootState) => state.openModal.value);
  const dispatch = useDispatch();

  const initialFormData = memory
    ? { ...memory }
    : {
        name: '',
        description: '',
        timestamp: '',
        image: null
      };

  const [formData, setFormData] = useState(initialFormData);

  
  const handleClose = () => {
    dispatch(setOpenModal(false));
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, files } = event.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: type === 'file' ? (files ? files[0] : null) : value
    }));
  };

  
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    modalSubmitHandler(formData);
    handleClose();
  };

  return (
    <div>
      <Dialog open={openModal} onClose={handleClose}>
        <DialogTitle>{memory ? 'Update Memory' : 'Create Memory'}</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <StyledTextField
              autoFocus
              margin="dense"
              label="Title"
              type="text"
              fullWidth
              variant="outlined"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
            <StyledTextField
              margin="dense"
              label="Description"
              type="text"
              fullWidth
              multiline
              rows={4}
              variant="outlined"
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
            <StyledTextField
              margin="dense"
              label="Date"
              type="datetime-local"
              fullWidth
              variant="outlined"
              name="timestamp"
              value={formData.timestamp}
              onChange={handleChange}
            />
            <StyledFormControl fullWidth margin="dense">
              <InputLabel htmlFor="image-upload">Image</InputLabel>
              <Input
                id="image-upload"
                type="file"
                name="image"
                onChange={handleChange}
              />
            </StyledFormControl>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Cancel
              </Button>
              <Button type="submit" color="primary">
                {memory ? 'Update' : 'Submit'}
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MemoryModal;


