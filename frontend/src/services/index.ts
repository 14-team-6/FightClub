import DefaultHttpTransport from '@frontend/core/default-http-transport';
import HttpTransport from '@frontend/core/http-transport';
import { ForumService } from '@frontend/src/services/forum';
import AuthService from './authService';

const BASE_URL: string = 'https://ya-praktikum.tech/api/v2';
const FORUM_BASE_URL: string = '/api/v1/forum';

const authTransport: HttpTransport = new DefaultHttpTransport(BASE_URL);
const forumTransport: HttpTransport = new DefaultHttpTransport(FORUM_BASE_URL);

export const authService = new AuthService(authTransport);
export const forumService = new ForumService(forumTransport);
