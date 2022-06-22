import { UserDTO } from '@frontend/src/services/types';
import { transformToUser } from '@frontend/src/utils/apiTransformers';
import DefaultHttpTransport from '../../core/default-http-transport';
import HttpTransport from '../../core/http-transport';
import { LoginFormData, RegisterFormData } from '../models/form';

const AUTH_URL: string = 'https://ya-praktikum.tech/api/v2/auth';

export interface AuthError {
  reason: string;
}

class AuthService {
  private authService: HttpTransport;

  constructor(authService: HttpTransport) {
    this.authService = authService;
  }

  public getUser = () => this.authService.get<UserDTO>('/user');

  private signInHandler = async (response: Response): Promise<User | AuthError> => {
    if (!response.ok) {
      return Promise.reject(await response.json());
    }

    return this.getUser()
      .then((user: UserDTO) => transformToUser(user))
      .catch((reason) => Promise.reject(reason));
  };

  public signIn = (userInfo: LoginFormData) => this.authService
    .post<LoginFormData, User | AuthError>('/signin', {
    body: userInfo,
    handler: this.signInHandler,
  });

  private signUpHandler = async (response: Response): Promise<User | AuthError> => {
    if (!response.ok) {
      return Promise.reject(await response.json());
    }

    return this.getUser()
      .then((user: UserDTO) => transformToUser(user))
      .catch((reason) => Promise.reject(reason));
  };

  public signUp = (userInfo: RegisterFormData) => this.authService
    .post<RegisterFormData, User | AuthError>('/signup', {
    body: userInfo,
    handler: this.signUpHandler,
  });

  private signOutHandler = async (response: Response) => {
    if (!response.ok) {
      return Promise.reject(await response.json());
    }
    return response;
  };

  public signOut = () => this.authService
    .post<RegisterFormData, any>('/logout', {
    handler: this.signOutHandler,
  });
}

export default new AuthService(new DefaultHttpTransport(AUTH_URL));
