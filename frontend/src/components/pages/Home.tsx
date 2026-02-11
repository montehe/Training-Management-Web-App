import React, { useState, useEffect } from 'react';
import { Typography, Box } from '@mui/material';
import Slider from 'react-slick';
import Footer from '../common/Footer';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import animatedImage1 from '../../assets/images/1.gif';
import animatedImage2 from '../../assets/images/2.gif';
import animatedImage3 from '../../assets/images/3.gif';
import animatedImage4 from '../../assets/images/4.gif';
import { styled } from '@mui/material/styles';
import { StarRate, EmojiEvents, Build, Support, School, Assignment } from '@mui/icons-material';
import TopBar from '../common/TopbBar';
import NavBar from '../common/NavBar';

// Sample customer messages
const messages = [
  "j'ai participé à plusieurs formation en mécanique, c'etait vraiment excellent et unique ❤ , je recommande vivement WEDEV MINDS - Jawher Azzabi!",
  "j'ai participé à une formation et c'était une bonne expérience. J'ai beaucoup apprécié la qualité de la formation.Vous êtes les meilleurs. - Imen Bahoumi",
  "j'ai participé à plusieurs sessions de formation et j'ai apprécié la qualité d'enseignement ainsi que l'ambiance et la bonne humeur, je vous recommande d y participer vous ne serez pas déçu. - Paul Mg",
  "J'ai vraiment trouvé que les cours étaient très instructifs et j'ai accompli exactement ce que je voulais. Toutes les informations de la formation étaient factuelles, ce que j'apprécie. La sécurité doit être une question de faits et non d'opinions. Bravo pour les cours, ne changez rien.",
  "This is a good place where you can find good training to improve your skills in your field and to be very competitive at workplace So welcome future engineer 😎 - Junior Ngoyo",
  "the best training every ❤ - Abdelhak Jaballah "
];

// Image URLs
const images = [
  animatedImage1, 
  animatedImage2,
  animatedImage3,
];

// Styled component for the feedback typography
const StyledTypography = styled(Typography)(({ theme }) => ({
  position: 'relative',
  padding: theme.spacing(2),
  maxWidth: '100%',
  fontStyle: 'italic',
  color: '#555',
  marginBottom: theme.spacing(2),
  fontSize: '1rem', // Default font size
  [theme.breakpoints.up('sm')]: {
    fontSize: '1.25rem', // Slightly larger on small screens and up
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '1.5rem', // Larger on medium screens and up
  },
  '&::before': {
    content: '"“"',
    fontSize: '2rem', // Adjust size for responsiveness
    color: '#ccc',
    position: 'absolute',
    top: theme.spacing(1),
    left: '-60px',
    zIndex: 2,
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: '-30px',
    width: '1px',
    height: '100%',
    backgroundColor: '#ddd',
    zIndex: 1,
  },
}));

// Styled component for icons inside a circle
const IconCircle = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 80,
  height: 80,
  borderRadius: '50%',
  backgroundColor: '#f0f0f0',
  color: '#D3A983',
  marginRight: theme.spacing(2),
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
  fontSize: '2rem', // Default icon size
  [theme.breakpoints.up('sm')]: {
    fontSize: '2.5rem', // Larger icon size on small screens and up
  },
}));

const Home: React.FC = () => {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessageIndex(prevIndex => 
        (prevIndex + 1) % messages.length
      );
    }, 15000); // 15 seconds

    return () => clearInterval(interval); // Cleanup on component unmount
  }, []);

  // Determine the indices for the two messages to be displayed
  const firstIndex = currentMessageIndex;
  const secondIndex = (currentMessageIndex + 1) % messages.length;

  // Carousel settings
  const carouselSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000, // 3 seconds
  };

  return (
    <Box sx={{ width: '100%', overflow: 'hidden', padding: 0, margin: 0 }}>
      <TopBar/>
      <NavBar/>
      {/* Carousel */}
      <Box sx={{ width: '100%', overflow: 'hidden', mb: 4, mt: 23, position: 'relative' }}>
        <Slider {...carouselSettings}>
          {images.map((image, index) => (
            <Box key={index} sx={{ width: '100%', height: 'auto', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
              <img src={image} alt={`Slide ${index + 1}`} style={{ width: '100%', height: 'auto', objectFit: 'cover', display: 'block', borderBottom: '25px solid #F4F0EB' }} />
            </Box>
          ))}
        </Slider>
      </Box>

      {/* Feedback and Image Section */}
      <Box 
        sx={{ 
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: 'center',
          justifyContent: 'center',
          gap: 4,
          borderBottom: '50px solid #F4F0EB',
          padding: { xs: 2, md: 4 }
        }}
      >
        {/* Feedback Section */}
        <Box  sx={{ 
    flex: 2, 
    display: 'flex', 
    flexDirection: 'column', 
    alignItems: 'flex-start', 
    marginX: { xs: 2, md: 5 }, 
    padding: { xs: 2, md: 4 }
  }}>
          <Typography variant="h4" gutterBottom align="center" sx={{ fontSize: { xs: '1.5rem', md: '2rem' } }}>NOS RETOURS</Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: { xs: 'center', md: 'flex-start' }, gap: 2 }}>
            {[firstIndex, secondIndex].map(index => (
              <StyledTypography key={index} variant="h6">
                {messages[index]}
              </StyledTypography>
            ))}
          </Box>
        </Box>
        {/* Image Section with animatedImage4 */}
        <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center', marginX: { xs: 0, md: 2 } }}>
          <img src={animatedImage4} alt="Customer Feedback" style={{ width: '100%', maxWidth: '400px', height: 'auto', borderRadius: '8px' }} />
        </Box>
      </Box>

      {/* Qualities Section */}
      <Box 
        sx={{
          marginTop: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '100%',
          gap: 6,
         // borderBottom: '50px solid #F4F0EB',
          paddingBottom: 4,
          marginX: { xs: 2, md: 0 }
        }}
      >
        {/* Rows of qualities*/}
        {[
          [
            { icon: <StarRate />, title: 'Qualité', text: '« Un service irréprochable grâce à des normes rigoureuses et un engagement vers l\'excellence. »' },
            { icon: <EmojiEvents />, title: 'Expérience', text: '« Une expertise solide acquise au fil des années pour des interactions optimales. »' }
          ],
          [
            { icon: <Build />, title: 'Infrastructure', text: '« Des équipements modernes et des technologies de pointe pour des opérations efficaces. »' },
            { icon: <Support />, title: 'Soutien', text: '« Un accompagnement constant pour garantir le succès et le bien-être de nos équipes. »' }
          ],
          [
            { icon: <School />, title: 'Approche Pédagogique Adaptée', text: '« Des formations personnalisées pour répondre aux besoins spécifiques de chaque collaborateur. »' },
            { icon: <Assignment />, title: 'Suivi et Évaluation', text: '« Des évaluations régulières pour assurer des performances optimales et ajuster les stratégies. »' }
          ]
        ].map((row, rowIndex) => (
          <Box 
            key={rowIndex}
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              justifyContent: 'center',
              gap: 2,
              width: '100%',
              maxWidth: '1200px',
            }}
          >
            {row.map((quality, index) => (
              <Box 
                key={index}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  flexDirection: 'row',
                  gap: 2,
                  flex: 1,
                  maxWidth: '400px',
                }}
              >
                <IconCircle>{quality.icon}</IconCircle>
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 'bold', fontSize: { xs: '1rem', sm: '1.25rem' } }}>
                    {quality.title}
                  </Typography>
                  <Typography variant="body1" sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}>
                    {quality.text}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>
        ))}
      </Box>

      <Footer />
    </Box>
  );
};

export default Home;
