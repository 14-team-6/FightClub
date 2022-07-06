import React, { FC } from 'react';
import { GameSplashLayout } from '@frontend/src/pages/game/layout/gameSplashLayout';
import { EndGameType } from '@frontend/src/pages/game/endGame/endGame';
import { GameHeader } from '@frontend/src/pages/game/components/gameHeader/gameHeader';

type EndRoundProps = {
  endGameType: EndGameType,
};

export const EndRound: FC<EndRoundProps> = (props) => (
  <GameSplashLayout>
    <GameHeader>{props.endGameType}</GameHeader>
  </GameSplashLayout>
);
