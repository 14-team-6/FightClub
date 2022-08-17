import { RootState } from '@frontend/src/store/store';
import { createSelector } from 'reselect';

export const selectThemeData = createSelector((state: RootState) => state.theme, (theme: ThemeData): ThemeData => theme);
