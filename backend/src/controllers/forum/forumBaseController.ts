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

const addUserToRes = async (res: Response): Promise<void> => {
  const user = await User.findOne({
    where: {
      login: `${res.locals.userParsed.login}`,
    },
  });
  if (user === null) {
    res.status(500);
    res.send('Can not find user');
    return Promise.reject();
  }
  res.locals._curUser = user;
  return Promise.resolve();
};

export const withService = (options: HelperOptions) => {
  const { serviceClass, parentField, ownField } = options;
  // eslint-disable-next-line new-cap
  const serviceObject = new serviceClass();

  return class BaseForumController {
    public static async get(req: Request, res: Response): Promise<void> {
      if (parentField !== undefined) {
        res.send(await serviceObject.getAll(parseInt(req.params[parentField], 10)));
      } else {
        res.send(await serviceObject.getAll());
      }
    }

    public static async add(req: Request, res: Response): Promise<void> {
      return addUserToRes(res).then(async () => {
        const { body } = req;
        body.userId = res.locals._curUser.id;
        if (parentField !== undefined) {
          body[parentField] = req.params[parentField];
        }
        await serviceObject.add(body)
          .then((result: ForumApiRequestResult) => {
            res.send(result);
            res.status(200);
          }).catch((result: ForumApiRequestResult) => {
            res.send(result);
            res.status(500);
          });
      });
    }

    public static async edit(req: Request, res: Response): Promise<void> {
      return addUserToRes(res).then(async () => {
        const { body } = req;
        body.userId = res.locals._curUser.id;
        if (ownField === undefined) {
          res.send('update error');
          res.status(500);
          return;
        }
        const myId: number = parseInt(req.params[ownField], 10);
        await serviceObject.update(myId, body)
          .then((result: ForumApiRequestResult) => {
            res.send(result);
            res.status(200);
          }).catch((result: ForumApiRequestResult) => {
            res.send(result);
            res.status(500);
          });
      });
    }

    public static async delete(req: Request, res: Response): Promise<void> {
      if (ownField === undefined) {
        res.send('update error');
        res.status(500);
        return;
      }
      const myId: number = parseInt(req.params[ownField], 10);
      await serviceObject.delete(myId)
        .then((result: ForumApiRequestResult) => {
          res.send(result);
          res.status(200);
        }).catch((result: ForumApiRequestResult) => {
          res.send(result);
          res.status(500);
        });
    }

    public static async getChildren(req: Request, res: Response): Promise<void> {
      if (ownField === undefined) {
        res.send('get children error');
        res.status(500);
        return;
      }
      const myId: number = parseInt(req.params[ownField], 10);
      res.send(await serviceObject.children(myId));
    }
  };
};
