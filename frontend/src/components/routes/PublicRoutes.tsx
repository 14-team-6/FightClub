import React from 'react';

import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsUserExists } from '@frontend/src/selectors/user';

const PublicRoutes = () => {
  const isUserExists: boolean = useSelector(selectIsUserExists);

  return isUserExists ? <Navigate to="/" /> : <Outlet />;
};

export default PublicRoutes;
