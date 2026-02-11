import React, { useState, useEffect } from 'react';
import { TableContainer, Table, Header, Row, Cell, NoData } from '../../../../styles/Users';

import {
  Box,
  Typography,
  Snackbar,
  Alert,

  Pagination
} from '@mui/material';
import { useGetAllUsersQuery } from '../../../../redux/api/user';

const UserList: React.FC = () => {
  const { data: users, isLoading, isError } = useGetAllUsersQuery();

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage] = useState('');
  const [snackbarSeverity] = useState<'success' | 'error'>('success');

  // Pagination state
  const [page, setPage] = useState(1);
  const [rowsPerPage] = useState(5); 
  const [totalItems, setTotalItems] = useState(0);

  // Handle page change
  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  useEffect(() => {
    if (users) {
      setTotalItems(users.length);
      // Apply pagination to users
      const startIndex = (page - 1) * rowsPerPage;
      setPaginatedUsers(users.slice(startIndex, startIndex + rowsPerPage));
    }
  }, [users, page]);

  const [paginatedUsers, setPaginatedUsers] = useState<any[]>([]);


  if (isLoading) return <Typography>Chargement des utilisateurs...</Typography>;
  if (isError) return <Typography color="error">Échec du chargement des utilisateurs</Typography>;

  return (
    <Box sx={{ padding: '20px', marginTop: '20px' }}>
     <TableContainer>
  <Table>
    <thead>
      <tr>
        <Header>Nom</Header>
        <Header>Email</Header>
        <Header>Téléphone</Header>
        <Header>Adresse</Header>
        <Header>Fonction</Header>
      </tr>
    </thead>
    <tbody>
      {paginatedUsers.length === 0 ? (
        <tr>
          <Cell colSpan={6}><NoData>Aucune donnée disponible</NoData></Cell>
        </tr>
      ) : (
        paginatedUsers.map((user) => (
          <Row key={user._id}>
            <Cell>{user.username}</Cell>
            <Cell>{user.email}</Cell>
            <Cell>{user.tel}</Cell>
            <Cell>{user.adresse}</Cell>
            <Cell>{user.fonction}</Cell>
           
          </Row>
        ))
      )}
    </tbody>
  </Table>
</TableContainer>

      <Box
        sx={{
          position: 'absolute',
          bottom: 25,
          right: 20,
          width: 'auto',
          display: 'flex',
          justifyContent: 'flex-end',
        }}
      >
        <Pagination
          count={Math.ceil(totalItems / rowsPerPage)}
          page={page}
          onChange={handlePageChange}
          color="standard"
        />
      </Box>

    

      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={() => setOpenSnackbar(false)}>
        <Alert onClose={() => setOpenSnackbar(false)} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default UserList;
