import React from 'react';
import MainTitle from '../../components/main-title/main-title';
import { Wrapper } from '../login/login';
import RegisterPageForm from '../../components/register-page-form/register-page-form';

const RegistrationPage: React.FC = () => {
  return (
    <Wrapper>
      <MainTitle/>
      <RegisterPageForm/>
    </Wrapper>
  );
};

export default RegistrationPage;
