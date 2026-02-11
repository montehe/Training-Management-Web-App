import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Typography, Button } from '@mui/material';
import { useGetFormationByIdQuery } from '../../../../redux/api/formation';
import { useAddRegistrationMutation } from '../../../../redux/api/registration';
import TopBar from '../../../common/TopbBar';
import NavBar from '../../../common/NavBar';
import Footer from '../../../common/Footer';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../redux/store';
import { styled } from '@mui/material/styles';

// Styled components with animations
const AnimatedBox = styled(Box)(({ }) => ({
  animation: 'fadeIn 0.8s ease-out',
  '@keyframes fadeIn': {
    '0%': { opacity: 0, transform: 'translateY(20px)' },
    '100%': { opacity: 1, transform: 'translateY(0)' },
  },
}));

const AnimatedButton = styled(Button)(({ }) => ({
  transition: 'background-color 0.3s ease',
  '&:hover': {
    backgroundColor: '#DDA30B',
  },
}));

const UserFormationDetails: React.FC = () => {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: formation, isLoading, isError } = useGetFormationByIdQuery(id || '');
  const [addRegistration] = useAddRegistrationMutation();

  const handleRegister = async () => {
    if (!isAuthenticated) {
      navigate('/login'); 
      return;
    }

    try {
      await addRegistration({ formationId: id || '' }).unwrap();
      alert('Inscription réussie!');
    } catch (error) {
      alert('Échec de l’inscription.');
    }
  };

  if (isLoading) return <Typography>Chargement...</Typography>;
  if (isError) return <Typography color="error">Échec du chargement de la formation</Typography>;
  if (!formation) return <Typography>Aucune formation trouvée</Typography>;

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <TopBar />
      <NavBar />
      <Box
        component="main"
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          padding: { xs: '10px', sm: '20px' },
          marginTop: { xs: '160px', md: '180px' },
          flex: 1,
          alignItems: 'center',
          justifyContent: { md: 'space-between', xs: 'center' },
        }}
      >
        <AnimatedBox
          sx={{
            flex: 1,
            marginRight: { md: '20px', xs: 0 },
            textAlign: { xs: 'center', md: 'left' },
          }}
        >
          <Typography
            variant="h4"
            sx={{
              fontWeight: 'bold',
              textDecoration: 'underline',
              marginBottom: '16px',
              fontSize: { xs: '1.5rem', md: '2rem' },
            }}
          >
            {formation.titre}
          </Typography>
          <Typography variant="body1" sx={{ fontSize: { xs: '0.875rem', md: '1rem' } }}>
            {formation.description}
          </Typography>
        </AnimatedBox>
        <AnimatedBox
          sx={{
            textAlign: 'center',
            flexShrink: 0,
            width: { xs: '80%', sm: '60%', md: '300px' },
            marginTop: { xs: '20px', md: '0' },
            transition: 'transform 0.3s ease',
            '&:hover': {
              transform: 'scale(1.03)',
            },
          }}
        >
          <Box
            component="img"
            src={formation.photo}
            alt={formation.titre}
            sx={{
              width: '100%',
              height: 'auto',
              maxWidth: '200px',
              maxHeight: '200px',
              borderRadius: '50%',
              objectFit: 'cover',
              border: '2px solid #F4F0EB',
              marginBottom: '20px',
              transition: 'transform 0.3s ease',
              '&:hover': {
                transform: 'scale(1.05)',
              },
            }}
          />
          <Typography
            variant="h6"
            color="textSecondary"
            sx={{
              marginBottom: '20px',
              color: 'black',
              fontSize: { xs: '1rem', md: '1.5rem' },
              fontWeight: 'bold',
            }}
          >
            Prix: {formation.prix} dt
          </Typography>
          <AnimatedButton
            variant="contained"
            color="primary"
            sx={{
              backgroundColor: '#DDB50B',
              color: 'white',
              '&:hover': { backgroundColor: '#DDA30B' },
            }}
            onClick={handleRegister}
          >
            S'inscrire
          </AnimatedButton>
        </AnimatedBox>
      </Box>
      <Footer />
    </Box>
  );
};

export default UserFormationDetails;
