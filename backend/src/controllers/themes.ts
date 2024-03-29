import { Request, Response, Router } from 'express';
import { checkPrivileges } from '@backend/src/middleware/checkPrivileges';
import { ThemesService } from '@backend/src/services/themes';
import { checkAuthMiddleware } from '@backend/src/middleware/checkAuth';

export class ThemesApi {
  public static initRoute(router: Router) {
    const themesRoute = Router();
    themesRoute
      .get('/', checkAuthMiddleware, ThemesApi.get)
      .get('/available', ThemesApi.getAvailable)
      .get('/:themeId(\\d+)', ThemesApi.getData)
      .post('/markAsActive', checkAuthMiddleware, ThemesApi.markAsActive)
      .post('/', checkAuthMiddleware, checkPrivileges, ThemesApi.create)
      .post('/linkToUser', checkAuthMiddleware, ThemesApi.linkToLoggedUser)
      .put('/', checkAuthMiddleware, ThemesApi.update);
    router.use('/themes', themesRoute);
  }

  public static async get(_req: Request, res: Response) {
    const userLogin = res.locals.userParsed.login;
    const themesService = new ThemesService();
    res.status(200);
    res.send(await themesService.getUserThemes(userLogin));
  }

  public static async getData(_req: Request, res: Response) {
    const themesService = new ThemesService();
    const theme = await themesService.getThemeData(parseInt(_req.params.themeId, 10));
    res.status(200);
    if (!theme) {
      res.send(JSON.stringify(null));
    } else {
      res.send(theme);
    }
  }

  public static async getAvailable(_req: Request, res: Response) {
    const themesService = new ThemesService();
    res.status(200);
    res.send(await themesService.get());
  }

  public static async create(req: Request, res: Response) {
    const themesService = new ThemesService();
    try {
      const { body } = req;
      await themesService.create(body);
      res.status(200);
      res.send(JSON.stringify({ result: 'OK' }));
    } catch (e) {
      res.status(500);
      res.send(JSON.stringify({ result: `create themes error: ${e}` }));
    }
  }

  public static async update(req: Request, res: Response) {
    const themesService = new ThemesService();
    try {
      const { body } = req;
      await themesService.update(body.themeId, body.themeData);
      res.status(200);
      res.send(JSON.stringify({ result: 'OK' }));
    } catch (e) {
      res.status(500);
      res.send(JSON.stringify({ result: `update theme error: ${e}` }));
    }
  }

  public static async markAsActive(req: Request, res: Response) {
    const themesService = new ThemesService();
    const userLogged = res.locals.userParsed.login;
    try {
      const { body } = req;
      await themesService.markAsActive(userLogged, body.themeId);
      res.status(200);
      res.send(JSON.stringify({ result: 'OK' }));
    } catch (e) {
      res.status(500);
      res.send(JSON.stringify({ result: `update theme error: ${e}` }));
    }
  }

  public static async linkToLoggedUser(req: Request, res: Response) {
    const themesService = new ThemesService();
    const userLogged = res.locals.userParsed.login;
    try {
      const { body } = req;
      await themesService.linkToUser(userLogged, body.themeId);
      res.status(200);
      res.send(JSON.stringify({ result: 'OK' }));
    } catch (e) {
      res.status(500);
      res.send(JSON.stringify({ result: `link themes error: ${e}` }));
    }
  }
}
