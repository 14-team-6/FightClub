import DefaultHttpTransport from '@frontend/core/default-http-transport';
import HttpTransport from '@frontend/core/http-transport';
import { ThemeDTO, ThemeItem, RequestError } from '@frontend/src/services/types';
import { transformToTheme } from '@frontend/src/utils/apiTransformers';
// import { selectUserInfo } from '@frontend/src/selectors/user';
// import store from '@frontend/src/store/store';

class ThemeService {
  private readonly service: HttpTransport;

  constructor(httpTransport: HttpTransport) {
    this.service = httpTransport;
  }

  public getThemes = (): Promise<ThemeItem[] | RequestError> => this.service
    .get<ThemeDTO[]>('/available')
    .then((items: ThemeDTO[]) => items.map((theme: ThemeItem) => transformToTheme(theme)))
    .catch((reason) => Promise.reject(reason));

  public setTheme = (themeId: string) => themeId;
}

const THEMES_API_URL = '/api/v1/themes/';

const transport: HttpTransport = new DefaultHttpTransport(THEMES_API_URL);

export const themeService = new ThemeService(transport);
