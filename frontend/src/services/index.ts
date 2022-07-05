import DefaultHttpTransport from '@frontend/core/default-http-transport';
import HttpTransport from '@frontend/core/http-transport';
import AuthService from './authService';

const BASE_URL: string = 'https://ya-praktikum.tech/api/v2';

const transport: HttpTransport = new DefaultHttpTransport(BASE_URL);

export const authService = new AuthService(transport);
