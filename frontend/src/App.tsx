import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from './redux/store';
import LoadingPage from './components/common/LaodingPage';
import Home from './components/pages/Home';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import AdminDashboard from './components/pages/admin/AdminDashboard';
import UserDashboard from './components/pages/UserDashboard';
import PrivateRoute from './components/PrivateRoute';
import AboutUs from './components/pages/AboutUs';
import { login } from './redux/slices/authSlice';
import UserProfile from './components/pages/UserProfile';
import ForgotPassword from './components/auth/ForgotPassword';
import ResetPassword from './components/auth/ResetPassword';
import FormationDetails from './components/pages/admin/formations/FormationDetails';
import Registrations from './components/pages/admin/registration/Registrations';
import Formations from './components/pages/admin/formations/Formations';
import UserFormations from './components/pages/User/Formation/Formation';
import UserFormationDetails from './components/pages/User/Formation/UserFormationDetails';
import RegistrationList from './components/pages/User/Registration/RegistrationList';
import UserList from './components/pages/admin/user/UserList';
import Services from './components/pages/Services';
import './App.css';
const App: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const userRole = useSelector((state: RootState) => state.auth.user?.role);
  const dispatch = useDispatch();

  useEffect(() => {
    const user = localStorage.getItem('authUser');
    const token = localStorage.getItem('authToken');

    if (user && token) {
      dispatch(login({ user: JSON.parse(user), token }));
    }

    // Simulate loading time and then set loading to false
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000); 

    return () => clearTimeout(timer);
  }, [dispatch]);

  if (loading) {
    return <LoadingPage />;
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element=
                {<Home />}

        />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={isAuthenticated ? <Navigate to={userRole === 'admin' ? '/admin-dashboard' : '/'} /> : <Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/services" element={<Services />} />
        <Route path="/formations" element={<UserFormations />} />
        <Route path="/formations/:id" element={<UserFormationDetails />} />
        <Route path="/user-profile" element={<UserProfile />} />
        <Route path="/inscriptions" element={<RegistrationList />} />
        <Route path="/admin-dashboard" element={<PrivateRoute requiredRole="admin"><AdminDashboard /></PrivateRoute>}>
          <Route index element={<Formations />} />
          <Route path="formations" element={<Formations />} />
          <Route path="formations/:id" element={<FormationDetails />} />
          <Route path="registrations" element={<Registrations />} />
          <Route path="user-list" element={<UserList />} />
        </Route>
        <Route path="*" element={isAuthenticated ? (userRole === 'admin' ? <Navigate to="/admin-dashboard" /> : <Navigate to="/user-dashboard" />) : <Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;
