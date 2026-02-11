import React, { useState, useEffect } from 'react';
import { Snackbar, Alert, TextField, Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import { useGetAllRegistrationsQuery, useSearchRegistrationsByTitleQuery, useDeleteRegistrationMutation } from '../../../../redux/api/registration';
import { Registration } from '../../../../redux/types';
import { TableContainer, Table, Header, Row, Cell, DeleteButton, Loading } from '../../../../styles/Registration';
import { useOutletContext } from 'react-router-dom';

const Registrations: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [deleteRegistration] = useDeleteRegistrationMutation();
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [registrationToDelete, setRegistrationToDelete] = useState<string | null>(null);

  const { page, rowsPerPage, setTotalItems } = useOutletContext<{
    page: number;
    rowsPerPage: number;
    setPage: React.Dispatch<React.SetStateAction<number>>;
    setTotalItems: React.Dispatch<React.SetStateAction<number>>;
  }>();

  const { data: allRegistrations = [], error: fetchError, isLoading } = useGetAllRegistrationsQuery();
  const { data: searchResults = [], error: searchError } = useSearchRegistrationsByTitleQuery(searchQuery, {
    skip: searchQuery.trim() === '',
  });

  useEffect(() => {
    if (searchQuery.trim()) {
      if (searchError) {
        setSnackbarMessage('Error searching registrations.');
        setSnackbarSeverity('error');
        setOpenSnackbar(true);
      } else {
        setRegistrations(searchResults);
      }
    } else {
      if (fetchError) {
        setSnackbarMessage('Error fetching registrations.');
        setSnackbarSeverity('error');
        setOpenSnackbar(true);
      } else {
        setRegistrations(allRegistrations);
      }
    }
  }, [searchQuery, searchResults, allRegistrations, fetchError, searchError]);

  // Sort registrations by date in descending order
  const sortedRegistrations = [...registrations].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  // Calculate paginated data
  const paginatedRegistrations = sortedRegistrations.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  useEffect(() => {
    setTotalItems(sortedRegistrations.length);
  }, [sortedRegistrations, setTotalItems]);

  const handleDelete = async () => {
    if (!registrationToDelete) return;
    try {
      await deleteRegistration(registrationToDelete).unwrap();
      setRegistrations(prevRegistrations =>
        prevRegistrations.filter(registration => registration._id !== registrationToDelete)
      );
      setSnackbarMessage('Registration deleted successfully!');
      setSnackbarSeverity('success');
    } catch (error) {
      setSnackbarMessage('Failed to delete registration');
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

  const handleCloseDeleteDialog = () => {
    setDeleteDialogOpen(false);
  };

  if (isLoading) return <Loading>Loading...</Loading>;

  const isEmpty = paginatedRegistrations.length === 0;
  return (
    <div style={{
      overflow: 'hidden',
      height: 'calc(100vh - 64px)',
      marginLeft: '280px',
      marginTop: '160px',
      padding: '20px',
    }}>
      <main>
        <TextField
          label="Search"
          variant="outlined"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{
            position: 'fixed',
            top: '100px',
            right: '150px',
            fontSize: '24px',
            width: '300px',
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
            '@media (max-width: 600px)': {
              position: 'static',
              width: '100%',
              fontSize: '20px',
              right: 'auto',
            },
          }}
        />
        <TableContainer>
          <Table>
            <thead>
              <tr>
                <Header>Email</Header>
               <Header>Telephone</Header> 
                <Header>Formation</Header>
                <Header>Prix</Header>
                <Header>Date</Header>
                <Header>Actions</Header>
              </tr>
            </thead>
            <tbody>
              {isEmpty ? (
                <Row>
                  <Cell colSpan={5} className="empty-message">Aucune inscription trouvée pour "{searchQuery || 'all'}"</Cell>
                </Row>
              ) : (
                paginatedRegistrations.slice(0, 5).map((registration: Registration) => ( // Limit to 5 rows
                  <Row key={registration._id}>
                    <Cell>{registration.userId.email}</Cell>
                     <Cell>{registration.userId.tel}</Cell>
                    <Cell>{registration.formationId?.titre || 'N"existe pas'}</Cell>
                    <Cell>{registration.discountedPrice.toFixed(2)} dt</Cell>
                    <Cell>{new Date(registration.date).toLocaleDateString()}</Cell> {/* Added Date Column */}

                    <Cell>
                      <DeleteButton
                        onClick={() => handleDeleteClick(registration._id)}
                        aria-label={`Delete registration for ${registration.userId.email}`}
                      >
                        Delete
                      </DeleteButton>
                    </Cell>
                  </Row>
                ))
              )}
            </tbody>
          </Table>
        </TableContainer>

        <Dialog open={deleteDialogOpen} onClose={handleCloseDeleteDialog}>
          <DialogTitle>Confirmer la suppression</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Etes-vous sûr de vouloir supprimer cette inscription ?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDeleteDialog}>Cancel</Button>
            <Button onClick={handleDelete} color="error">Delete</Button>
          </DialogActions>
        </Dialog>

        <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={() => setOpenSnackbar(false)}>
          <Alert onClose={() => setOpenSnackbar(false)} severity={snackbarSeverity}>
            {snackbarMessage}
          </Alert>
        </Snackbar>
        
      </main>
    </div>
    
  );
};

export default Registrations;
