import { applyMiddleware, combineReducers, createStore } from 'redux';
import userReducer from '@frontend/src/reducers/user';
import thunk from 'redux-thunk';
import { composeWithDevToolsLogOnlyInProduction } from '@redux-devtools/extension';
import { GameState, gameStateReducer } from '@frontend/src/reducers/gameState';

export interface RootState {
  user: User,
  gameState: GameState,
}

const composeEnhancers = composeWithDevToolsLogOnlyInProduction({});

let state = {};
if (typeof window === 'object') {
  state = window.__PRELOADED_STATE__ !== undefined ? JSON.parse(decodeURI(window.__PRELOADED_STATE__)) : {};
  delete window.__PRELOADED_STATE__;
} else {
  state = {};
}

export const withCreateStore = () => createStore<RootState, any, any, any>(
  combineReducers({
    user: userReducer,
    gameState: gameStateReducer,
  }),
  state,
  composeEnhancers(applyMiddleware(thunk)),
);

export default withCreateStore();
