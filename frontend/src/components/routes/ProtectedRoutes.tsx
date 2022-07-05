import React from 'react';

import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@frontend/src/hooks/useAuth';

const ProtectedRoutes = () => {
  const auth = useAuth();

  return auth.user ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoutes;
