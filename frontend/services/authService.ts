import HttpTransport from '../core/http-transport';
import HttpTransportAbstractClass from '../core/http-transport-abstract-class';
import { LoginFormData, RegisterFormData } from '../src/models/form';

export interface AuthError {
  reason: string;
}

class AuthService {
  private authService: HttpTransportAbstractClass;

  constructor(authService: HttpTransportAbstractClass) {
    this.authService = authService;
  }

  public signIn = (userInfo: LoginFormData) => {
    return this.authService
      .post<LoginFormData>('/signin', { body: userInfo });
  };

  public signUp = (userInfo: RegisterFormData) => {
    return this.authService
      .post<RegisterFormData>('/signup', { body: userInfo });
  };

  public signOut = () => {
    return this.authService
      .post<RegisterFormData>('/logout', {});
  };
}

export default new AuthService(new HttpTransport('/auth'));
