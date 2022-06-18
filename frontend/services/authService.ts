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

  public signIn = (userInfo: LoginFormData) => {
    return this.authService
      .post<LoginFormData, string>('/signin', {
      body: userInfo,
      handler: ((response: Response) => {
        return response.text();
      }),
    });
  };

  public signUp = (userInfo: RegisterFormData) => {
    return this.authService
      .post<RegisterFormData, any>('/signup', { body: userInfo });
  };

  public signOut = () => {
    return this.authService
      .post<RegisterFormData, any>('/logout');
  };
}

export default new AuthService(new DefaultHttpTransport(AUTH_URL));
