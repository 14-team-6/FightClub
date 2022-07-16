import { UserDTO, RequestError } from '@frontend/src/services/types';
import { transformToUser } from '@frontend/src/utils/apiTransformers';
import HttpTransport from '../../core/http-transport';
import { LoginFormData, RegisterFormData } from '../models/form';

class AuthService {
  private authService: HttpTransport;

  constructor(authService: HttpTransport) {
    this.authService = authService;
  }

  public isCookieInvalid(user: User | RequestError): user is RequestError {
    return !!(user as RequestError)?.reason;
  }

  public getUser = (): Promise<User | RequestError> => this.authService.get<UserDTO>('/user')
    .then((user: UserDTO) => transformToUser(user))
    .catch((reason) => Promise.reject(reason));

  private signInHandler = async (response: Response): Promise<User | RequestError> => {
    if (!response.ok) {
      return Promise.reject(await response.json());
    }

    return this.getUser();
  };

  public signIn = (userInfo: LoginFormData) => this.authService
    .post<LoginFormData, User | RequestError>('/auth/signin', {
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
    .post<RegisterFormData, User | RequestError>('/auth/signup', {
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
