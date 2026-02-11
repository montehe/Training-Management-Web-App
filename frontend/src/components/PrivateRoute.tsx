import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

interface PrivateRouteProps {
  children: React.ReactNode;
  requiredRole: string;
}
const PrivateRoute: React.FC<PrivateRouteProps> = ({ children, requiredRole }) => {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const userRole = useSelector((state: RootState) => state.auth.user?.role);

  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  if (userRole !== requiredRole) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
};


export default PrivateRoute;
