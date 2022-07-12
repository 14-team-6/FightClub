import React from 'react';

import { Navigate, Outlet, useSearchParams } from 'react-router-dom';
import { useAuth } from '@frontend/src/hooks/useAuth';

const ProtectedRoutes = () => {
  const auth = useAuth();

  const [searchParams] = useSearchParams();

  return auth.user ? <Outlet /> : <Navigate to={`/login?${searchParams.toString()}`} />;
};

export default ProtectedRoutes;
