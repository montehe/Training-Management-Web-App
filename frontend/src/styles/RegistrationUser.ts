// RegistrationListStyles.ts
import { styled } from '@mui/system';
import { Box, TableCell,Paper, Dialog, Snackbar, Alert } from '@mui/material';

// Container
export const Container = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  maxWidth: '100%',
  margin: '0 auto',
  [theme.breakpoints.down('md')]: {
    padding: theme.spacing(1),
  },
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(0.5),
  },
}));

// TableContainer
export const StyledTableContainer = styled(Paper)(({ theme }) => ({
  maxWidth: '100%',  // Adjusted to fit small screens better
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(2),
  margin: theme.spacing(0, 2), // Reduced margin for small screens
  [theme.breakpoints.down('md')]: {
    padding: theme.spacing(1),
    margin: theme.spacing(0, 1),
  },
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(0.5),
    margin: theme.spacing(0),
  },
}));

// Table Cell
export const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    fontSize: '0.75rem', // Smaller font size for small screens
    padding: theme.spacing(1), // Adjust padding for better spacing
  },
}));

// Pagination Box
export const PaginationBox = styled(Box)(({ theme }) => ({
    marginTop:'200px',
  position: 'fixed',
  bottom: theme.spacing(3),
  right: theme.spacing(2),
  display: 'flex',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 2),
  [theme.breakpoints.down('md')]: {
    bottom: theme.spacing(2),
  },
  [theme.breakpoints.down('sm')]: {
    bottom: theme.spacing(1),
    right: theme.spacing(1),
    padding: theme.spacing(0, 1),
  },
}));

// Dialog
export const StyledDialog = styled(Dialog)(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    margin: theme.spacing(1),
  },
  [theme.breakpoints.down('sm')]: {
    margin: theme.spacing(0.5),
    padding: theme.spacing(1),
  },
}));

// Snackbar
export const StyledSnackbar = styled(Snackbar)(({}) => ({
  '& .MuiSnackbarContent-root': {
    backgroundColor: '#000',
  },
}));

// Alert
export const StyledAlert = styled(Alert)(({}) => ({
  '& .MuiAlert-message': {
    color: 'primary',
  },
}));
