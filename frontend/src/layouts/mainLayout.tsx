import React from 'react';
import styled from 'styled-components';
import { MAIN_BACKGROUND } from '../../consts/styles';

const Wrapper = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  background-image: url(${MAIN_BACKGROUND});
  background-repeat: no-repeat;
  background-size: cover;
`;

type MainLayoutProps = {
  children: JSX.Element,
};

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <Wrapper>
      {children}
    </Wrapper>
  );
};

export default MainLayout;
