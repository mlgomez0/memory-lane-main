import React, { useState } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  FormHelperText
} from '@mui/material'
import { styled } from '@mui/material/styles'
import { MemoryModalType } from '../utils/types'
import { useSelector, useDispatch } from 'react-redux'
import { setOpenModal } from '../slices'
import { RootState } from '../store'
import { initMemoryType } from '../constants'
import FileUpload from './FileUpload'
import { useMemories } from '../hooks/useMemories'


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

const StyledFormHelperText = styled(FormHelperText)(({ theme }) => ({
  color: theme.palette.error.main,
}))

interface MemoryModalProps {
  memory?: MemoryModalType
}

const generateFileMessage = (filename:string) => {
  return `File ${filename} uploaded!`
}

const MemoryModal: React.FC<MemoryModalProps> = ({ memory }) => {
  const uploadFileIntruction = "Drag & drop an image here, or click to select one"
  const fileUploadButtonMessage = memory ? "Update Image": "Upload Image"
  const [uploadMessage, setUploadMessage] = useState(memory?.imagename ? generateFileMessage(memory.imagename) : uploadFileIntruction)
  const [error, setError] = useState<{ [key: string]: string | null }>({})
  const { addMemory, editMemory } = useMemories()
  const openModal = useSelector((state: RootState) => state.openModal.value)
  const dispatch = useDispatch()
  const initialData = initMemoryType

  const initialFormData = memory
    ? { ...memory }
    : initialData

  const [formData, setFormData] = useState(initialFormData)

  const handleClose = () => {
    if (!memory) {
      setUploadMessage(uploadFileIntruction)
      setFormData(initialFormData)
    }
    setError({})
    dispatch(setOpenModal(false))
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
  
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }))

    setError(prevError => ({
      ...prevError,
      [name]: null
    }))
  }

  const handleFileUpload = (uploadedFile: File) => {
    const updatedValue = validateFileFormat(uploadedFile)
    const message = updatedValue ? generateFileMessage(updatedValue?.name) : uploadFileIntruction
    setUploadMessage(message)
    setFormData(prevData => ({
      ...prevData,
      ['image']: updatedValue
    }))
  }

  const validateFileFormat = (file: File | null) => {
    if (!file || !file.type.startsWith('image/')) {
      setError(prevError => ({ ...prevError, image: 'Error: Please upload a valid image file.' }))
      return null
    }
    setError(prevError => ({ ...prevError, image: null }))
    return file
  }

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
  }

  const handleAddMemory = async (memory: MemoryModalType) => {
    await addMemory(memory)
  }

  const handleEditMemory = async (memory: MemoryModalType) => {
    await editMemory(memory)
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()

    if (validateForm()) {
      if (memory) {
        handleEditMemory(formData)
      } else {
        handleAddMemory(formData)
      }
      handleClose()
      setFormData(initialData)
    }
  }

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
            <FileUpload
              handleFileUpload={handleFileUpload}
              uploadMessage={uploadMessage}
              buttonMessage={fileUploadButtonMessage}/>
            {error.image && <StyledFormHelperText>{error.image}</StyledFormHelperText>}
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

