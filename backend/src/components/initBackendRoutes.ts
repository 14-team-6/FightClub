import { Router } from 'express';
import { UserApi } from '@backend/src/controllers/user';
import { ThemesApi } from '@backend/src/controllers/themes';
import { ForumApi } from '@backend/src/controllers/forum';

export const initBackendRoutes = (router: Router): void => {
  const apiRouter = Router();

  UserApi.initRoute(apiRouter);
  ThemesApi.initRoute(apiRouter);
  ForumApi.initRoute(apiRouter);

  router.use('/api/v1', apiRouter);
};
