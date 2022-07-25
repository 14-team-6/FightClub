import { UserActions } from '@frontend/src/actionCreators/user/actions';
import { PayloadAction } from '@frontend/src/actionCreators/models/action';
import { UserDTO } from '@frontend/src/services/types';

export function createSetUserAction(user: UserDTO | User): PayloadAction<UserActions, UserDTO | User> {
  return {
    type: UserActions.SET_USER,
    payload: user,
  };
}
