import React from 'react';
import { CircularProgress, Typography, Box } from '@mui/material';

const LoadingPage: React.FC = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: 'white',
      }}
    >
      <CircularProgress sx={{ color: '#FFD700' }} />
      <Typography variant="h6" sx={{ mt: 2, color: 'white' }}>
        Loading...
      </Typography>
    </Box>
  );
};

export default LoadingPage;
