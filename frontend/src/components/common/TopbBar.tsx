import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Divider, IconButton, Box, Drawer, List, ListItem, ListItemText, useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { logout } from '../../redux/slices/authSlice';
import Logo from '../../assets/logo.jpg';

const TopBar: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const user = useSelector((state: RootState) => state.auth.user);
  const theme = useTheme();
  
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  const isAdmin = user?.role === 'admin';

  const toggleDrawer = (open: boolean) => () => {
    setDrawerOpen(open);
  };

  const drawerItems = (
    <Box sx={{ width: 250, height: '100%', bgcolor: 'white', position: 'relative', zIndex: 2 }}>
      <List>
        {isAuthenticated ? (
          !isAdmin ? (
            <>
              <ListItem button onClick={() => navigate('/user-profile')}>
                <IconButton color="inherit">
                  <AccountCircle />
                </IconButton>
                <ListItemText primary="PROFILE" />
              </ListItem>
              <Divider />
              <ListItem button onClick={() => navigate('/inscriptions')}>
                <ListItemText primary="Inscriptions" />
              </ListItem>
              <ListItem button onClick={handleLogout}>
                <ListItemText primary="Logout" />
              </ListItem>
            </>
          ) : null
        ) : (
          <ListItem button onClick={() => navigate('/login')}>
            <ListItemText primary="Login" />
          </ListItem>
        )}
      </List>
    </Box>
  );

  return (
    <>
     <AppBar
  position="absolute"
  sx={{
    backgroundColor: isAdmin ? 'white' : '#DDB50B',
    height: { xs: '60px', sm: '80px' },
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: theme.spacing(0, 2),
    overflow: 'hidden', 
  }}
>
         <Toolbar sx={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          {isAdmin && (
            <Box
              sx={{
                display: { xs: 'none', sm: 'flex' },
                alignItems: 'center',
              }}
            >
               <img
                src={Logo}
                alt="Logo"
                style={{
                  marginTop:'0px',
                  height: '120px',
                  width: 'auto',
                }}
              />

            </Box>
          )}
          <Typography
            variant="h6"
            sx={{
              fontSize: { xs: '1rem', sm: '1.25rem' },
              letterSpacing: '1px',
              fontWeight: 'bold',
              color: isAdmin ? '#E2CD9E' : '#E2CD9E',
              flexGrow: 1,
              textAlign: { xs: 'center', sm: 'left' },
            }}
          >
            {isAuthenticated ? (isAdmin ? 'ADMIN' : `Bienvenue, ${user?.username}`) : ''}
          </Typography>
          <Box
            sx={{
              display: { xs: 'block', sm: 'none' },
              position: 'relative',
              width: 40,
              height: 40,
            }}
          >
            <IconButton
              color="inherit"
              edge="start"
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: 40,
                height: 40,
                backgroundColor: 'transparent',
                '&:hover': { backgroundColor: 'transparent' },
              }}
              onClick={toggleDrawer(true)}
            >
              <Box
                sx={{
                  width: 0,
                  height: 0,
                  borderLeft: '15px solid transparent',
                  borderRight: '15px solid transparent',
                  borderTop: '15px solid black',
                  position: 'absolute',
                  top: 15,
                  left: 10,
                }}
              />
            </IconButton>
          </Box>
          <Box
            sx={{
              display: { xs: 'none', sm: 'flex' },
              alignItems: 'center',
            }}
          >
            {isAuthenticated ? (
              !isAdmin ? (
                <>
                  <Box
                    sx={{ display: 'flex', alignItems: 'center' }}
                    onClick={() => navigate('/user-profile')}
                  >
                    <IconButton color="inherit">
                      <AccountCircle />
                    </IconButton>
                    <Typography
                      variant="body1"
                      color="inherit"
                      sx={{
                        ml: 1,
                        fontSize: 15,
                        fontWeight: 'bold',
                        '&:hover': { color: '#C4A177' },
                        '&:active': { color: '#C4A177' },
                      }}
                    >
                      PROFILE
                    </Typography>
                  </Box>
                  <Divider
                    orientation="vertical"
                    flexItem
                    sx={{ bgcolor: '#E2CD9E', height: '35px', mx: 1 }}
                  />
                  <Button
                    color="inherit"
                    onClick={() => navigate('/inscriptions')}
                    sx={{
                      fontSize: 15,
                      fontFamily: 'sans-serif',
                      fontWeight: 'bold',
                      '&:hover': { color: '#C4A177' },
                      '&:active': { color: '#C4A177' },
                    }}
                  >
                    Inscriptions
                  </Button>
                  <Divider
                    orientation="vertical"
                    flexItem
                    sx={{ bgcolor: '#E2CD9E', height: '35px', mx: 1 }}
                  />
                  <Button
                    color="inherit"
                    onClick={handleLogout}
                    sx={{
                      fontSize: 15,
                      fontFamily: 'sans-serif',
                      fontWeight: 'bold',
                      '&:hover': { color: '#C4A177' },
                      '&:active': { color: '#C4A177' },
                    }}
                  >
                    Logout
                  </Button>
                </>
              ) : null
            ) : (
              <Button
                color="inherit"
                sx={{
                  fontSize: 15,
                  fontFamily: 'sans-serif',
                  fontWeight: 'bold',
                  '&:hover': { color: '#C4A177' },
                  '&:active': { color: '#C4A177' },
                }}
                onClick={() => navigate('/login')}
              >
                Login
              </Button>
            )}
          </Box>
        </Toolbar>
      </AppBar>
     <Drawer
  anchor="top"
  open={drawerOpen}
  onClose={toggleDrawer(false)}
  sx={{
    zIndex: theme.zIndex.drawer + 1,
    overflow: 'hidden', // Prevent overflow within the drawer
  }}
>
  {drawerItems}
</Drawer>

    </>
  );
};

export default TopBar;
