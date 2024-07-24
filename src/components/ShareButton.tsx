import React from 'react'
import styled from '@emotion/styled'
import IconButton from '@mui/material/IconButton'
import ShareIcon from '@mui/icons-material/Share'
import Tooltip from '@mui/material/Tooltip'
import Snackbar from '@mui/material/Snackbar'
import MuiAlert, { AlertProps } from '@mui/material/Alert'

const CustomIconButton = styled(IconButton)({
  color: '#007bff',
  border: '1px solid #007bff',
  borderRadius: '4px',
  padding: '10px',
  '&:hover': {
    backgroundColor: 'rgba(0, 123, 255, 0.1)',
  },
})

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />
  },
)

const ShareButton = () => {
  const [open, setOpen] = React.useState(false)

  const handleClick = () => {
    const url = window.location.href
    navigator.clipboard.writeText(url).then(() => {
      setOpen(true)
    })
  }

  const handleClose = (
    _event: React.SyntheticEvent | Event,
    reason?: string,
  ) => {
    if (reason === 'clickaway') {
      return
    }
    setOpen(false)
  }

  return (
    <div>
      <Tooltip title='Copy link'>
        <CustomIconButton onClick={handleClick}>
          <ShareIcon />
        </CustomIconButton>
      </Tooltip>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity='success'>
          Link copied to clipboard!
        </Alert>
      </Snackbar>
    </div>
  )
}

export default ShareButton
