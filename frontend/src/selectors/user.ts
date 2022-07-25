import { RootState } from '@frontend/src/store/store';
import { createSelector } from 'reselect';

export const selectUserInfo = createSelector((state: RootState) => state.user, (user: User): User => user);

export const selectIsUserExists = createSelector(selectUserInfo, (user: User): boolean => !!user.id);
