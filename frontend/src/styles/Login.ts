import { styled } from '@mui/system';
import { NavLink } from 'react-router-dom';
import { Button, TextField, IconButton, InputAdornment } from '@mui/material';

export const StyledNavLink = styled(NavLink)({
  textDecoration: 'none',
  '&.active .nav-button': {
    color: '#C4A177',
  },
});

export const Logo = styled('img')({
  height: 'auto',
  width: '70%', 
  maxWidth: 350, 
  marginTop: 8,
  '@media (max-width: 600px)': { 
    width: '70%',
  },
});

export const FullPageContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  height: '80vh',
  width: '100v',
  marginTop: '60px',
  padding: 0,
  backgroundColor: 'white',
  position: 'relative',
  boxSizing: 'border-box',
});

export const LoginFormContainer = styled('div')(({ theme }) => ({
  width: '80%',
  maxWidth: 400,
  padding: theme.spacing(4),
  backgroundColor: 'white',
  border: '5px solid #E0CD9E',
  borderRadius: theme.shape.borderRadius,
  boxSizing: 'border-box',
  '@media (max-width: 600px)': {
    width: '95%',
  },
}));

export const LinksContainer = styled('div')(({ theme }) => ({
  marginTop: theme.spacing(2),
  textAlign: 'center',
  display: 'flex',
  flexDirection: 'column', 
  justifyContent: 'center',
  alignItems: 'center',
}));

export const BottomLinkContainer = styled('div')({
  position: 'fixed',
  marginTop: 10,
  bottom: 20,
  left: '5%',
  '@media (max-width: 500px)': {
    left: '2%',
    bottom: 10,
  },
});

export const StyledTextField = styled(TextField)({
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: 'black',
    },
    '&:hover fieldset': {
      borderColor: 'black',
    },
    '&.Mui-focused fieldset': {
      borderColor: 'black',
    },
  },
  '& .MuiInputLabel-root': {
    color: 'black',
  },
  '& .MuiOutlinedInput-input': {
    color: 'black',
  },
  '@media (max-width: 500px)': {
    left: '2%',
    bottom: 10,
  },
});

export const StyledButton = styled(Button)({
  fontWeight: 'bold',
  width: '100%',
  maxWidth: 300, 
  backgroundColor: '#DDB50B',
  color: 'white',
  borderRadius: '8px',
  '&:hover': {
    backgroundColor: 'white',
    color: '#DDB50B',
  },
  '@media (max-width: 600px)': {
    width: '100%',
    maxWidth: 'none',
  },
});

export const StyledInputAdornment = styled(InputAdornment)({
  color: '#DDB50B',
});

export const PasswordVisibilityButton = styled(IconButton)({
  color: '#DDB50B',
  '@media (max-width: 400px)': {
    bottom: 10,
  },
});
