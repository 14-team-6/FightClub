import { UserActions } from '@frontend/src/actionCreators/user/actions';
import { User } from '@frontend/src/reducers/user';
import { PayloadAction } from '@frontend/src/actionCreators/models/action';

export function createSetUserAction(user: User): PayloadAction<UserActions, User> {
  return {
    type: UserActions.SET_USER,
    payload: user,
  };
}
