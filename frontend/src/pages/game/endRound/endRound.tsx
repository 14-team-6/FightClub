import React, { FC } from 'react';
import {
  MAIN_RED,
  MAIN_YELLOW,
} from '@frontend/consts/styles';
import { GameSplashLayout } from '@frontend/src/pages/game/layout/gameSplashLayout';
import { EndGameType } from '@frontend/src/pages/game/endGame/endGame';
import { StrokedText } from '../../../components/strokedText/strokedText';

type EndRoundProps = {
  endGameType: EndGameType,
};

export const EndRound: FC<EndRoundProps> = (props) => (
  <GameSplashLayout>
    <StrokedText fontSize={'140px'} textColor={MAIN_RED} strokeColor={MAIN_YELLOW}>
      {props.endGameType}
    </StrokedText>
  </GameSplashLayout>
);
