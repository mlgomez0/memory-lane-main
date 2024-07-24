import React, { useState } from 'react';
import {
    Card,
    CardContent,
    Typography,
    IconButton,
    Menu,
    MenuItem,
    Avatar,
    CardHeader
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { MemoryCardProps } from '../utils/types';
import MemoryModal from './MemoryModal';
import { useDispatch } from 'react-redux';
import { setOpenModal } from '../slices';
import AlertMemoryDeletion from './AlertMemoryDeletion';
import { useMemories } from '../hooks/useMemories';

const MemoryCard: React.FC<MemoryCardProps> = ({ memory }) => {
  const dispatch = useDispatch();
  const { name, description, timestamp, image } = memory;
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [openDeleteAlert, setOpenDeleteAlert] = useState(false);
  const { removeMemory } = useMemories();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleAlert = () => {
    setOpenDeleteAlert(true);
  };

  const formatString = (dateString: string) => {
    const [year, month, day] = dateString.split('-').map(Number);
    const date = new Date(year, month - 1, day);
    const formatter = new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: '2-digit'
    });
    return formatter.format(date);
  };

  const handleUpdate = () => {
    dispatch(setOpenModal(true));
  };

  const handleDeleteMemory = async (id: string) => {
    await removeMemory(id);
  };

  const handleDelete = () => {
    if (memory.id) {
      handleDeleteMemory(memory.id);
    }
    setOpenDeleteAlert(false);
    handleClose();
  };

  return (
    <Card sx={{ width: 345, minHeight: 200 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ height: 80, width: 80 }} alt="Cactus" src={`data:image/jpeg;base64,${image}`} />
        }
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
        <MemoryModal memory={memory}/>
        <MenuItem onClick={handleAlert}>Delete</MenuItem>
        <AlertMemoryDeletion handleDelete={handleDelete} openDeleteAlert={openDeleteAlert} setOpenDeleteAlert={setOpenDeleteAlert}/>
      </Menu>
    </Card>
  );
};

export default MemoryCard;
