import { Request, Response } from 'express';

export const checkAuthMiddleware = (req: Request, res: Response, next: Function) => {
  if ('user' in req.cookies) {
    try {
      res.locals.userParsed = JSON.parse(req.cookies.user);
      next();
    } catch (e) {
      res.status(500);
      res.send(JSON.stringify({ result: 'Parse cookie error' }));
    }
  } else {
    res.status(403);
    res.send(JSON.stringify({ result: 'Auth error' }));
  }
};
