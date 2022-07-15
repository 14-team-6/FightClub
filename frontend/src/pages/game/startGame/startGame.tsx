import React, { FC } from 'react';
import { GameSplashLayout } from '@frontend/src/pages/game/layout/gameSplashLayout';
import { GameHeader } from '@frontend/src/pages/game/components/gameHeader/gameHeader';

type StartGameProps = {
  roundName?: string,
};

export const StartGame: FC<StartGameProps> = (props) => (
  <GameSplashLayout>
    <GameHeader>{props.roundName}</GameHeader>
    <GameHeader>FIGHT!</GameHeader>
  </GameSplashLayout>
);
