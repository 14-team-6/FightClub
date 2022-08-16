import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  background-image: url(${({ theme }) => theme.background});
  background-repeat: no-repeat;
  background-size: cover;
`;

type MainLayoutProps = {
  children: JSX.Element | JSX.Element[],
};

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => (
  <Wrapper>
    {children}
  </Wrapper>
);

export default MainLayout;
