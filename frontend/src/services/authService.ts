import { UserDTO } from '@frontend/src/services/types';
import { transformToUser } from '@frontend/src/utils/apiTransformers';
import HttpTransport from '../../core/http-transport';
import { LoginFormData, RegisterFormData } from '../models/form';

export interface AuthError {
  reason: string;
}

class AuthService {
  private authService: HttpTransport;

  constructor(authService: HttpTransport) {
    this.authService = authService;
  }

  public isCookieInvalid(userDTO: UserDTO | AuthError): userDTO is AuthError {
    return !!(userDTO as AuthError)?.reason;
  }

  public getUser = () => this.authService.get<UserDTO | AuthError>('/auth/user');

  private signInHandler = async (response: Response): Promise<User | AuthError> => {
    if (!response.ok) {
      return Promise.reject(await response.json());
    }

    return this.getUser()
      .then((user: UserDTO) => transformToUser(user))
      .catch((reason) => Promise.reject(reason));
  };

  public signIn = (userInfo: LoginFormData) => this.authService
    .post<LoginFormData, User | AuthError>('/auth/signin', {
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
    .post<RegisterFormData, User | AuthError>('/auth/signup', {
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
    .post<RegisterFormData, any>('/auth/logout', {
    handler: this.signOutHandler,
  });
}

export default AuthService;
