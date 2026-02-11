import React from 'react';
import { Card, CardContent, Typography, CardMedia, CardActionArea } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
interface FormationCardProps {
  id: string;
  titre: string;
  description: string;
  prix: number;
  photo: string;
}
// Define a styled component with entrance animation
const AnimatedCard = styled(Card)(({}) => ({
  maxWidth: 250,
  height: '170px',
  marginLeft: '70px',
  marginRight: '10px',
  marginTop: '40px',
  marginBottom: '20px',
  borderRadius: '8px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  position: 'relative',
  animation: 'fadeIn 0.6s ease-out',
  '&:hover': {
    transform: 'scale(1.05)',
    boxShadow: '0 6px 12px rgba(0, 0, 0, 0.2)',
  },
  '@keyframes fadeIn': {
    '0%': { opacity: 0, transform: 'translateY(10px)' },
    '100%': { opacity: 1, transform: 'translateY(0)' },
  },
}));

const FormationCard: React.FC<FormationCardProps> = ({ id, titre, prix, photo }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/formations/${id}`);
  };

  return (
    <AnimatedCard>
      <CardActionArea onClick={handleCardClick}>
        <CardMedia
          component="img"
          height="100"
          image={photo}
          alt={titre}
          sx={{
            objectFit: 'cover',
            borderBottom: '3px solid #ddd',
          }}
        />
        <CardContent
          sx={{
            padding: 1,
            height: 'calc(100% - 100px)',
            overflow: 'hidden',
          }}
        >
          <Typography
            variant="subtitle1"
            component="div"
            sx={{
              fontWeight: 'bold',
              marginBottom: 0.5,
              fontSize: '0.9rem',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {titre}
          </Typography>
          <Typography
            variant="body2"
            color="text.primary"
            sx={{
              fontWeight: 'bold',
              fontSize: '0.8rem',
            }}
          >
            {prix.toFixed(2)} dt
          </Typography>
        </CardContent>
      </CardActionArea>
    </AnimatedCard>
  );
};

export default FormationCard;
