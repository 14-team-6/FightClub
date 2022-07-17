import { UserDTO, RequestError } from '@frontend/src/services/types';
import { transformToUser } from '@frontend/src/utils/apiTransformers';
import { OAUTH_URL, REDIRECT_URL } from '@frontend/consts/app';
import HttpTransport from '../../core/http-transport';
import { LoginFormData, RegisterFormData } from '../models/form';

class AuthService {
  private authService: HttpTransport;

  constructor(authService: HttpTransport) {
    this.authService = authService;
  }

  public isCookieInvalid(user: User): boolean {
    return user.id === undefined;
  }

  public getUser = (): Promise<User | RequestError> => this.authService.get<UserDTO>('/auth/user')
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

  public async makeOAuthRedirectUrl(): Promise<string> {
    const serviceId = await this.authService.get(`/oauth/yandex/service-id?redirect_uri=${REDIRECT_URL}`)
      .then((response: { service_id: string }) => response.service_id);
    const url = new URL(OAUTH_URL);
    url.searchParams.append('response_type', 'code');
    url.searchParams.append('client_id', serviceId);
    url.searchParams.append('redirect_uri', REDIRECT_URL);

    return url.href;
  }

  public finalizeOAuth(code: string | null, redirect_uri: string): Promise<User | RequestError> {
    if (!code) {
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

export default AuthService;
