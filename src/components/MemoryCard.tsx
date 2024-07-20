import React, { useState, useEffect } from 'react'
import { Card, CardContent, Typography, IconButton, Menu, MenuItem, Avatar, CardHeader } from '@mui/material'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import { MemoryModalType } from '../utils/types'

const bufferToBase64 = (buffer:any) => {
  let binary = ''
  const bytes = new Uint8Array(buffer)
  const len = bytes.byteLength
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i])
  }
  return window.btoa(binary)
};

interface MemoryCardProps {
    memory: MemoryModalType
}

const MemoryCard: React.FC<MemoryCardProps> = ({ memory }) => {
	const { name, description, timestamp, image, imagename } = memory
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [imageSrc, setImageSrc] = useState<string>('');

  useEffect(() => {
    if (image && image.type == 'Buffer') {
      const base64String = bufferToBase64(image);
      setImageSrc(`data:image/jpeg;base64,${base64String}`)
    }
  }, [image])

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  };

  const handleClose = () => {
    setAnchorEl(null)
  };

  const handleUpdate = () => {
    handleClose()
  };

  const handleDelete = () => {
    handleClose()
  };
  console.log("Card")
  console.log(memory)

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        avatar={<Avatar alt="Cactus" src={imageSrc} />}
        action={
          <IconButton aria-label="settings" onClick={handleClick}>
            <MoreVertIcon />
          </IconButton>
        }
        title={name}
        subheader={timestamp}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
      <img src={imageSrc} alt=""/>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleUpdate}>Update</MenuItem>
        <MenuItem onClick={handleDelete}>Delete</MenuItem>
      </Menu>
    </Card>
  );
};

export default MemoryCard
