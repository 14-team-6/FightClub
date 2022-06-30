import { PayloadAction } from '@frontend/src/actionCreators/models/action';
import { GameStateActions } from '@frontend/src/actionCreators/gameState/actions';
import { LIFE_LEVEL_ENEMY, LIFE_LEVEL_HERO } from '@frontend/consts/game';

export interface GameState {
  myLifePercent: number,
  enemyLifePercent: number,
  roundName: string,
}

export const defaultGameState: GameState = {
  myLifePercent: 0,
  enemyLifePercent: 0,
  roundName: '',
};

export type GameStateAction = PayloadAction<GameStateActions, GameState>;

export const gameStateReducer = (state: GameState, action: GameStateAction): GameState => {
  if (state === undefined) {
    return defaultGameState;
  }
  switch (action.type) {
    case GameStateActions.UPDATE_MY_LIFE_PERCENT:
      if (action.payload.myLifePercent !== undefined) {
        const myLifePercent = (action.payload.myLifePercent * 100) / LIFE_LEVEL_HERO;
        return { ...state, myLifePercent };
      }
      return state;
    case GameStateActions.UPDATE_ENEMY_LIFE_PERCENT:
      if (action.payload.enemyLifePercent !== undefined) {
        const enemyLifePercent = (action.payload.enemyLifePercent * 100) / LIFE_LEVEL_ENEMY;
        return { ...state, enemyLifePercent };
      }
      return state;
    case GameStateActions.UPDATE_ROUND_NAME:
      if (action.payload.roundName !== undefined) {
        return { ...state, roundName: action.payload.roundName };
      }
      return state;
    default:
      return state;
  }
};
