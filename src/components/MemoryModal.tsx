import React, { useState } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Input,
  FormControl,
  FormHelperText
} from '@mui/material'
import { styled } from '@mui/material/styles'
import { MemoryModalType } from '../utils/types'
import { useSelector, useDispatch } from 'react-redux'
import { setOpenModal } from '../slices'
import { RootState } from '../store'
import { initMemoryType } from '../constants'
import FileUpload from './UploadButton'

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
}))

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
}))

const StyledFormHelperText = styled(FormHelperText)(({ theme }) => ({
  color: theme.palette.error.main,
}))

interface MemoryModalProps {
  memory?: MemoryModalType
  modalSubmitHandler: (memory: MemoryModalType) => void
}

const MemoryModal: React.FC<MemoryModalProps> = ({ memory, modalSubmitHandler }) => {
  const [error, setError] = useState<{ [key: string]: string | null }>({})
  const openModal = useSelector((state: RootState) => state.openModal.value)
  const dispatch = useDispatch()
  const initialData = initMemoryType

  const initialFormData = memory
    ? { ...memory }
    : initialData

  const [formData, setFormData] = useState(initialFormData)

  const handleClose = () => {
    setError({})
    dispatch(setOpenModal(false))
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, files } = event.target
    const updatedValue = type === 'file' ? (files ? validateFileFormat(files[0]) : null) : value

    setFormData(prevData => ({
      ...prevData,
      [name]: updatedValue
    }));

    setError(prevError => ({
      ...prevError,
      [name]: null
    }));
  };

  const validateFileFormat = (file: File | null) => {
    if (!file || !file.type.startsWith('image/')) {
      setError(prevError => ({ ...prevError, image: 'Error: Please upload a valid image file.' }))
      return null
    }
    setError(prevError => ({ ...prevError, image: null }))
    return file
  };

  const validateForm = () => {
    let isValid = true
    let newErrors: { [key: string]: string | null } = {}

    if (!formData.name) {
      newErrors.name = 'Title is required'
      isValid = false
    }
    if (!formData.description) {
      newErrors.description = 'Description is required'
      isValid = false
    }
    if (!formData.timestamp) {
      newErrors.timestamp = 'Date is required'
      isValid = false
    }
    if (!formData.image) {
      newErrors.image = 'Image is required'
      isValid = false
    }

    setError(newErrors)
    return isValid
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()

    if (validateForm()) {
      modalSubmitHandler(formData)
      handleClose()
      setFormData(initialData)
    }
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
              error={!!error.name}
              helperText={error.name}
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
              error={!!error.description}
              helperText={error.description}
            />
            <StyledTextField
              margin="dense"
              label="Date"
              type="date"
              fullWidth
              variant="outlined"
              name="timestamp"
              value={formData.timestamp}
              onChange={handleChange}
              error={!!error.timestamp}
              helperText={error.timestamp}
            />
            <StyledFormControl fullWidth margin="dense" error={!!error.image}>
              {/* <Input
                id="image-upload"
                type="file"
                name="image"
                onChange={handleChange}
              /> */}
              <FileUpload handleChange={handleChange}/>
              {error.image && <StyledFormHelperText>{error.image}</StyledFormHelperText>}
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
  )
}

export default MemoryModal

