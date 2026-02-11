import React, { useState } from 'react';
import { Card, CardContent, Typography, CardMedia, CardActionArea, IconButton, Menu, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import MoreVertIcon from '@mui/icons-material/MoreVert';

interface FormationCardProps {
  id: string;
  titre: string;
  description: string;
  prix: number;
  photo: string;
  onDelete: (id: string) => void; 
  onUpdate: () => void;
}

const FormationCard: React.FC<FormationCardProps> = ({ id, titre, prix, photo, onDelete, onUpdate }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleUpdate = () => {
    handleClose();
    onUpdate();
  };

  const handleDelete = () => {
    onDelete(id);
    handleClose();
  };

  const handleCardClick = () => {
    navigate(`formations/${id}`);
  };

  return (
    <Card
      sx={{
        maxWidth: 250,
        height: '170px',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        overflow: 'hidden',
        transition: '0.3s',
        position: 'relative',
        '&:hover': {
          transform: 'scale(1.03)',
        },
      }}
    >
      <CardActionArea onClick={handleCardClick}>
        <CardMedia
          component="img"
          height="100"
          image={photo}
          alt={titre}
          sx={{
            objectFit: 'cover',
            borderBottom: '3px solid #ddd',
          }}
        />
        <CardContent
          sx={{
            padding: 1,
            height: 'calc(100% - 100px)',
            overflow: 'hidden',
          }}
        >
          <Typography
            variant="subtitle1"
            component="div"
            sx={{
              fontWeight: 'bold',
              marginBottom: 0.5,
              fontSize: '0.9rem',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {titre}
          </Typography>
          <Typography
            variant="body2"
            color="text.primary"
            sx={{
              fontWeight: 'bold',
              fontSize: '0.8rem',
            }}
          >
            {prix.toFixed(2)} dt
          </Typography>
        </CardContent>
      </CardActionArea>
      <IconButton
        aria-label="more"
        onClick={handleClick}
        sx={{
          position: 'absolute',
          top: 8,
          right: 8,
          color: 'rgba(0, 0, 0, 0.54)',
        }}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem onClick={handleUpdate}>Update</MenuItem>
        <MenuItem onClick={handleDelete}>Delete</MenuItem>
      </Menu>
    </Card>
  );
};

export default FormationCard;
