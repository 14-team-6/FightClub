import React from 'react';

import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@frontend/src/hooks/useAuth';

const PublicRoutes = () => {
  const auth = useAuth();

  return auth.user ? <Navigate to="/" /> : <Outlet />;
};

export default PublicRoutes;
