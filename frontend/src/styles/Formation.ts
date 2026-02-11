import { SxProps, Theme } from '@mui/material/styles';

export const textFieldStyle: SxProps<Theme> = {
  position: 'fixed',
  top: '100px',
  right: '150px',
  fontSize: '24px',
  width: '300px',
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#E0CD9E',
    },
    '&:hover fieldset': {
      borderColor: '#E0CD9E',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#E0CD9E',
    },
  },
  '& .MuiInputLabel-root': {
    color: '#E0CD9E',
  },
  '& .MuiInputLabel-root.Mui-focused': {
    color: '#E0CD9E',
  },
};

export const addButtonStyle: SxProps<Theme> = {
  position: 'fixed',
  top: '100px',
  right: '40px',
  fontSize: '24px',
  borderRadius: '50%',
  width: '50px',
  height: '50px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '#E0CD9E',
  color: '#fff',
  border: 'none',
  cursor: 'pointer',
  zIndex: 1200,
};
