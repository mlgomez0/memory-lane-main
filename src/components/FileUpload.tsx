import React, { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { styled } from '@mui/material/styles'
import { Button } from '@mui/material'

const DropzoneContainer = styled('div')({
  border: '2px dashed #007bff',
  borderRadius: '4px',
  padding: '20px',
  textAlign: 'center',
  cursor: 'pointer',
  transition: 'border-color 0.3s ease',
  '&:hover': {
    borderColor: '#0056b3',
  },
});

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
});

interface FileUploadProps {
  handleFileUpload: (file: File) => void
  uploadMessage: string
}

const FileUpload: React.FC<FileUploadProps> = ({ handleFileUpload, uploadMessage }) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      handleFileUpload(acceptedFiles[0])
    }
  }, [handleFileUpload])

  const { getRootProps, getInputProps } = useDropzone({ onDrop, accept: 'image/*' })

  return (
    <DropzoneContainer {...getRootProps()}>
      <input {...getInputProps()} />
      <p>{uploadMessage}</p>
      <CustomButton variant="contained" component="span">
        Upload Image
      </CustomButton>
    </DropzoneContainer>
  )
}

export default FileUpload
