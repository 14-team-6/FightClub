import { GameStateActions } from '@frontend/src/actionCreators/gameState/actions';
import { defaultGameState, GameStateAction } from '@frontend/src/reducers/gameState';

export const setMyLifePercent = (myLifePercent: number): GameStateAction => (
  {
    type: GameStateActions.UPDATE_MY_LIFE_PERCENT,
    payload: { ...defaultGameState, myLifePercent },
  }
);

export const setEnemyLifePercent = (enemyLifePercent: number): GameStateAction => (
  {
    type: GameStateActions.UPDATE_ENEMY_LIFE_PERCENT,
    payload: { ...defaultGameState, enemyLifePercent },
  }
);

export const setRoundName = (roundName: string): GameStateAction => (
  {
    type: GameStateActions.UPDATE_ROUND_NAME,
    payload: { ...defaultGameState, roundName },
  }
);
