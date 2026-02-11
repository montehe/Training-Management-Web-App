import React, { useState, useEffect } from 'react';
import { Grid, Typography, Snackbar, Alert, TextField } from '@mui/material';
import FormationCard from '../Formation/FormationCard';
import { useGetFormationsQuery, useSearchFormationsQuery } from '../../../../redux/api/formation';
import { Formation } from '../../../../redux/types';
import TopBar from '../../../common/TopbBar';
import NavBar from '../../../common/NavBar';
import Footer from '../../../common/Footer';

const UserFormations: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [formations, setFormations] = useState<Formation[]>([]);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage] = useState('');
  const [snackbarSeverity] = useState<'success' | 'error'>('success');

  const { data: fetchedFormations, isLoading, isError } = useGetFormationsQuery();
  const { data: searchResults } = useSearchFormationsQuery(searchQuery, {
    skip: !searchQuery,
  });

  useEffect(() => {
    const sourceFormations = searchQuery ? searchResults : fetchedFormations;

    if (sourceFormations) {
      const sortedFormations = [...sourceFormations].sort((a, b) => b._id.localeCompare(a._id));
      setFormations(sortedFormations);
    }
  }, [searchQuery, searchResults, fetchedFormations]);

  return (
    <>
      <TopBar />
      <NavBar />
      <div style={{ 
        marginTop: '230px', 
        zIndex: 1000, 
      }} />
      <TextField
  label="Rechercher"
  variant="outlined"
  value={searchQuery}
  onChange={(e) => setSearchQuery(e.target.value)}
  sx={{
    margin: '16px', 
    fontSize: '1rem',
    maxWidth: '100%', 
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#E0CD9E',
      },
      '&:hover fieldset': {
        borderColor: '#E0CD9E',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#E0CD9E',
      },
    },
    '& .MuiInputLabel-root': {
      color: '#E0CD9E',
    },
    '& .MuiInputLabel-root.Mui-focused': {
      color: '#E0CD9E',
    },
  }}
/>

      {isLoading && <Typography variant="h6">Formations en chargement...</Typography>}
      {isError && <Typography variant="h6" color="error">Échec du chargement des formations</Typography>}

      <Grid container spacing={1} marginLeft={-5}>
        {formations.map((formation) => (
          <Grid item xs={12} sm={6} md={3} key={formation._id}>
            <FormationCard
              id={formation._id}
              titre={formation.titre}
              description={formation.description}
              prix={formation.prix}
              photo={formation.photo}
            />
          </Grid>
        ))}
      </Grid>
      <Footer/>

      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={() => setOpenSnackbar(false)}>
        <Alert onClose={() => setOpenSnackbar(false)} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default UserFormations;
