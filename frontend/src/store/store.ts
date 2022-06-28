import { applyMiddleware, combineReducers, createStore } from 'redux';
import userReducer, { User } from '@frontend/src/reducers/user';
import thunk from 'redux-thunk';
import { composeWithDevToolsLogOnlyInProduction } from '@redux-devtools/extension';

export interface RootState {
  user: User
}

const composeEnhancers = composeWithDevToolsLogOnlyInProduction({});

const store = createStore<RootState, any, any, any>(
  combineReducers({
    user: userReducer,
  }),
  composeEnhancers(applyMiddleware(thunk)),
);

export default store;
