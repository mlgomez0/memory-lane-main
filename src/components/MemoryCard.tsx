import React, { useState } from 'react'
import { Card, CardContent, Typography, IconButton, Menu, MenuItem, Avatar, CardHeader } from '@mui/material'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import { MemoryModalType } from '../utils/types'
import MemoryModal  from './MemoryModal'
import { updateMemory } from '../utils/service'
import { useDispatch } from 'react-redux'
import { setOpenModal } from '../slices'


interface MemoryCardProps {
    memory: MemoryModalType
}

const MemoryCard: React.FC<MemoryCardProps> = ({ memory }) => {
  const dispatch = useDispatch()
	const { name, description, timestamp, image } = memory
  
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  };

  const handleClose = () => {
    setAnchorEl(null)
  };

  const formatString = (dateString: string) => {
      const date = new Date(dateString);
      const formatter = new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'long',
        day: '2-digit'
      })

      return formatter.format(date)
  }


  const handleUpdate = () => {
    dispatch(setOpenModal(true))
  };

  const handleDelete = () => {
    handleClose()
  };
    

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        avatar={<Avatar alt="Cactus" src={`data:image/jpeg;base64,${image}`} />}
        action={
          <IconButton aria-label="settings" onClick={handleClick}>
            <MoreVertIcon />
          </IconButton>
        }
        title={name}
        subheader={timestamp ? formatString(timestamp) : ""}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleUpdate}>Update</MenuItem>
        <MemoryModal modalSubmitHandler={updateMemory} memory={memory}/>
        <MenuItem onClick={handleDelete}>Delete</MenuItem>
      </Menu>
    </Card>
  );
};
export default MemoryCard