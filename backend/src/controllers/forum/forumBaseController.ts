import { Request, Response } from 'express'
import { BaseForumService, ForumApiRequestResult } from '@backend/src/services/forum/baseForumEntity';
import { User } from '@backend/src/models/users/users';

type BaseForumServiceImpl<T, M> = {
  [P in keyof T]: T[P]
} & { new(): M };

type HelperOptions = {
  serviceClass: BaseForumServiceImpl<typeof BaseForumService, BaseForumService>,
  parent_field?: string,
  own_field?: string,
};

const addUserToRes = async (res: Response): Promise<void> => {
  const user = await User.findOne({
    where: {
      login: `${res.locals.userParsed.login}`,
    }
  });
  if (user === null) {
    res.status(500);
    res.send('Can not find user');
    return Promise.reject();
}
res.locals._curUser = user;
return Promise.resolve();
}

export const withService = (options: HelperOptions) => {
  const { serviceClass, parent_field, own_field } = options;
  const serviceObject = new serviceClass();

  return class BaseForumController {
    public static async get(req: Request, res: Response): Promise<void> {
      if (parent_field !== undefined) {
        res.send(await serviceObject.getAll(parseInt(req.params[parent_field])));
      } else {
        res.send(await serviceObject.getAll());
      }
    }

    public static async add(req: Request, res: Response): Promise<void> {
      return addUserToRes(res).then(async () => {
        const { body } = req;
        body.userId = res.locals._curUser.id;
        if (parent_field !== undefined) {
          body[parent_field] = req.params[parent_field];
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
        if (own_field === undefined) {
          res.send('update error');
          res.status(500);
          return;
        }
        const my_id: number = parseInt(req.params[own_field]);
        await serviceObject.update(my_id, body)
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
      if (own_field === undefined) {
        res.send('update error');
        res.status(500);
        return;
      }
      const my_id: number = parseInt(req.params[own_field]);
      await serviceObject.delete(my_id)
        .then((result: ForumApiRequestResult) => {
        res.send(result);
        res.status(200);
      }).catch((result: ForumApiRequestResult) => {
        res.send(result);
        res.status(500);
      });
    }

    public static async getChildren(req: Request, res: Response): Promise<void> {
      if (own_field === undefined) {
        res.send('get children error');
        res.status(500);
        return;
      }
      const my_id: number = parseInt(req.params[own_field]);
      res.send(await serviceObject.children(my_id));
    }
  }
}
