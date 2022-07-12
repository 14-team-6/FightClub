import { UserDTO } from '@frontend/src/services/types';
import { transformToUser } from '@frontend/src/utils/apiTransformers';
import DefaultHttpTransport from '../../core/default-http-transport';
import HttpTransport from '../../core/http-transport';
import { LoginFormData, RegisterFormData } from '../models/form';

const AUTH_URL: string = 'https://ya-praktikum.tech/api/v2';
/* eslint-disable */
/// #if DEBUG
// @ts-ignore
export const REDIRECT_URL = 'http://localhost:9000';
/// #else
// @ts-ignore
export const REDIRECT_URL = 'https://fightclub-vegas.herokuapp.com';
/// #endif
/* eslint-enable */

export interface AuthError {
  reason: string;
}

class AuthService {
  private authService: HttpTransport;

  constructor(authService: HttpTransport) {
    this.authService = authService;
  }

  public getUser = () => this.authService.get<UserDTO>('/auth/user');

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

  public async makeOAuthRedirectUrl(): Promise<string> {
    const serviceId = await this.authService.get(`/oauth/yandex/service-id?redirect_uri=${REDIRECT_URL}`)
      .then((response: { service_id: string }) => response.service_id);
    return `https://oauth.yandex.ru/authorize?response_type=code&client_id=${serviceId}&redirect_uri=${REDIRECT_URL}`;
  }

  public finalizeOAuth(code: string | null, redirect_uri: string): Promise<User | AuthError> {
    if (code === null) {
      // eslint-disable-next-line prefer-promise-reject-errors
      return Promise.reject({ reason: 'Empty oauth code' });
    }
    return this.authService.post('/oauth/yandex', {
      body: {
        code,
        redirect_uri,
      },
      handler: this.signUpHandler,
    });
  }
}

export default new AuthService(new DefaultHttpTransport(AUTH_URL));
