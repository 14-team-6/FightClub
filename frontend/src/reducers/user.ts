import { UserActions } from '@frontend/src/actionCreators/user/actions';
import { PayloadAction } from '@frontend/src/actionCreators/models/action';
import { transformToUser } from '@frontend/src/utils/apiTransformers';
import { UserDTO } from '@frontend/src/services/types';

export const userDefaultState: UserDTO = {
  id: 0,
  login: '',
  first_name: '',
  second_name: '',
  display_name: '',
  avatar: '',
  phone: '',
  email: '',
};

type UserAction = PayloadAction<UserActions.SET_USER, UserDTO | User>;

// eslint-disable-next-line @typescript-eslint/default-param-last
function userReducer(state: User = transformToUser(userDefaultState), action: UserAction): User {
  switch (action.type) {
    case UserActions.SET_USER:
      return {
        ...transformToUser(action.payload),
      };
    default:
      return state;
  }
}

export default userReducer;
