import React from 'react';
import { Navigate ,Outlet} from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PrivateRoute = ({ children, adminOnly = false }) => {
  const { currentUser } = useAuth();

  if (currentUser === undefined) {
    return <div>Loading...</div>; // Or a spinner
  }

  if (!currentUser) {
    return <Navigate to="/login" replace/>;
  }

  if (adminOnly && currentUser.role !== 'admin') {
    return <Navigate to="/" replace/>;
  }

  return children;
};

export default PrivateRoute;