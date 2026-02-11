import React, { useState } from 'react';
import { AppBar, Toolbar, Button, IconButton, Menu, MenuItem, Divider } from '@mui/material';
import { styled } from '@mui/system';
import { NavLink } from 'react-router-dom';
import logo from '../../assets/logo.jpg';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close'; // Import Close Icon

// Styled AppBar
const StyledAppBar = styled(AppBar)(({}) => ({
  backgroundColor: '#ffffff',
  color: '#000',
  boxShadow: 'none',
  borderBottom: '25px solid #F4F0EB',
  position: 'absolute',
  top: 55,
  left: 0,
  width: '100%',
  zIndex: 1100,
  height: 130, // Default height for larger screens
}));

// Styled Toolbar
const StyledToolbar = styled(Toolbar)(({}) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '0 20px',
  '@media (max-width: 600px)': {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
}));

// Logo
const Logo = styled('img')({
  marginTop: 28,
  height: 170,
  width: 'auto',
  '@media (max-width: 600px)': {
    height: 130,
  },
});

// NavButton
const NavButton = styled(Button)(({ theme }) => ({
  fontWeight: 'bold',
  color: 'black',
  margin: theme.spacing(1),
  '@media (max-width: 600px)': {
    display: 'none',
  },
  '&.active': {
    color: '#D3A983', // Match hover color
  },
  '&:hover': {
    color: '#D3A983',
    backgroundColor: 'transparent',
  },
}));

// StyledNavLink
const StyledNavLink = styled(NavLink)(({}) => ({
  textDecoration: 'none',
  color: 'inherit',
  '&.active': {
    color: '#D3A983', // Match hover color
  },
}));

// MenuButton
const MenuButton = styled(IconButton)(({}) => ({
  display: 'none',
  '@media (max-width: 600px)': {
    display: 'block',
  },
}));

// Fullscreen Menu
const FullscreenMenu = styled(Menu)(({ theme }) => ({
  '& .MuiPaper-root': {
    width: '60vw',
    height: '100vh',
    top: 0,
    left: 0,
    borderRadius: 0,
    boxShadow: 'none',
    position: 'fixed',
    zIndex: 1300,
    backgroundColor: '#ffffff',
    padding: theme.spacing(3),
    display: 'flex',
    flexDirection: 'column',
  },
}));

// CloseButton
const CloseButton = styled(IconButton)(({ theme }) => ({
  alignSelf: 'flex-end',
  marginBottom: theme.spacing(2),
}));

// MenuItem Style
const StyledMenuItem = styled(MenuItem)(({ theme }) => ({
  fontSize: '1.5rem',
  padding: theme.spacing(2),
  '&:hover': {
    backgroundColor: '#F4F0EB',
    color: '#D3A983',
  },
  '&:active': {
    backgroundColor: '#F4F0EB',
    color: '#D3A983',
  },
}));

// Divider Style
const StyledDivider = styled(Divider)(({}) => ({
  margin: '10px 0',
}));

const NavBar: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <StyledAppBar>
        <StyledToolbar>
          <StyledNavLink to="/" end>
            <Logo src={logo} alt="Logo" />
          </StyledNavLink>
          <div>
            <MenuButton edge="start" color="inherit" onClick={handleMenuClick} aria-label="menu">
              <MenuIcon />
            </MenuButton>
            <div>
              <StyledNavLink to="/" end>
                {({ isActive }) => (
                  <NavButton className={isActive ? 'active' : ''} disableRipple>
                    Accueil
                  </NavButton>
                )}
              </StyledNavLink>
              <StyledNavLink to="/formations">
                {({ isActive }) => (
                  <NavButton className={isActive ? 'active' : ''} disableRipple>
                    Formations
                  </NavButton>
                )}
              </StyledNavLink>
              <StyledNavLink to="/services">
                {({ isActive }) => (
                  <NavButton className={isActive ? 'active' : ''} disableRipple>
                    Service
                  </NavButton>
                )}
              </StyledNavLink>
              <StyledNavLink to="/about-us">
                {({ isActive }) => (
                  <NavButton className={isActive ? 'active' : ''} disableRipple>
                    Apropos
                  </NavButton>
                )}
              </StyledNavLink>
            </div>
          </div>
        </StyledToolbar>
      </StyledAppBar>
      <FullscreenMenu
        anchorEl={anchorEl}
        open={open}
        onClose={handleMenuClose}
        sx={{ display: { xs: 'block', md: 'none' } }}
      >
        <CloseButton onClick={handleMenuClose}>
          <CloseIcon />
        </CloseButton>
        <StyledNavLink to="/" end>
          <StyledMenuItem onClick={handleMenuClose}>Accueil</StyledMenuItem>
        </StyledNavLink>
        <StyledDivider />
        <StyledNavLink to="/formations">
          <StyledMenuItem onClick={handleMenuClose}>Formations</StyledMenuItem>
        </StyledNavLink>
        <StyledDivider />
        <StyledNavLink to="/services">
          <StyledMenuItem onClick={handleMenuClose}>Service</StyledMenuItem>
        </StyledNavLink>
        <StyledDivider />
        <StyledNavLink to="/about-us">
          <StyledMenuItem onClick={handleMenuClose}>Apropos</StyledMenuItem>
        </StyledNavLink>
      </FullscreenMenu>
    </>
  );
};

export default NavBar;
