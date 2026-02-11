import { styled } from '@mui/system';
import { Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

export const StyledNavLink = styled(Link)({
  textDecoration: 'none',
});

export const Logo = styled('img')({
  height: 200,
  width: 400,
  marginTop: 8,
  '@media (max-width: 600px)': { 
    width: '80%', 
  },
});

export const StyledSubTypography = styled(Typography)({
  color: 'black',
  margin: '3px 0',
  maxWidth: 'none',
  textAlign: 'left',
  width: '100%',
});

export const StyledButton = styled(Button)({
  fontWeight: 'bold',
  width: '50%',
  backgroundColor: '#DDB50B',
  color: 'white',
  borderRadius: 8,
  '&:hover': {
    backgroundColor: 'white',
    color: '#DDB50B',
  },
  '@media (max-width: 600px)':{
    width: '100%', 
  },
});

export const Container = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: 10,
  fontFamily: 'Arial, sans-serif',
  minHeight: '80vh',
  position: 'relative',
   overflow: 'hidden',  
});

export const LogoContainer = styled('div')({
  marginBottom: 10,
});

export const Divider = styled('hr')({
  width: '100%',
  border: '0',
  borderTop: '1px solid #ccc',
  margin: '20px 0',
});

export const FormContainer = styled('div')({
  width: '100%',
  maxWidth: 400,
  padding: 20,
  border: '1px solid #ddd',
  borderRadius: 8,
  backgroundColor: '#fff',
  textAlign: 'center',
});

export const Label = styled('label')({
  display: 'block',
  marginBottom: 8,
  fontWeight: 'bold',
  textAlign: 'left',
});

export const Input = styled('input')({
  width: 'calc(100% - 20px)',
  padding: 10,
  marginBottom: 20,
  border: '1px solid #ddd',
  borderRadius: 4,
});
