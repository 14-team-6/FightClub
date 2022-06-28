import { PayloadAction } from '@frontend/src/actionCreators/models/action';
import { GameStateActions } from '@frontend/src/actionCreators/gameState/actions';
import { LIFE_LEVEL_ENEMY, LIFE_LEVEL_HERO } from '@frontend/consts/game';

export interface GameState {
  myLifePercent: number,
  enemyLifePercent: number,
  roundName: string,
}

const defaultState: GameState = {
  myLifePercent: 0,
  enemyLifePercent: 0,
  roundName: '',
};

type GameStateAction = PayloadAction<GameStateActions, GameState>;

export const gameStateReducer = (state: GameState, action: Partial<GameStateAction>): GameState => {
  if (state === undefined) {
    return defaultState;
  }
  if (action.payload === undefined) {
    return state;
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

export const setMyLifePercent = (myLifePercent: number): Partial<GameStateAction> => (
  {
    type: GameStateActions.UPDATE_MY_LIFE_PERCENT,
    payload: { ...defaultState, myLifePercent },
  }
);

export const setEnemyLifePercent = (enemyLifePercent: number): Partial<GameStateAction> => (
  {
    type: GameStateActions.UPDATE_ENEMY_LIFE_PERCENT,
    payload: { ...defaultState, enemyLifePercent },
  }
);

export const setRoundName = (roundName: string): Partial<GameStateAction> => (
  {
    type: GameStateActions.UPDATE_ROUND_NAME,
    payload: { ...defaultState, roundName },
  }
);
