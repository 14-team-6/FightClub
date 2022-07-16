import React from 'react';
import { Navigate, Outlet, useSearchParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsUserExists } from '@frontend/src/selectors/user';

const ProtectedRoutes = () => {
  const isUserExists: boolean = useSelector(selectIsUserExists);
  const [searchParams] = useSearchParams();
  return isUserExists ? <Outlet/> : <Navigate to={`/login?${searchParams.toString()}`}/>;
};

export default ProtectedRoutes;
