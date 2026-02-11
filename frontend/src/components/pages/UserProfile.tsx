import React from 'react';
import { useUserProfile } from '../../hooks/userProfile';
import { Grid, MenuItem, Select, InputLabel } from '@mui/material';
import NavBar from '../common/NavBar';
import TopBar from '../common/TopbBar';
import { 
  Container, 
  StyledTypography, 
  StyledSubTypography, 
  StyledDivider, 
  StyledTextField, 
  StyledFormControl, 
  StyledButton, 
  StyledSnackbar, 
  StyledAlert 
} from '../../styles/UserProfile';

const UserProfile: React.FC = () => {
  const {
    isFetchingProfile,
    formData,
    formErrors,
    notification,
    handleInputChange,
    handleSelectChange,
    handleSubmit,
    handleCloseNotification
  } = useUserProfile();

  if (isFetchingProfile) return <p>Loading...</p>;

  return (
    <>
      <TopBar />
      <NavBar />
      <div style={{ marginTop: '200px', zIndex: 1000 }} />

      <Container>
        <div style={{ maxWidth: '100%', width: '100%', margin: '0 auto' }}>
          <StyledTypography variant="h4" align="center">
            Modifier le Profile
          </StyledTypography>
          <StyledSubTypography variant="body1" align="center">
            Veuillez mettre à jour les informations de votre profil ci-dessous.
          </StyledSubTypography>
          <StyledDivider />
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2} justifyContent="center">
              <Grid item xs={12} sm={6}>
                <StyledTextField
                  fullWidth
                  required
                  variant="outlined"
                  label="Username"
                  name="username"
                  value={formData.username || ''}
                  onChange={handleInputChange}
                  error={!!formErrors.username}
                  helperText={formErrors.username}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <StyledTextField
                  fullWidth
                  required
                  variant="outlined"
                  label="Email"
                  name="email"
                  value={formData.email || ''}
                  onChange={handleInputChange}
                  error={!!formErrors.email}
                  helperText={formErrors.email}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <StyledTextField
                  fullWidth
                  variant="outlined"
                  label="Telephone"
                  name="tel"
                  value={formData.tel || ''}
                  onChange={handleInputChange}
                  error={!!formErrors.tel}
                  helperText={formErrors.tel}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <StyledTextField
                  fullWidth
                  variant="outlined"
                  label="Address"
                  name="adresse"
                  value={formData.adresse || ''}
                  onChange={handleInputChange}
                  error={!!formErrors.adresse}
                  helperText={formErrors.adresse}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <StyledFormControl fullWidth variant="outlined">
                  <InputLabel>Function</InputLabel>
                  <Select
                    name="fonction"
                    value={formData.fonction || 'etudiant'}
                    onChange={handleSelectChange}
                    error={!!formErrors.fonction}
                    label="Function"
                  >
                    <MenuItem value="etudiant">Etudiant</MenuItem>
                    <MenuItem value="employer">Employer</MenuItem>
                  </Select>
                </StyledFormControl>
              </Grid>
            </Grid>
            <div style={{ marginTop: '20px', textAlign: 'center' }}>
              <StyledButton type="submit" variant="contained" fullWidth>
                Modifier
              </StyledButton>
            </div>
          </form>
        </div>
      </Container>

      <StyledSnackbar
        open={notification.open}
        autoHideDuration={6000}
        onClose={handleCloseNotification}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <StyledAlert onClose={handleCloseNotification} severity={notification.severity}>
          {notification.message}
        </StyledAlert>
      </StyledSnackbar>
    </>
  );
};

export default UserProfile;
