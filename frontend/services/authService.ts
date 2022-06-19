import DefaultHttpTransport from '../core/default-http-transport';
import HttpTransport from '../core/http-transport';
import { LoginFormData, RegisterFormData } from '../src/models/form';

const AUTH_URL: string = 'https://ya-praktikum.tech/api/v2/auth';

export interface AuthError {
  reason: string;
}

class AuthService {
  private authService: HttpTransport;

  constructor(authService: HttpTransport) {
    this.authService = authService;
  }

  private async authHandler(response: Response): Promise<string | AuthError> {
    if (response.ok) {
      return response.text();
    }

    const authError: AuthError = await response.json();

    return Promise.reject(authError);
  }

  public signIn = (userInfo: LoginFormData) => {
    return this.authService
      .post<LoginFormData, string | AuthError>('/signin', {
      body: userInfo,
      handler: this.authHandler,
    });
  };

  public signUp = (userInfo: RegisterFormData) => {
    return this.authService
      .post<RegisterFormData, any>('/signup', {
      body: userInfo,
      handler: this.authHandler,
    });
  };

  public signOut = () => {
    return this.authService
      .post<RegisterFormData, any>('/logout');
  };
}

export default new AuthService(new DefaultHttpTransport(AUTH_URL));
