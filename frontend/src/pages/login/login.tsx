import React from 'react';
import styled from 'styled-components';
import MainTitle from '../../components/mainTitle/mainTitle';
import LoginPageForm from '../../components/loginPageForm/loginPageForm';

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

const LoginPage: React.FC = () => {
  return (
    <Wrapper>
      <MainTitle/>
      <LoginPageForm/>
    </Wrapper>
  );
};

export default LoginPage;
