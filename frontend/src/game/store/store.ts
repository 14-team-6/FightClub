import { createSlice, configureStore } from '@reduxjs/toolkit';

const initialState = {
  myLifePercent: 100,
  enemyLifePercent: 100,
};

const lifeBarStore = createSlice({
  name: 'lifeBar',
  initialState,
  reducers: {
    updateMyLifePercent: (state, action) => {
      state.myLifePercent = action.payload.payload;
    },
    updateEnemyLifePercent: (state, action) => {
      state.enemyLifePercent = action.payload.payload;
    },
  },
});

export const { updateMyLifePercent, updateEnemyLifePercent } = lifeBarStore.actions;
export const store = configureStore({
  reducer: lifeBarStore.reducer,
});
