import React from 'react';
import { Container, Typography, Button,Box,Divider } from '@mui/material';
import { Email as MailOutlineIcon, Facebook as FacebookIcon, WhatsApp as WhatsAppIcon } from '@mui/icons-material';
import TopBar from '../common/TopbBar';
import NavBar from '../common/NavBar'; 
import { useNavigate } from 'react-router-dom';
import Footer from '../common/Footer';

const AboutUs: React.FC = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/register'); 
  };

  return (
    <>
      <TopBar />
      <NavBar />
    
      <Container 
        sx={{ 
          
        zIndex: 1000, 
          display: 'flex', 
          flexDirection: { xs: 'column', md: 'row' }, 
          alignItems: 'stretch', 
          padding: { xs: 2, md: 0 }, 
          height: { xs: 'auto', md: '100vh' },
          backgroundColor: 'white', 
          color: 'black', 
          boxSizing: 'border-box', 
          width: '100%',
           gap: { xs: 2, md: 4 }, 
        }}
      >
        <Box 
          sx={{
             marginTop: { xs:20, md: 50}, 
            flex: 2,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'flex-start', 
            padding: { xs: 2, md: 4 },
            textAlign: { xs: 'left', md: 'left' }, 
            marginBottom: { xs: 2, md: 4 },
          }}
        >
          <Typography variant="h4" gutterBottom>
            A Propos
          </Typography>
          <Typography variant="body1" paragraph>
            <strong>C'EST QUOI QEDEV MINDES</strong>
          </Typography>
          <Typography variant="body1" paragraph>
Chez WEDEV MINDS, nous sommes passionnés par le développement personnel et professionnel. Notre centre de formation offre des programmes innovants et adaptés aux besoins actuels du marché, visant à vous aider à atteindre vos objectifs de carrière.          </Typography>
          <Typography variant="body1" paragraph>
            <strong>Méthodologie</strong>
          </Typography>
          <Typography variant="body1" paragraph>
Notre approche pédagogique est basée sur une combinaison de théorie et de pratique. Nous utilisons des méthodes d’enseignement interactives et des études de cas réels pour garantir que vous acquérez des compétences directement applicables dans votre vie professionnelle.        
  </Typography>
   <Typography variant="body1" paragraph>
            <strong>Équipe d'Experts</strong>
          </Typography>
          <Typography variant="body1" paragraph>
Nos formateurs sont des professionnels expérimentés dans leurs domaines respectifs. Ils apportent non seulement une expertise technique approfondie, mais aussi une compréhension des défis réels du marché, vous offrant ainsi des conseils pratiques et des perspectives précieuses.  </Typography>
        </Box>

        <Divider 
          orientation="vertical" 
          flexItem 
          sx={{ 
            display: { xs: 'none', md: 'block' }, 
            backgroundColor: '#F4F0EB', 
          }} 
        />
        
        <Box 
          sx={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: { xs: 2, md: 4 },
            textAlign: 'center', 
          }}
        >
         <Box 
            sx={{
               marginBottom:'20px',
              marginTop: { xs:1 , md: 25}, 
              padding: 2,
              backgroundColor: '#F4F0EB', 
              border: '2px solid #F4F0EB', 
              width: '100%', 
              maxWidth: '500px', 
              boxSizing: 'border-box', 
            }}
          >
            <Typography variant="h4" gutterBottom color="black" fontSize={22}>
              Rejoignez WeDev Minds!
            </Typography>
            <Button
              variant="contained"
              sx={{
                marginBottom:'10px',
                backgroundColor: '#DDB50B',
                color: 'white',
                borderRadius: '8px',
                '&:hover': {
                  backgroundColor: 'white',
                  color: '#DDB50B',
                },
              }}
              onClick={handleClick}
            >
              Register
            </Button>
          </Box>
          <Typography variant="body1" display="flex" alignItems="center" marginBottom="10px">
        <a
          href="https://www.facebook.com/profile.php?id=61559286274565&mibextid=ZbWKwL"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'flex',
            alignItems: 'center',
            textDecoration: 'none',
            color: 'black',
          }}
        >
          <div
            style={{
             
              backgroundColor: 'white',
              borderRadius: '50%',
              padding: '8px',
              marginRight: '8px',
              border: '5px solid #F4F0EB',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <FacebookIcon sx={{ color: '#DDB50B' }} />
          </div>
          Facebook
        </a>
      </Typography>
      <Typography variant="body1" display="flex" alignItems="center" marginBottom="10px">
        <a
          href="https://wa.me/21692537806"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'flex',
            alignItems: 'center',
            textDecoration: 'none',
            color: 'black',
          }}
        >
          <div
            style={{
              backgroundColor: 'white',
              borderRadius: '50%',
              padding: '8px',
              marginRight: '8px',
              border: '5px solid #F4F0EB',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <WhatsAppIcon sx={{ color: '#DDB50B' }} />
          </div>
          +216 92537806
        </a>
      </Typography>
      <Typography variant="body1" display="flex" alignItems="center">
        <a
          href="mailto:wedevminds@hotmail.com"
          style={{
            display: 'flex',
            alignItems: 'center',
            textDecoration: 'none',
            color: 'black',
          }}
        >
          <div
            style={{
              backgroundColor: 'white',
              borderRadius: '50%',
              padding: '8px',
              marginRight: '8px',
              border: '5px solid #F4F0EB',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <MailOutlineIcon sx={{ color: '#DDB50B' }} />
          </div>
          wedevminds@hotmail.com
        </a>
      </Typography>
        </Box>
      </Container>
      <Footer/>
    </>
  );
};

export default AboutUs;
