import { GameStateActions } from '@frontend/src/actionCreators/gameState/actions';
import { GameState } from '@frontend/src/reducers/gameState';
import { PayloadAction } from '@frontend/src/actionCreators/models/action';

export function createUpdateMyLifePercent(gameState: GameState): PayloadAction<GameStateActions, GameState> {
  return {
    type: GameStateActions.UPDATE_MY_LIFE_PERCENT,
    payload: gameState,
  };
}
export function createUpdateEnemyLifePercent(gameState: GameState): PayloadAction<GameStateActions, GameState> {
  return {
    type: GameStateActions.UPDATE_ENEMY_LIFE_PERCENT,
    payload: gameState,
  };
}

export function createUpdateRoundName(gameState: GameState): PayloadAction<GameStateActions, GameState> {
  return {
    type: GameStateActions.UPDATE_ROUND_NAME,
    payload: gameState,
  };
}
