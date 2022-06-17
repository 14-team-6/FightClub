import React, { FC } from 'react';
import styled from 'styled-components';
import MainLayout from '@frontend/src/layouts/mainLayout';
import MainTitle from '@frontend/src/components/mainTitle/mainTitle';
import StyledLink from '@frontend/src/components/link/link';
import ButtonElement from '@frontend/src/components/button/button';
import Kitten from '@frontend/src/components/kitten/kitten';
import { KITTEN_HEIGHT, KITTEN_WIDTH } from '@frontend/consts/styles';

const Wrapper = styled.div`
  display: flex;
  height: 100vh;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const WrapperContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const NavList = styled.ul`
  margin: 30px 0;
`;

const NavItem = styled.li`
  margin: 0;
  padding: 0;
  list-style: none;
`;

const WrapperTitle = styled.div`
  position: relative;
  margin-top: ${1.5 * KITTEN_HEIGHT}px;

  .kitten {
    position: absolute;
  }
  
  .left {
    top: -${1.5 * KITTEN_HEIGHT}px;
    left: ${0.5 * KITTEN_WIDTH}px;
  } 
  
  .right {
    position: absolute;
    top: -${KITTEN_HEIGHT}px;
    right: ${0.5 * KITTEN_WIDTH}px;
  } 
`;

const MainPage: FC = () => {
  return (
    <MainLayout>
      <Wrapper>
        <WrapperContent>
          <WrapperTitle>
            <Kitten direction="right" sprite={1} width={KITTEN_WIDTH} height={KITTEN_HEIGHT} className="kitten left" />
            <Kitten direction="left" sprite={4} width={KITTEN_WIDTH} height={KITTEN_HEIGHT} className="kitten right" />
            <MainTitle/>
          </WrapperTitle>
          <NavList>
            <NavItem><StyledLink to="/game/loading">Start</StyledLink></NavItem>
            <NavItem><StyledLink to="#">Options</StyledLink></NavItem>
            <NavItem><StyledLink to="/results">Leaders</StyledLink></NavItem>
            <NavItem><StyledLink to="/topics">Forum</StyledLink></NavItem>
            <NavItem><ButtonElement type="button" text="Logout"/></NavItem>
          </NavList>
        </WrapperContent>
      </Wrapper>
    </MainLayout>
  );
};

export default MainPage;
