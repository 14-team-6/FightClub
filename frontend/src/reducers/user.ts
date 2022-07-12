import { UserActions } from '@frontend/src/actionCreators/user/actions';
import { PayloadAction } from '@frontend/src/actionCreators/models/action';

export interface User {
  id?: number,
  first_name?: string,
  second_name?: string,
  display_name?: string,
  login: string,
  email?: string,
  phone?: string,
  avatar?: string
}

const userDefaultState: User = {
  login: '',
};

type UserAction = PayloadAction<UserActions.SET_USER, User>;

// eslint-disable-next-line @typescript-eslint/default-param-last
function userReducer(state: User = userDefaultState, action: UserAction): User {
  switch (action.type) {
    case UserActions.SET_USER:
      return {
        ...action.payload,
      };
    default:
      return state;
  }
}

export default userReducer;
