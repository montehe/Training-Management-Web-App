import { styled } from '@mui/system';
import { Box, TextField, Button, Modal } from '@mui/material';

export const StyledModal = styled(Modal)(({}) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

export const ModalContent = styled(Box)(({ theme }) => ({
  width: 400,
  padding: theme.spacing(3),
  backgroundColor: 'white',
  borderRadius: theme.shape.borderRadius,
}));

export const StyledTextField = styled(TextField)(({ theme }) => ({
  margin: theme.spacing(1, 0),
}));

export const ActionButtonsContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  marginTop: theme.spacing(2),
}));

export const SubmitButton = styled(Button)(({ theme }) => ({
  flex: 1,
  marginRight: theme.spacing(1),
}));

export const CancelButton = styled(Button)(({ }) => ({
  flex: 1,
}));
