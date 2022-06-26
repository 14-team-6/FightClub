import { RequestError } from '@frontend/src/services/types';
import DefaultHttpTransport from '../../core/default-http-transport';
import HttpTransport from '../../core/http-transport';
import { EditProfileFormData } from '../models/form';
import AuthService from './authService';

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

    return AuthService.getUser();
  };

  public userProfile = (userInfo: EditProfileFormData) => this.userService
    .put<EditProfileFormData, User | RequestError>('/profile', {
    body: userInfo,
    handler: this.userProfileHandler,
  });
}

export default new UserService(new DefaultHttpTransport(USER_URL));
