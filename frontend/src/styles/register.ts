import { styled } from '@mui/system';
import { TextField, Button, Snackbar, Alert, IconButton, Container, Typography, Divider, FormControl, InputAdornment } from '@mui/material';

export const RegisterContainer = styled(Container)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: theme.spacing(2, 4),
  height: '100%',
  backgroundColor: 'white',
  color: 'black',
  marginTop: theme.spacing(2),
  boxSizing: 'border-box',
  minWidth: '100%',
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2),
  },
}));

export const StyledTypography = styled(Typography)(({ theme }) => ({
  textAlign: 'left',
  fontWeight: 'bold',
  [theme.breakpoints.down('sm')]: {
    fontSize: '1.5rem',
  },
}));

export const StyledSubTypography = styled(Typography)(({ theme }) => ({
  marginTop: theme.spacing(2),
  textAlign: 'left',
  fontFamily: 'bold',
  [theme.breakpoints.down('sm')]: {
    fontSize: '1rem',
  },
}));

export const StyledDivider = styled(Divider)(({ theme }) => ({
  margin: theme.spacing(4, 0),
}));

export const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: 'primary',
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
  [theme.breakpoints.down('sm')]: {
    width: '100%',
  },
}));

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
  },
}));

export const StyledFormControl = styled(FormControl)(({ theme }) => ({
  height: 55,
  '& .MuiSelect-select': {
    color: 'black',
  },
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: 'primary',
  },
  '&:hover .MuiOutlinedInput-notchedOutline': {
    borderColor: 'black',
  },
  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
    borderColor: 'black',
  },
  [theme.breakpoints.down('sm')]: {
    width: '100%',
  },
}));

export const StyledInputAdornment = styled(InputAdornment)({
  color: '#DDB50B',
});

export const StyledSnackbar = styled(Snackbar)(({}) => ({
  '& .MuiSnackbarContent-root': {
    backgroundColor: '#000',
  },
}));

export const StyledAlert = styled(Alert)(({ }) => ({
  '& .MuiAlert-message': {
    color: 'black',
  },
}));

export const PasswordVisibilityButton = styled(IconButton)({
  color: '#DDB50B',
});
