import { RootState } from '@frontend/src/store/store';
import { User } from '@frontend/src/reducers/user';
import { createSelector } from 'reselect';

export const selectUserInfo = (state: RootState): User => state.user;

export const selectIsUserExists = createSelector(selectUserInfo, (user: User): boolean => !!user.id);
