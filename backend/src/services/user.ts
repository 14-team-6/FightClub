import { User } from '@backend/src/models/users/users';
import { BaseService } from '@backend/src/services/baseService';

type UpdateProps = {
  isPremium?: boolean,
};

type UserProps = {
  login: string,
  name?: string,
};

export class UserService implements BaseService<User> {
  public find = async (userLogin: string): Promise<User | null> => User.findOne({
    where: {
      login: `${userLogin}`,
    },
  });

  public create = async (data: UserProps) => {
    const curUser = await this.find(data.login);
    if (curUser === null) {
      return User.create({
        login: `${data.login}`,
        name: `${data.name}`,
        isAdmin: false,
        isPremium: false,
      });
    }
    return curUser;
  };

  public get = (): Promise<User[]> => User.findAll();

  public update = async (userLogin: string, updateProps: UpdateProps): Promise<User | null> => {
    const curUser = await this.find(userLogin);
    if (curUser !== null) {
      return curUser.update(updateProps);
    }
    return Promise.reject();
  };

  public delete = async (userLogin: string): Promise<void> => {
    const curUser = await this.find(userLogin);
    if (curUser !== null) {
      return curUser.destroy();
    }
    return Promise.reject();
  };
}
