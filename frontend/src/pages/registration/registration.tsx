import React from 'react';
import MainTitle from '../../components/mainTitle/mainTitle';
import { Wrapper } from '../login/login';
import RegisterPageForm from '../../components/registerPageForm/registerPageForm';

const RegistrationPage: React.FC = () => {
  return (
    <Wrapper>
      <MainTitle/>
      <RegisterPageForm/>
    </Wrapper>
  );
};

export default RegistrationPage;
