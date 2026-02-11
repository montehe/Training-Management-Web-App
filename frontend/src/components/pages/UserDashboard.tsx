import React from 'react';
import { Outlet } from 'react-router-dom';
import TopBar from '../../components/common/TopbBar';
import NavBar from '../common/NavBar';
import Footer from '../common/Footer';

const UserDashboard: React.FC = () => {
  return (
    <div>
      <TopBar />
      <NavBar />
      <div  style={{ 
        zIndex: 1000, 
      }}>
        <Outlet /> 
      </div>
      <Footer />
    </div>
  );
};

export default UserDashboard;
