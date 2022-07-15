import { UserDTO, RequestError } from '@frontend/src/services/types';
import { transformToUser } from '@frontend/src/utils/apiTransformers';
import DefaultHttpTransport from '../../core/default-http-transport';
import HttpTransport from '../../core/http-transport';
import { LoginFormData, RegisterFormData } from '../models/form';

const AUTH_URL: string = 'https://ya-praktikum.tech/api/v2/auth';

class AuthService {
  private authService: HttpTransport;

  constructor(authService: HttpTransport) {
    this.authService = authService;
  }

  public getUser = () => this.authService.get<UserDTO>('/user')
    .then((user: UserDTO) => transformToUser(user))
    .catch((reason) => Promise.reject(reason));

  private signInHandler = async (response: Response): Promise<User | RequestError> => {
    if (!response.ok) {
      return Promise.reject(await response.json());
    }

    return this.getUser();
  };

  public signIn = (userInfo: LoginFormData) => this.authService
    .post<LoginFormData, User | RequestError>('/signin', {
    body: userInfo,
    handler: this.signInHandler,
  });

  private signUpHandler = async (response: Response): Promise<User | RequestError> => {
    if (!response.ok) {
      return Promise.reject(await response.json());
    }

    return this.getUser();
  };

  public signUp = (userInfo: RegisterFormData) => this.authService
    .post<RegisterFormData, User | RequestError>('/signup', {
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
