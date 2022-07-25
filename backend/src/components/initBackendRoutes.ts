import { Router } from 'express';
import { checkAuthMiddleware } from '@backend/src/middleware/checkAuth';
import { UserApi } from '@backend/src/controllers/user';
import { ThemesApi } from '@backend/src/controllers/themes';
import { ForumApi } from '@backend/src/controllers/forum';

export const initBackendRoutes = (router: Router): void => {
  const apiRouter = Router();
  // this middleware also sets userParsed (UserDTO type) prop into respond.locals
  // and makes it available for all api handlers
  apiRouter.use(checkAuthMiddleware);

  UserApi.initRoute(apiRouter);
  ThemesApi.initRoute(apiRouter);
  ForumApi.initRoute(apiRouter);

  router.use('/api/v1', apiRouter);
};
