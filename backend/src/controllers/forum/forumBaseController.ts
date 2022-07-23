import { Request, Response } from 'express';
import { BaseForumService, ForumApiRequestResult } from '@backend/src/services/forum/baseForumEntity';
import { User } from '@backend/src/models/users/users';

type BaseForumServiceImpl<T, M> = {
  [P in keyof T]: T[P]
} & { new(): M };

type HelperOptions = {
  serviceClass: BaseForumServiceImpl<typeof BaseForumService, BaseForumService>,
  parentField?: string,
  ownField?: string,
};

const addUserToRes = (res: Response): Promise<void> => User.findOne({
  where: {
    login: `${res.locals.userParsed.login}`,
  },
}).then((user: User) => {
  if (user === null) {
    res.status(500);
    res.send(JSON.stringify({ result: 'Can not find user' }));
    return Promise.reject();
  }
  res.locals._curUser = user;
  return Promise.resolve();
});

export const withService = (options: HelperOptions) => {
  const { serviceClass, parentField, ownField } = options;
  // eslint-disable-next-line new-cap
  const serviceObject = new serviceClass();

  return class BaseForumController {
    public static get(req: Request, res: Response): Promise<void> {
      if (parentField !== undefined) {
        return serviceObject.getAll(parseInt(req.params[parentField], 10))
          .then((data) => {
            res.status(200);
            res.send(data);
          })
          .catch(() => {
            res.status(500);
            res.send(JSON.stringify({ result: 'Get data error' }));
          });
      }
      return serviceObject.getAll()
        .then((data) => {
          res.status(200);
          res.send(data);
        })
        .catch(() => {
          res.status(500);
          res.send(JSON.stringify({ result: 'Get data error' }));
        });
    }

    public static add(req: Request, res: Response): Promise<void> {
      return addUserToRes(res).then(() => {
        const { body } = req;
        body.userId = res.locals._curUser.id;
        if (parentField !== undefined) {
          body[parentField] = req.params[parentField];
        }
        return serviceObject.add(body);
      }).then((result: ForumApiRequestResult) => {
        res.status(200);
        res.send(result);
      }).catch((result: ForumApiRequestResult) => {
        res.status(500);
        res.send(result);
      });
    }

    public static edit(req: Request, res: Response): Promise<void> {
      return addUserToRes(res).then(() => {
        const { body } = req;
        body.userId = res.locals._curUser.id;
        if (ownField === undefined) {
          res.status(500);
          res.send(JSON.stringify({ result: 'update error' }));
          return Promise.reject();
        }
        const myId: number = parseInt(req.params[ownField], 10);
        return serviceObject.update(myId, body);
      }).then((result: ForumApiRequestResult) => {
        res.status(200);
        res.send(result);
      }).catch((result: ForumApiRequestResult) => {
        res.status(500);
        res.send(result);
      });
    }

    public static delete(req: Request, res: Response): Promise<void> {
      if (ownField === undefined) {
        res.status(500);
        res.send(JSON.stringify({ result: 'update error' }));
        return Promise.reject();
      }
      const myId: number = parseInt(req.params[ownField], 10);
      return serviceObject.delete(myId)
        .then((result: ForumApiRequestResult) => {
          res.status(200);
          res.send(result);
        }).catch((result: ForumApiRequestResult) => {
          res.status(500);
          res.send(result);
        });
    }

    public static getChildren(req: Request, res: Response): Promise<void> {
      if (ownField === undefined) {
        res.status(500);
        res.send(JSON.stringify({ result: 'get children error' }));
        return Promise.reject();
      }
      const myId: number = parseInt(req.params[ownField], 10);
      return serviceObject.children(myId).then((children) => {
        res.status(200);
        res.send(children);
        return Promise.resolve();
      });
    }
  };
};
