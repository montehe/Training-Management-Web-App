import React from 'react';
import { Box, List, ListItem, ListItemIcon, ListItemText, Divider } from '@mui/material';
import { School, Event, ExitToApp, People } from '@mui/icons-material'; 
import { useNavigate, useLocation } from 'react-router-dom'; 
import { useDispatch } from 'react-redux';
import { logout } from '../../../redux/slices/authSlice';

const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation(); 
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/');
  };

  const getLinkStyle = (path: string) => ({
    backgroundColor: location.pathname.startsWith(path) ? '#E0CD9E' : 'transparent', 
    color: location.pathname.startsWith(path) ? 'white' : '#333',
    borderRadius: '4px', 
  });

  return (
    <Box
      sx={{
        width: '200px',
        height: '80vh',
        backgroundColor: 'white', 
        position: 'fixed',
        top: '100px', 
        bottom: '0px', 
        left: '10px',
        display: 'flex',
        flexDirection: 'column',
        paddingTop: '15px',
        paddingLeft: '15px', 
        boxShadow: '4px 0 8px rgba(0, 0, 0, 0.1), -4px 0 8px rgba(0, 0, 0, 0.1), 0 4px 8px rgba(0, 0, 0, 0.1), 0 -4px 8px rgba(0, 0, 0, 0.1)',
        borderRight: '3px solid #ddd',
      }}
    >
      <List>
        <ListItem
          button
          onClick={() => navigate('/admin-dashboard/formations')}
          sx={getLinkStyle('/admin-dashboard/formations')}
        >
          <ListItemIcon>
            <School sx={{ color: location.pathname.startsWith('/admin-dashboard/formations') ? 'white' : '#333' }} />
          </ListItemIcon>
          <ListItemText primary="Formations" sx={{ color: location.pathname.startsWith('/admin-dashboard/formations') ? 'white' : '#333' }} />
        </ListItem>
        <ListItem
          button
          onClick={() => navigate('/admin-dashboard/registrations')}
          sx={getLinkStyle('/admin-dashboard/registrations')}
        >
          <ListItemIcon>
            <Event sx={{ color: location.pathname.startsWith('/admin-dashboard/registrations') ? 'white' : '#333' }} />
          </ListItemIcon>
          <ListItemText primary="Registrations" sx={{ color: location.pathname.startsWith('/admin-dashboard/registrations') ? 'white' : '#333' }} />
        </ListItem>
        <ListItem
  button
  onClick={() => navigate('/admin-dashboard/user-list')}
  sx={getLinkStyle('/admin-dashboard/user-list')}
>
  <ListItemIcon>
    <People sx={{ color: location.pathname.startsWith('/admin-dashboard/user-list') ? 'white' : '#333' }} />
  </ListItemIcon>
  <ListItemText primary="Users" sx={{ color: location.pathname.startsWith('/admin-dashboard/user-list') ? 'white' : '#333' }} />
</ListItem>

        <Divider sx={{ my: 2 }} /> 
        <ListItem button onClick={handleLogout}>
          <ListItemIcon>
            <ExitToApp sx={{ color: '#333' }} /> 
          </ListItemIcon>
          <ListItemText primary="Logout" sx={{ color: '#333' }} /> 
        </ListItem>
      </List>
    </Box>
  );
};

export default Sidebar;
