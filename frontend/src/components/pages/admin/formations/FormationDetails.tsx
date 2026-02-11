import React from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import { useGetFormationByIdQuery } from '../../../../redux/api/formation'; 

const FormationDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data: formation, isLoading, isError } = useGetFormationByIdQuery(id || '');

  if (isLoading) return <Typography>Chargement...</Typography>;
  if (isError) return <Typography color="error">Échec du chargement de la formation</Typography>;
  if (!formation) return <Typography>Aucune formation trouvée</Typography>;

  return (
      <main
        style={{
          height: 'calc(100vh - 64px)', 
          marginLeft: '270px',
          marginTop: '50px',
          padding: '20px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <Box
        sx={{
          display: 'flex',
          flex: 1,
          overflow: 'hidden',
        }}
      >
        <Box
          component="main"
          sx={{
            flex: 1,
            marginLeft: '10px', 
            padding: '20px',
            height: 'calc(100vh - 64px)',
          }}
        >
          <Box
            sx={{
              position:'fixed',
              display: 'flex',
            
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '20px',
              backgroundColor: '#fff',
              borderRadius: '10px',
              marginTop: '80px',
              height:'350px',
              width:'150vh',
              boxShadow: 5, 
            }}
          >
            <Box sx={{ flex: 1, marginRight: '20px' }}>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 'bold',
                  textDecoration: 'underline',
                  marginBottom: '16px',
                }}
              >
                {formation.titre}
              </Typography>
              <Typography variant="body1" sx={{ marginTop: '16px' }}>
                {formation.description}
              </Typography>
            </Box>
            <Box sx={{ textAlign: 'center', flexShrink: 0, width: '300px' }}>
              <Box
                component="img"
                src={formation.photo}
                alt={formation.titre}
                sx={{ maxWidth: '100%', borderRadius: '8px',marginRight:'50px' }}
              />
              <Typography variant="h6" color="textSecondary" sx={{marginBottom:'20px',color:'black' , fontSize:'24px' ,marginTop: '16px', fontWeight:'Bold' }}>
                Prix: {formation.prix} dt
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
    </main>
  );
};

export default FormationDetails;
