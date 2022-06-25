import React, { FC } from 'react';
import {
  MAIN_RED,
  MAIN_YELLOW,
} from '@frontend/consts/styles';
import { GameSplashLayout } from '@frontend/src/pages/game/gameSplashLayout/gameSplashLayout';
import { StrokedText } from '../../../components/strokedText/strokedText';

type StartGameProps = {
  roundName?: string,
};

export const StartGame: FC<StartGameProps> = (props) => (
  <GameSplashLayout>
    <StrokedText fontSize={'140px'} textColor={MAIN_RED} strokeColor={MAIN_YELLOW}>
      {props.roundName}
    </StrokedText>
    <StrokedText fontSize={'140px'} textColor={MAIN_RED} strokeColor={MAIN_YELLOW}>
      FIGHT!
    </StrokedText>
  </GameSplashLayout>
);
