import { Request, Response } from 'express';
import { UserService } from '@backend/src/services/user';

export const checkPrivileges = async (_req: Request, res: Response, next: Function) => {
  const userService = new UserService();
  const user = await userService.find(res.locals.userParsed.login);
  if (user?.isAdmin) {
    next();
  } else {
    res.send('Not authorized');
    res.status(403);
  }
};
