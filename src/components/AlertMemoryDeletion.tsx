import React, {Dispatch, SetStateAction} from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'

interface AlertDialogProps {
    handleDelete: () => void
    openDeleteAlert: boolean
    setOpenDeleteAlert: Dispatch<SetStateAction<boolean>>
  }

  const AlertMemoryDeletion: React.FC<AlertDialogProps> = ({ handleDelete, openDeleteAlert, setOpenDeleteAlert }) => {
  
  const handleClose = () => {
    setOpenDeleteAlert(false)
  }

  return (
    <React.Fragment>
      <Dialog
        open={openDeleteAlert}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you going to delete this memory?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            This action will eliminate the memory from our records.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
          <Button onClick={handleDelete} autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  )
}

export default AlertMemoryDeletion