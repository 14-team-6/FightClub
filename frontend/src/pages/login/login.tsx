import React from 'react';
import styled from 'styled-components';
import NavList from '@frontend/src/components/navlist/navlist';
import StyledLink from '@frontend/src/components/link/link';
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

const LoginPage: React.FC = () => (
  <Wrapper>
    <MainTitle />
    <LoginPageForm />
    <NavList>
      <li><StyledLink to="/options">Options</StyledLink></li>
    </NavList>
  </Wrapper>
);

export default LoginPage;
