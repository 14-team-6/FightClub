import React, { FC } from 'react';
import {
  MAIN_BLUE,
  MAIN_YELLOW,
} from '@frontend/consts/styles';
import { GameSplashLayout } from '@frontend/src/pages/game/layout/gameSplashLayout';
import { StrokedText } from '@frontend/src/components/strokedText/strokedText';
import NavList from '@frontend/src/components/navlist/navlist';
import StyledLink from '@frontend/src/components/link/link';
import { GameHeader } from '@frontend/src/pages/game/components/gameHeader/gameHeader';

export enum EndGameType {
  'WIN' = 'You win!',
  'LOOSE' = 'You loose!',
}

type EndGameProps = {
  endGameType: EndGameType,
  roundName?: string,
  score?: number,
};

export const EndGame: FC<EndGameProps> = (props: EndGameProps) => {
  const score = props.score !== undefined
    ? <StrokedText fontSize={'30px'} textColor={MAIN_YELLOW} strokeColor={MAIN_BLUE}>
      Your score: {props.score}
    </StrokedText> : null;

  return (
    <GameSplashLayout>
      <GameHeader>{props.endGameType}</GameHeader>
      {score}
      <NavList>
        <li><StyledLink to="/">EXIT</StyledLink></li>
        <li><StyledLink to="/game/fight/newGame">REPLAY</StyledLink></li>
      </NavList>
    </GameSplashLayout>
  );
};
