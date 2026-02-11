import React, { useState, useEffect } from 'react';
import { Box, Button, Grid, Typography, Snackbar, Alert, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, TextField } from '@mui/material';
import FormationCard from './FormationCard';
import AddFormationModal from './AddFormationModal';
import { useGetFormationsQuery, useAddFormationMutation, useUpdateFormationMutation, useDeleteFormationMutation, useSearchFormationsQuery } from '../../../../redux/api/formation';
import { Formation } from '../../../../redux/types';
import { useOutletContext } from 'react-router-dom';
import { textFieldStyle, addButtonStyle } from '../../../../styles/Formation';

const Formations: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [currentFormation, setCurrentFormation] = useState<Formation | null>(null);
  const [formations, setFormations] = useState<Formation[]>([]);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [formationToDelete, setFormationToDelete] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const { page, rowsPerPage, setPage, setTotalItems } = useOutletContext<{
    page: number;
    rowsPerPage: number;
    setPage: React.Dispatch<React.SetStateAction<number>>;
    setTotalItems: React.Dispatch<React.SetStateAction<number>>;
  }>();

  const { data: fetchedFormations, isLoading, isError } = useGetFormationsQuery();
  const { data: searchResults } = useSearchFormationsQuery(searchQuery, {
    skip: !searchQuery,
  });
  const [addFormation] = useAddFormationMutation();
  const [updateFormation] = useUpdateFormationMutation();
  const [deleteFormation] = useDeleteFormationMutation();

  useEffect(() => {
    if (searchQuery) {
      setFormations(searchResults || []);
    } else if (fetchedFormations) {
      setFormations(fetchedFormations);
    }
  }, [searchQuery, searchResults, fetchedFormations]);

  useEffect(() => {
    const totalPages = Math.ceil(formations.length / rowsPerPage);
    if (page > totalPages && totalPages > 0) {
      setPage(totalPages);
    }
  }, [formations, page, rowsPerPage, setPage]);

  const paginatedFormations = formations.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  const handleOpenModal = (formation?: Formation) => {
    setCurrentFormation(formation || null);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setCurrentFormation(null);
    setModalOpen(false);
  };

  const handleAddFormation = async (formation: Formation) => {
  try {
    const newFormation = await addFormation(formation).unwrap();
    setFormations(prev => {
      const updatedFormations = [newFormation, ...prev];
      setTotalItems(updatedFormations.length);
      return updatedFormations;
    });
    setSnackbarMessage('Formation ajoutée avec succès!');
    setSnackbarSeverity('success');
  } catch (error) {
    setSnackbarMessage('Impossible d\'ajouter la formation');
    setSnackbarSeverity('error');
  } finally {
    setOpenSnackbar(true);
    handleCloseModal();
  }
};


  const handleUpdateFormation = async (formation: Formation) => {
    if (!formation._id) return;
    try {
      const updatedFormation = await updateFormation({ id: formation._id, body: formation }).unwrap();
      setFormations(prev => {
        const updatedFormations = prev.map(f => f._id === updatedFormation._id ? updatedFormation : f);
        setTotalItems(updatedFormations.length);
        return updatedFormations;
      });
      setSnackbarMessage('Formation mise à jour avec succès !');
      setSnackbarSeverity('success');
    } catch (error) {
      setSnackbarMessage('Impossible de modifier la formation');
      setSnackbarSeverity('error');
    } finally {
      setOpenSnackbar(true);
      handleCloseModal();
    }
  };

  const handleDeleteFormation = async () => {
    if (!formationToDelete) return;
    try {
      await deleteFormation(formationToDelete).unwrap();
      setFormations(prev => {
        const updatedFormations = prev.filter(f => f._id !== formationToDelete);
        setTotalItems(updatedFormations.length);
        return updatedFormations;
      });
      setSnackbarMessage('Formation supprimée avec succès !');
      setSnackbarSeverity('success');
    } catch (error) {
      setSnackbarMessage('Impossible de supprimer la formation');
      setSnackbarSeverity('error');
    } finally {
      setOpenSnackbar(true);
      setDeleteDialogOpen(false);
    }
  };

  const handleDeleteClick = (id: string) => {
    setFormationToDelete(id);
    setDeleteDialogOpen(true);
  };

  const handleDeleteDialogClose = () => {
    setDeleteDialogOpen(false);
  };

  return (
    <main
        style={{
          height: 'calc(100vh - 64px)', 
          marginLeft: '280px',
          marginTop: '180px',
          padding: '20px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
    <Box>
      <TextField
        label="Rechercher"
        variant="outlined"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        sx={textFieldStyle}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={() => handleOpenModal()}
        sx={addButtonStyle}
      >
        +
      </Button>

      {isLoading && <Typography>Formations en chargement...</Typography>}
      {isError && <Typography color="error">Échec du chargement des formations</Typography>}

      <Grid container spacing={2}>
        {paginatedFormations.map((formation) => (
          <Grid item xs={12} sm={6} md={4} key={formation._id}>
            <FormationCard
              id={formation._id}
              titre={formation.titre}
              description={formation.description}
              prix={formation.prix}
              photo={formation.photo}
              onDelete={() => handleDeleteClick(formation._id)}
              onUpdate={() => handleOpenModal(formation)}
            />
          </Grid>
        ))}
      </Grid>

      <AddFormationModal
        open={modalOpen}
        onClose={handleCloseModal}
        onAddFormation={handleAddFormation}
        onUpdateFormation={handleUpdateFormation}
        existingFormation={currentFormation}
      />
      <Dialog open={deleteDialogOpen} onClose={handleDeleteDialogClose}>
        <DialogTitle>Confirmer la suppression</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Êtes-vous sûr de vouloir supprimer cette formation ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteDialogClose}>Annuler</Button>
          <Button onClick={handleDeleteFormation} color="error">Supprimer</Button>
        </DialogActions>
      </Dialog>

      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={() => setOpenSnackbar(false)}>
        <Alert onClose={() => setOpenSnackbar(false)} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
    </main>
  );
};

export default Formations;
