import { styled } from '@mui/system';
import { Typography, Divider, TextField, FormControl, Button, Snackbar, Alert } from '@mui/material';

// Container
export const Container = styled('div')(({ theme }) => ({
  padding: '20px',
  maxWidth: '100%',
  margin: '0 auto',
  [theme.breakpoints.down('sm')]: {
    padding: '10px',
  },
}));

// Typography
export const StyledTypography = styled(Typography)(({ theme }) => ({
  textAlign: 'left',
  fontWeight: 'bold',
  [theme.breakpoints.down('sm')]: {
    fontSize: '1.5rem',
    textAlign: 'center',
  },
}));

export const StyledSubTypography = styled(Typography)(({ theme }) => ({
  marginTop: theme.spacing(2),
  textAlign: 'left',
  fontFamily: 'bold',
  [theme.breakpoints.down('sm')]: {
    fontSize: '1rem',
    textAlign: 'center',
  },
}));

// Divider
export const StyledDivider = styled(Divider)(({ theme }) => ({
  margin: '16px 0',
  [theme.breakpoints.down('sm')]: {
    margin: '10px 0',
  },
}));

// TextField
export const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor:'primary',
    },
    '&:hover fieldset': {
      borderColor:'primary',
    },
    '&.Mui-focused fieldset': {
      borderColor: 'black',
    },
  },
  '& .MuiInputLabel-root': {
    color:'primary',
  },
  '& .MuiOutlinedInput-input': {
    color: 'primary',
  },
  [theme.breakpoints.down('sm')]: {
    marginBottom: theme.spacing(2),
  },
}));

// Button
export const StyledButton = styled(Button)(({ theme }) => ({
  fontWeight: 'bold',
  width: '50%',
  backgroundColor: '#DDB50B',
  color: 'white',
  borderRadius: '8px',
  '&:hover': {
    backgroundColor: 'white',
    color: '#DDB50B',
  },
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    fontSize: '0.875rem',
  },
}));

// Styled Select and FormControl
export const StyledFormControl = styled(FormControl)(({ theme }) => ({
  height: 55,
  '& .MuiSelect-select': {
    color: 'primary',
  },
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: 'primary',
  },
  '&:hover .MuiOutlinedInput-notchedOutline': {
    borderColor: 'dark',
  },
  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
    borderColor:'dark',
  },
  [theme.breakpoints.down('sm')]: {
    height: 'auto',
    marginBottom: theme.spacing(2),
  },
}));

// Styled Snackbar and Alert
export const StyledSnackbar = styled(Snackbar)(({}) => ({
  '& .MuiSnackbarContent-root': {
    backgroundColor: '#000',
  },
}));

export const StyledAlert = styled(Alert)(({}) => ({
  '& .MuiAlert-message': {
    color:'primary',
  },
}));
