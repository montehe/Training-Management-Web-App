import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useResetPasswordMutation } from '../../redux/api/user';
import { Typography, Button, Snackbar, Alert } from '@mui/material';
import { StyledNavLink, Logo, StyledSubTypography, StyledButton, Container, LogoContainer, Divider, FormContainer, Label, Input } from '../../styles/ForgotPassword';
import logo from '../../assets/logo.jpg';
const ResetPassword = () => {
  const { token } = useParams<{ token: string }>();
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [resetPassword, { isLoading, isError }] = useResetPasswordMutation();
  const [message, setMessage] = useState('');
  const [open, setOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (newPassword !== confirmNewPassword) {
      setMessage('Passwords do not match');
      setOpen(true);
      return;
    }

    try {
      await resetPassword({ token: token!, newPassword, confirmNewPassword }).unwrap();
      setMessage('Password reset successfully');
      setOpen(true);
      setTimeout(() => navigate('/login'), 3000);
    } catch (err) {
      setMessage('Failed to reset password');
      setOpen(true);
    }
  };

  const handleCloseSnackbar = () => {
    setOpen(false);
  };

  return (
    <Container>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        action={
          <Button color="inherit" onClick={handleCloseSnackbar}>
            Close
          </Button>
        }
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        sx={{ top: 20 }}
      >
        <Alert onClose={handleCloseSnackbar} severity={isError ? 'error' : 'success'}>
          {message}
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
        Réinitialisez votre mot de passe en remplissant le formulaire ci-dessous.
      </StyledSubTypography>
      <Divider />
      <FormContainer>
        <form onSubmit={handleSubmit}>
          <Label htmlFor="newPassword">New Password:</Label>
          <Input
            type="password"
            id="newPassword"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
          <Label htmlFor="confirmNewPassword">Confirm New Password:</Label>
          <Input
            type="password"
            id="confirmNewPassword"
            placeholder="Confirm New Password"
            value={confirmNewPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
            required
          />
          <StyledButton 
            type="submit" 
            disabled={isLoading}
          >
            {isLoading ? 'Resetting...' : 'Reset Password'}
          </StyledButton>
        </form>
      </FormContainer>
    </Container>
  );
};

export default ResetPassword;
