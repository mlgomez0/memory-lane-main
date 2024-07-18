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

const MemoryModal: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    timestamp: '',
    image: null
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, files } = event.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: type === 'file' ? files ? files[0] : null : value
    }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log(formData); // Handle form submission
    handleClose();
  };

  return (
    <div>
      <CustomButton variant="contained" color="primary" onClick={handleClickOpen}>
        + New Memory
      </CustomButton>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create Memory</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <StyledTextField
              autoFocus
              margin="dense"
              label="Title"
              type="text"
              fullWidth
              variant="outlined"
              name="title"
              value={formData.title}
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
                Submit
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MemoryModal;

