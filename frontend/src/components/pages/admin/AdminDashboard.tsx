import React, { useState } from 'react';
import { Box, Pagination } from '@mui/material';
import TopBar from '../../common/TopbBar';
import Sidebar from './SideBar';
import { Outlet } from 'react-router-dom';

const AdminDashboard: React.FC = () => {
  const [page, setPage] = useState(1);
  const [rowsPerPage] = useState(6);
  const [totalItems, setTotalItems] = useState(0);

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <TopBar />
      <Sidebar />
    
        <Outlet context={{ page, rowsPerPage, setPage, setTotalItems }} />

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
    </div>
  );
};

export default AdminDashboard;

