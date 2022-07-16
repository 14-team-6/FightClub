import { RequestError } from '@frontend/src/services/types';
import { authService } from '@frontend/src/services/index';
import DefaultHttpTransport from '../../core/default-http-transport';
import HttpTransport from '../../core/http-transport';
import { EditProfileFormData } from '../models/form';

const USER_URL: string = 'https://ya-praktikum.tech/api/v2/user';

class UserService {
  private userService: HttpTransport;

  constructor(userService: HttpTransport) {
    this.userService = userService;
  }

  private userProfileHandler = async (response: Response): Promise<User | RequestError> => {
    if (!response.ok) {
      return Promise.reject(await response.json());
    }

    return authService.getUser();
  };

  public userProfile = (userInfo: EditProfileFormData) => this.userService
    .put<EditProfileFormData, User | RequestError>('/profile', {
    body: userInfo,
    handler: this.userProfileHandler,
  });
}

export default new UserService(new DefaultHttpTransport(USER_URL));
