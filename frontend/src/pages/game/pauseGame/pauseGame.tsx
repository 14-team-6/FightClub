import React, { FC } from 'react';
import { GameSplashLayout } from '@frontend/src/pages/game/gameSplashLayout/gameSplashLayout';
import NavList from '@frontend/src/components/navlist/navlist';
import StyledLink from '@frontend/src/components/link/link';
import ButtonElement from '@frontend/src/components/button/button';
import { StrokedText } from '@frontend/src/components/strokedText/strokedText';
import { MAIN_RED, MAIN_YELLOW } from '@frontend/consts/styles';

type PauseProps = {
  resumeCallback: Function;
};

export const PauseGame: FC<PauseProps> = ({ resumeCallback }) => {
  const onClick = () => {
    resumeCallback();
  };

  return (
    <GameSplashLayout>
      <StrokedText fontSize={'100px'} textColor={MAIN_RED} strokeColor={MAIN_YELLOW}>PAUSED</StrokedText>
      <NavList>
        <li><ButtonElement onClick={onClick} type={'button'} text={'RESUME'}/></li>
        <li><StyledLink to="/">LEAVE GAME</StyledLink></li>
      </NavList>
    </GameSplashLayout>
  );
};
