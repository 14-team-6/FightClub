import { UserService } from '@backend/src/services/user';
import { Request, Response, Router } from 'express';
import { UserDTO } from '@frontend/src/services/types';
import { checkPrivileges } from '@backend/src/middleware/checkPrivileges';

export class UserApi {
  public static initRoute(router: Router) {
    const userRoute = Router();
    userRoute
      .get('/', checkPrivileges, UserApi.get)
      .post('/', UserApi.create);
    router.use('/users', userRoute);
  }

  public static async create(_req: Request, res: Response) {
    const userService = new UserService();
    try {
      const user = res.locals.userParsed as UserDTO;
      await userService.create(user.login);
      res.status(200);
      res.send(JSON.stringify({ result: 'OK' }));
    } catch (e) {
      res.status(500);
      res.send(JSON.stringify({ result: `create user error: ${e}` }));
    }
  }

  public static async get(_req: Request, res: Response) {
    const userService = new UserService();
    const users = await userService.get();
    res.status(200);
    res.send(JSON.stringify(users));
  }
}
