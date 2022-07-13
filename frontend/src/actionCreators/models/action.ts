import { Action } from 'redux';

export interface PayloadAction<R, T> extends Action<R> {
  payload: T,
}
