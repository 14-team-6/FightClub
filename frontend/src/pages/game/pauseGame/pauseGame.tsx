import React, { FC } from 'react';
import { GameSplashLayout } from '@frontend/src/pages/game/layout/gameSplashLayout';
import NavList from '@frontend/src/components/navlist/navlist';
import StyledLink from '@frontend/src/components/link/link';
import ButtonElement from '@frontend/src/components/button/button';
import { GameHeader } from '@frontend/src/pages/game/components/gameHeader/gameHeader';

type PauseProps = {
  resumeCallback: Function;
};

export const PauseGame: FC<PauseProps> = ({ resumeCallback }) => {
  const onClick = (): void => {
    resumeCallback();
  };

  return (
    <GameSplashLayout>
      <GameHeader>PAUSED</GameHeader>
      <NavList>
        <li><ButtonElement onClick={onClick} type={'button'} text={'RESUME'}/></li>
        <li><StyledLink to="/">LEAVE GAME</StyledLink></li>
      </NavList>
    </GameSplashLayout>
  );
};
