import React from 'react';

import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsUserExists } from '@frontend/src/selectors/user';

const ProtectedRoutes = () => {
  const isUserExists: boolean = useSelector(selectIsUserExists);

  return isUserExists ? <Outlet/> : <Navigate to="/login"/>;
};

export default ProtectedRoutes;
