import { RootState } from '@frontend/src/store/store';
import { User } from '@frontend/src/reducers/user';

export const selectUserInfo = (state: RootState): User => state.user;
