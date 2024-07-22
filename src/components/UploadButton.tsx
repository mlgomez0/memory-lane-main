import React from 'react'
import { styled } from '@mui/material/styles'
import { Button, Input } from '@mui/material'

interface FileUploadProps {
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const HiddenInput = styled(Input)({
  display: 'none',
})

const CustomButton = styled(Button)({
  backgroundColor: '#007bff',
  color: 'white',
  borderRadius: '4px',
  padding: '10px 20px',
  fontSize: '16px',
  textAlign: 'center',
  cursor: 'pointer',
  transition: 'background-color 0.3s ease',
  '&:hover': {
    backgroundColor: '#0056b3',
  },
  '&:active': {
    backgroundColor: '#004085',
  },
})

const FileUpload: React.FC<FileUploadProps> = ({ handleChange }) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '20px' }}>
      <HiddenInput
        accept="image/*"
        id="image-upload"
        type="file"
        name="image"
        onChange={handleChange}
      />
      <label htmlFor="image-upload">
        <CustomButton variant="contained" component="span">
          Upload Image
        </CustomButton>
      </label>
    </div>
  )
}

export default FileUpload

