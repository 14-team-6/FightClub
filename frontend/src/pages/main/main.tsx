import React, { FC } from 'react';
import styled from 'styled-components';
import { useAuth } from '@frontend/src/hooks/useAuth';
import MainLayout from '@frontend/src/layouts/mainLayout';
import MainTitle from '@frontend/src/components/mainTitle/mainTitle';
import NavList from '@frontend/src/components/navlist/navlist';
import StyledLink from '@frontend/src/components/link/link';
import ButtonElement from '@frontend/src/components/button/button';
import Kitten from '@frontend/src/components/kitten/kitten';
import { KITTEN_HEIGHT, KITTEN_WIDTH } from '@frontend/consts/styles';
import { authService } from '@frontend/src/services';

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
  const auth = useAuth();

  const handleLogout = () => {
    authService.signOut()
      .then(auth.logout);
  };

  return (
    <MainLayout>
      <Wrapper>
        <WrapperContent>
          <WrapperTitle>
            <Kitten direction="right" sprite={1} width={KITTEN_WIDTH} height={KITTEN_HEIGHT} className="kitten left" />
            <Kitten direction="left" sprite={4} width={KITTEN_WIDTH} height={KITTEN_HEIGHT} className="kitten right" />
            <MainTitle />
          </WrapperTitle>
          <div>
            <NavList>
              <li><StyledLink to="/game/fight">Start</StyledLink></li>
              <li><StyledLink to="#">Options</StyledLink></li>
              <li><StyledLink to="/results">Leaders</StyledLink></li>
              <li><StyledLink to="/topics">Forum</StyledLink></li>
              <li><StyledLink to="/profile">Profile</StyledLink></li>
            </NavList>
            <ButtonElement data-cy="logout" type="button" text="Logout" onClick={handleLogout} />
          </div>
        </WrapperContent>
      </Wrapper>
    </MainLayout>
  );
};

export default MainPage;
