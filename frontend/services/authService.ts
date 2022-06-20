import DefaultHttpTransport from '../core/default-http-transport';
import HttpTransport from '../core/http-transport';
import { LoginFormData, RegisterFormData } from '../src/models/form';

const AUTH_URL: string = 'https://ya-praktikum.tech/api/v2/auth';

export interface AuthError {
  reason: string;
}

export interface SuccessSignUp {
  id: string;
}

class AuthService {
  private authService: HttpTransport;

  constructor(authService: HttpTransport) {
    this.authService = authService;
  }

  private async signInHandler(response: Response): Promise<string | AuthError> {
    if (response.ok) {
      return response.text();
    }

    return Promise.reject(await response.json());
  }

  private async signUpHandler(response: Response): Promise<SuccessSignUp | AuthError> {
    if (response.ok) {
      return response.json();
    }

    return Promise.reject(await response.json());
  }

  public signIn = (userInfo: LoginFormData) => {
    return this.authService
      .post<LoginFormData, string | AuthError>('/signin', {
      body: userInfo,
      handler: this.signInHandler,
    });
  };

  public signUp = (userInfo: RegisterFormData) => {
    return this.authService
      .post<RegisterFormData, SuccessSignUp | AuthError>('/signup', {
      body: userInfo,
      handler: this.signUpHandler,
    });
  };

  public signOut = () => {
    return this.authService
      .post<RegisterFormData, any>('/logout');
  };
}

export default new AuthService(new DefaultHttpTransport(AUTH_URL));
