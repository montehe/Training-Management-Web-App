import React, { useState, useEffect } from 'react';
import {
  Pagination,
  Typography,
  Table,
  TableBody,
  TableHead,
  TableRow,
  IconButton,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button
} from '@mui/material';
import { useGetUserRegistrationsQuery, useDeleteRegistrationMutation } from '../../../../redux/api/registration';
import TopBar from '../../../common/TopbBar';
import NavBar from '../../../common/NavBar';
import {
  Container,
  StyledTableContainer,
  StyledTableCell,
  PaginationBox,
  StyledDialog,
  StyledSnackbar,
  StyledAlert
} from '../../../../styles/RegistrationUser';
import DeleteIcon from '@mui/icons-material/Delete';

const RegistrationList: React.FC = () => {
  const { data: registrations, isLoading, isError } = useGetUserRegistrationsQuery();
  const [deleteRegistration] = useDeleteRegistrationMutation();
  
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [registrationToDelete, setRegistrationToDelete] = useState<string | null>(null);

  // Pagination state
  const [page, setPage] = useState(1);
  const [rowsPerPage] = useState(3); 
  const [totalItems, setTotalItems] = useState(0);

  // Handle page change
  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  useEffect(() => {
    if (registrations) {
      const sortedRegistrations = [...registrations].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      setTotalItems(sortedRegistrations.length);

      const startIndex = (page - 1) * rowsPerPage;
      setPaginatedRegistrations(sortedRegistrations.slice(startIndex, startIndex + rowsPerPage));
    }
  }, [registrations, page]);

  const [paginatedRegistrations, setPaginatedRegistrations] = useState<any[]>([]);

  // Handle delete
  const handleDelete = async () => {
    if (!registrationToDelete) return;
    try {
      await deleteRegistration(registrationToDelete).unwrap();
      setSnackbarMessage('Inscription supprimée avec succès !');
      setSnackbarSeverity('success');
    } catch (error) {
      setSnackbarMessage('Impossible de supprimer l\'inscription');
      setSnackbarSeverity('error');
    } finally {
      setOpenSnackbar(true);
      setDeleteDialogOpen(false);
    }
  };

  const handleDeleteClick = (id: string) => {
    setRegistrationToDelete(id);
    setDeleteDialogOpen(true);
  };

  const handleDeleteDialogClose = () => {
    setDeleteDialogOpen(false);
  };

  if (isLoading) return <Typography>Chargement des inscriptions...</Typography>;
  if (isError) return <Typography color="error">Échec du chargement des inscriptions</Typography>;

  return (
    <>
      <TopBar />
      <NavBar />
       <div style={{ marginTop: '200px', zIndex: 1000 }} />
      <Container>
        <StyledTableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <StyledTableCell sx={{ fontWeight: 'bold' }}>Formation</StyledTableCell>
                <StyledTableCell sx={{ fontWeight: 'bold' }}>Prix</StyledTableCell>
                <StyledTableCell sx={{ fontWeight: 'bold' }}>Date</StyledTableCell>
                <StyledTableCell sx={{ fontWeight: 'bold' }}>Actions</StyledTableCell> 
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedRegistrations.map((registration) => (
                <TableRow key={registration._id}>
                  <StyledTableCell>{registration.formationId?.titre || 'Formation inconnue'}</StyledTableCell>
                  <StyledTableCell>{registration.discountedPrice} dt</StyledTableCell>
                  <StyledTableCell>{new Date(registration.date).toLocaleDateString()}</StyledTableCell>
                  <StyledTableCell>
                    <IconButton onClick={() => handleDeleteClick(registration._id)} color="error">
                      <DeleteIcon />
                    </IconButton>
                  </StyledTableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </StyledTableContainer>

        <PaginationBox>
          <Pagination
            count={Math.ceil(totalItems / rowsPerPage)}
            page={page}
            onChange={handlePageChange}
            color="standard"
          />
        </PaginationBox>

        <StyledDialog open={deleteDialogOpen} onClose={handleDeleteDialogClose}>
          <DialogTitle>Confirmer la suppression</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Êtes-vous sûr de vouloir supprimer cette inscription ?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDeleteDialogClose}>Annuler</Button>
            <Button onClick={handleDelete} color="error">Supprimer</Button>
          </DialogActions>
        </StyledDialog>

        <StyledSnackbar
          open={openSnackbar}
          autoHideDuration={6000}
          onClose={() => setOpenSnackbar(false)}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <StyledAlert onClose={() => setOpenSnackbar(false)} severity={snackbarSeverity}>
            {snackbarMessage}
          </StyledAlert>
        </StyledSnackbar>
      </Container>
    </>
  );
};

export default RegistrationList;
