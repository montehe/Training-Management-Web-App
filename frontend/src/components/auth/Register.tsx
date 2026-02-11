import React from 'react';
import { Grid, MenuItem, Select, InputLabel } from '@mui/material';
import { useRegister } from '../../hooks/register';
import TopBar from '../common/TopbBar';
import NavBar from '../common/NavBar';
import { 
  RegisterContainer, 
  StyledTypography, 
  StyledSubTypography, 
  StyledDivider, 
  StyledTextField, 
  StyledButton, 
  StyledFormControl, 
  StyledInputAdornment, 
  PasswordVisibilityButton, 
  StyledSnackbar, 
  StyledAlert 
} from '../../styles/register';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const Register: React.FC = () => {
  const {
    username,
    email,
    password,
    confirmPassword,
    showPassword,
    name,
    tel,
    adresse,
    fonction,
    handleChange,
    handleClickShowPassword,
    handleMouseDownPassword,
    handleRegister,
    notification,
    handleCloseNotification,
  } = useRegister();

  return (
    <>
      <TopBar />
      <NavBar />
      <div style={{ marginTop: '200px', zIndex: 1000 }} />

      <RegisterContainer>
        <div style={{ maxWidth: '100%' }}>
          <StyledTypography variant="h4" paragraph align="center">
            Créer un Compte
          </StyledTypography>
          <StyledSubTypography variant="body1" paragraph align="center">
            Si vous êtes intéressé veuillez remplir vos informations ci-dessous. Les identifiants (email et mot de passe) sont ceux que l'utilisateur utilisera pour se connecter à son compte.
          </StyledSubTypography>
          <StyledDivider />
          <form onSubmit={handleRegister}>
            <Grid container spacing={2} justifyContent="center">
              <Grid item xs={12} sm={6}>
                <StyledTextField
                  fullWidth
                  required
                  variant="outlined"
                  label="Nom d'utilisateur"
                  name="username"
                  value={username}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <StyledTextField
                  fullWidth
                  required
                  variant="outlined"
                  label="Email"
                  name="email"
                  value={email}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
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
              </Grid>
              <Grid item xs={12} sm={6}>
                <StyledTextField
                  fullWidth
                  variant="outlined"
                  type={showPassword ? 'text' : 'password'}
                  label="Confirmer le mot de passe"
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={handleChange}
                />
              </Grid>
            </Grid>

            <StyledTypography variant="body1" paragraph align="center" sx={{ mt: 5 }}>
              Informations personnelles
            </StyledTypography>
            <StyledDivider />
            <Grid container spacing={2} justifyContent="center">
              <Grid item xs={12} sm={6}>
                <StyledTextField
                  fullWidth
                  variant="outlined"
                  required
                  label="Nom"
                  name="name"
                  value={name}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <StyledTextField
                  fullWidth
                  variant="outlined"
                  required
                  label="Téléphone"
                  name="tel"
                  value={tel}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <StyledTextField
                  fullWidth
                  variant="outlined"
                  required
                  label="Adresse"
                  name="adresse"
                  value={adresse}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <StyledFormControl fullWidth variant="outlined" size="small">
                  <InputLabel>Fonction</InputLabel>
                  <Select
                    name="fonction"
                    required
                    value={fonction}
                    onChange={handleChange}
                    label="Fonction"
                  >
                    <MenuItem value="etudiant">Etudiant</MenuItem>
                    <MenuItem value="employer">Employeur</MenuItem>
                  </Select>
                </StyledFormControl>
              </Grid>
            </Grid>
            <div style={{ marginTop: '20px', textAlign: 'center' }}>
              <StyledButton type="submit" variant="contained" fullWidth>
                S'inscrire
              </StyledButton>
            </div>
          </form>
        </div>
      </RegisterContainer>

      <StyledSnackbar
        open={notification.open}
        autoHideDuration={6000}
        onClose={handleCloseNotification}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <StyledAlert
          onClose={handleCloseNotification}
          severity={notification.severity}
          sx={{ width: '100%' }}
        >
          {notification.message}
        </StyledAlert>
      </StyledSnackbar>
    </>
  );
};

export default Register;
