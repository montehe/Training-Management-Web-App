import React from 'react';
import { useLogin } from '../../hooks/login';
import { Typography, Box, Snackbar, Alert,Divider } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { 
  StyledNavLink, 
  Logo, 
  FullPageContainer, 
  LoginFormContainer, 
  LinksContainer, 
  BottomLinkContainer, 
  StyledTextField, 
  StyledButton, 
  StyledInputAdornment, 
  PasswordVisibilityButton 
} from '../../styles/Login';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import logo from '../../assets/logo.jpg'; 

const Login: React.FC = () => {
  const {
    email,
    password,
    showPassword,
    handleChange,
    handleClickShowPassword,
    handleMouseDownPassword,
    handleLogin,
    notification,
    handleCloseNotification,
  } = useLogin();

  return (
    <FullPageContainer>
      <Snackbar 
        open={notification.open} 
        autoHideDuration={6000} 
        onClose={handleCloseNotification} 
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleCloseNotification} 
          severity={notification.severity} 
          sx={{ width: '100%' }}
        >
          {notification.message}
        </Alert>
      </Snackbar>
      <LoginFormContainer>
        <Typography variant="h4" gutterBottom align="center" style={{ color: 'white' }}>
          <StyledNavLink to="/" end>
            <Logo src={logo} alt="Logo" />
          </StyledNavLink>
        </Typography>
        <form onSubmit={handleLogin}>
          <Box mb={2}>
            <StyledTextField
              label="Email"
              name="email"
              variant="outlined"
              fullWidth
              required
              value={email}
              onChange={handleChange}
            />
          </Box>
          <Box mb={2}>
            <StyledTextField
              label="Mot de passe"
              name="password"
              type={showPassword ? 'text' : 'password'}
              variant="outlined"
              fullWidth
              required
              value={password}
              onChange={handleChange}
              InputProps={{
                endAdornment: (
                  <StyledInputAdornment position="end">
                    <PasswordVisibilityButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </PasswordVisibilityButton>
                  </StyledInputAdornment>
                ),
              }}
            />
          </Box>
          <StyledButton type="submit" variant="contained" color="primary" fullWidth>
            Se connecter
          </StyledButton>
        </form>
        <LinksContainer>
          <NavLink to="/register" style={{ color: 'black', fontFamily: 'Sans-serif', textDecoration: 'none' }}>
            Créer compte
          </NavLink>
          <Divider orientation="vertical" flexItem sx={{ backgroundColor: 'white', margin: '0 10px' }} />
          <NavLink to="/forgot-password" style={{ color: 'black', fontFamily: 'Sans-serif', textDecoration: 'none' }}>
  Mot de passe oublié
</NavLink>

        </LinksContainer>
      </LoginFormContainer>
      <BottomLinkContainer>
        <NavLink to="/" style={{ color: 'black', fontWeight: 'bold', textDecoration: 'none' }}>
          <ArrowBackIcon /> Acceder à WeDev Minds
        </NavLink>
      </BottomLinkContainer>
    </FullPageContainer>
  );
};

export default Login;
