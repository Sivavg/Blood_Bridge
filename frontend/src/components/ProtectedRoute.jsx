import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { user } = useSelector((state) => state.auth);

  // User not logged in - redirect to landing page
  if (!user) {
    return <Navigate to="/" replace />;
  }

  // Admin-only route but user is not admin
  if (adminOnly && user.role !== 'admin') {
    return <Navigate to="/donor" replace />;
  }

  // User is authenticated - render the protected component
  return children;
};

export default ProtectedRoute;
