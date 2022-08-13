import DefaultHttpTransport from '@frontend/core/default-http-transport';
import HttpTransport from '@frontend/core/http-transport';
import {
  ThemeDTO, ThemeDataDTO, ThemeItem, RequestError,
} from '@frontend/src/services/types';
import { transformToTheme, transformToThemeData } from '@frontend/src/utils/apiTransformers';

class ThemeService {
  private readonly service: HttpTransport;

  constructor(httpTransport: HttpTransport) {
    this.service = httpTransport;
  }

  public getThemes = (): Promise<ThemeItem[] | RequestError> => this.service
    .get<ThemeDTO[]>('/available')
    .then((items: ThemeDTO[]) => items.map((theme: ThemeItem) => transformToTheme(theme)))
    .catch((reason) => Promise.reject(reason));

  public setTheme = (themeId: string, isUserExists: boolean): Promise<ThemeData | {} | RequestError> => this.service
    .get(`/${themeId}`)
    .then((themeData: ThemeDataDTO) => {
      if (isUserExists) {
        this.service.post('/linkToUser', {
          body: { themeId },
        });
      }
      return transformToThemeData(themeData);
    })
    .catch((reason) => Promise.reject(reason));

  public getTheme = (): Promise<ThemeData | {} | RequestError> => this.service
    .get('')
    .then((themeData: ThemeDataDTO[]) => transformToThemeData(themeData[0]))
    .catch((reason) => Promise.reject(reason));
}

const THEMES_API_URL = '/api/v1/themes/';

const transport: HttpTransport = new DefaultHttpTransport(THEMES_API_URL);

export const themeService = new ThemeService(transport);
