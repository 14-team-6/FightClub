import { createSlice, configureStore } from '@reduxjs/toolkit';
import { LIFE_LEVEL_ENEMY, LIFE_LEVEL_HERO } from '@frontend/consts/game';

const initialState = {
  myLifePercent: 100,
  enemyLifePercent: 100,
  roundName: '',
};

const lifeBarStore = createSlice({
  name: 'lifeBar',
  initialState,
  reducers: {
    updateMyLifePercent: (state, action) => {
      const myLifePercent = (action.payload.payload * 100) / LIFE_LEVEL_HERO;
      return { ...state, myLifePercent };
    },
    updateEnemyLifePercent: (state, action) => {
      const enemyLifePercent = (action.payload.payload * 100) / LIFE_LEVEL_ENEMY;
      return { ...state, enemyLifePercent };
    },
    updateRoundName: (state, action) => (
      { ...state, roundName: action.payload.payload }
    ),
  },
});

export const { updateMyLifePercent, updateEnemyLifePercent, updateRoundName } = lifeBarStore.actions;
export const store = configureStore({
  reducer: lifeBarStore.reducer,
});
