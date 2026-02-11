import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForgotPasswordMutation } from '../../redux/api/user';
import { forgotPasswordRequest, forgotPasswordSuccess, forgotPasswordFailure, selectAuth } from '../../redux/slices/authSlice';
import { Typography, Button, Snackbar, Alert } from '@mui/material'; 
import { StyledNavLink, Logo, StyledSubTypography, StyledButton, Container, LogoContainer, Divider, FormContainer, Label, Input } from '../../styles/ForgotPassword';
import logo from '../../assets/logo.jpg';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const dispatch = useDispatch();
  const { forgotPasswordStatus } = useSelector(selectAuth);

  const [forgotPassword] = useForgotPasswordMutation();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(forgotPasswordRequest());

    try {
      await forgotPassword({ email }).unwrap();
      dispatch(forgotPasswordSuccess());
      setNotificationMessage('Password reset link sent to your email.');
      setOpenSnackbar(true);
      setEmail(''); 
    } catch (error) {
      if (error instanceof Error) {
        dispatch(forgotPasswordFailure(error.message));
        setNotificationMessage(`Error: ${error.message}`);
        setOpenSnackbar(true);
      } else {
        dispatch(forgotPasswordFailure('An unknown error occurred.'));
        setNotificationMessage('An unknown error occurred.');
        setOpenSnackbar(true);
      }
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Container>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        action={
          <Button color="inherit" onClick={handleCloseSnackbar}>
            Close
          </Button>
        }
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        sx={{ top: 20 }} // Add extra space from the top if needed
      >
        <Alert onClose={handleCloseSnackbar} severity={forgotPasswordStatus === 'failed' ? 'error' : 'success'}>
          {notificationMessage}
        </Alert>
      </Snackbar>
      <LogoContainer>
        <Typography variant="h4" gutterBottom align="center" sx={{ color: 'white' }}>
          <StyledNavLink to="/">
            <Logo src={logo} alt="Logo" />
          </StyledNavLink>
        </Typography>
      </LogoContainer>
      <StyledSubTypography variant="body1" paragraph>
        Veuillez saisir votre adresse e-mail. Vous recevrez un e-mail contenant des instructions pour réinitialiser votre mot de passe.
      </StyledSubTypography>
      <Divider />
      <FormContainer>
        <form onSubmit={handleSubmit}>
          <Label htmlFor="email">Email:</Label>
          <Input
            type="email"
            id="email"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <StyledButton 
            type="submit" 
            disabled={forgotPasswordStatus === 'loading'}
          >
            {forgotPasswordStatus === 'loading' ? 'Sending...' : 'Envoyer'}
          </StyledButton>
        </form>
      </FormContainer>
    </Container>
  );
};

export default ForgotPassword;
