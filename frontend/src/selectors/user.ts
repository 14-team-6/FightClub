import { RootState } from '@frontend/src/store/store';

export const selectUserInfo = (state: RootState) => state.user;
