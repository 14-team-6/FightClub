import React from 'react';
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsUserExists } from '@frontend/src/selectors/user';
import LoginPage from '@frontend/src/pages/login/login';
import MainLayout from '@frontend/src/layouts/mainLayout';

const ProtectedRoutes = () => {
  const isUserExists: boolean = useSelector(selectIsUserExists);
  return <Outlet/>;
  return isUserExists ? <Outlet/> : <MainLayout><LoginPage/></MainLayout>;
};

export default ProtectedRoutes;
