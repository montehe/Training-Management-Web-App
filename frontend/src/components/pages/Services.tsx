import React from 'react';
import { Container, Typography, Box, Grid } from '@mui/material';
import TopBar from '../common/TopbBar';
import NavBar from '../common/NavBar'; 
import Footer from '../common/Footer';
import {
  School as SchoolIcon,
  Engineering as EngineeringIcon,
  Bolt as BoltIcon,
  Construction as ConstructionIcon,
  Print as PrintIcon,
  Assistant as AssistantIcon,
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';

// Define a styled component with entrance animation
const AnimatedBox = styled(Box)(({}) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  position: 'relative',
  padding: 2,
  border: '2px solid #D3A983',
  borderRadius: 2,
  backgroundColor: 'white',
  textAlign: 'center',
  marginBottom: 10,
  width: '320px',
  height: '230px',
  transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
  animation: 'fadeIn 0.6s ease-out',
  '&:hover': {
    transform: 'scale(1.05)',
    boxShadow: '0 6px 12px rgba(0,0,0,0.2)',
  },
  '@keyframes fadeIn': {
    '0%': { opacity: 0, transform: 'translateY(10px)' },
    '100%': { opacity: 1, transform: 'translateY(0)' },
  },
}));

const services = [
  {
    title: 'Encadrement PFE',
    description: 'Nous offrons un encadrement personnalisé, une assistance et supervision pour les projets de fin d’études avec un suivi détaillé.',
    icon: <AssistantIcon sx={{ fontSize: 60, color: 'black' }} />,
  },
  {
    title: 'Formation',
    description: 'Des formations spécialisées adaptées à vos besoins pour renforcer vos compétences et avancer dans votre carrière.',
    icon: <SchoolIcon sx={{ fontSize: 60, color: 'black' }} />,
  },
  {
    title: 'Conception Mécanique',
    description: 'Conception et développement de solutions mécaniques innovantes pour divers besoins industriels.',
    icon: <EngineeringIcon sx={{ fontSize: 60, color: 'black' }} />,
  },
  {
    title: 'Conception Électrique',
    description: 'Services de conception et de mise en œuvre de systèmes électriques adaptés à vos exigences.',
    icon: <BoltIcon sx={{ fontSize: 60, color: 'black' }} />,
  },
  {
    title: 'Impression 3D',
    description: 'Solutions d’impression 3D pour prototypage rapide et production de pièces personnalisées.',
    icon: <PrintIcon sx={{ fontSize: 60, color: 'black' }} />,
  },
  {
    title: 'Consulting',
    description: 'Conseils spécialisés pour optimiser vos processus et atteindre vos objectifs d’affaires.',
    icon: <ConstructionIcon sx={{ fontSize: 60, color:'black' }} />,
  },
];

const Services: React.FC = () => {
  return (
    <>
      <TopBar />
      <NavBar />
      <Container
        sx={{
          padding: { xs: 2, md: 4 },
          backgroundColor: 'white',
          color: 'black',
          boxSizing: 'border-box',
          width: '100%',
          marginTop: { xs: 30, md: 35 },
        }}
      >
        <Grid container spacing={4} justifyContent="center">
          {services.map((service, index) => (
            <Grid item xs={12} md={6} lg={4} key={index} display="flex" justifyContent="center">
              <AnimatedBox>
                <Box
                  sx={{
                    width: '90px',
                    height: '90px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#F4F0EB',
                    position: 'absolute',
                    top: '-45px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    border: '3px solid #D3A983',
                  }}
                >
                  {service.icon}
                </Box>
                <Box
                  sx={{
                    marginTop: '60px', 
                    textAlign: 'center',
                    fontWeight:'bold'
                  }}
                >
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold'}}>
                    {service.title}
                  </Typography>
                  <Typography variant="body1">
                    {service.description}
                  </Typography>
                </Box>
              </AnimatedBox>
            </Grid>
          ))}
        </Grid>
      </Container>
      <Footer />
    </>
  );
};

export default Services;
