import HttpTransport from '../core/http-transport';
import HttpTransportAbstractClass from '../core/http-transport-abstract-class';
import { RegisterFormData } from '../src/models/form';

class AuthService {
  private authService: HttpTransportAbstractClass;

  constructor(authService: HttpTransportAbstractClass) {
    this.authService = authService;
  }

  public signIn = () => {

  };

  public signUp = (userInfo: RegisterFormData) => {
    return this.authService
      .post<RegisterFormData>('/signup', { body: userInfo });
  };

  public signOut = () => {

  };
}

export default new AuthService(new HttpTransport('/auth'));
