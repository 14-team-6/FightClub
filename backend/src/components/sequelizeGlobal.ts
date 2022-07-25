import { Sequelize } from 'sequelize-typescript';
import { User } from '@backend/src/models/users/users';
import { Theme } from '@backend/src/models/themes/themes';
import { ThemeUsers } from '@backend/src/models/themes/themeUsers';

class SequelizeGlobal {
  public sequelize: Sequelize;

  constructor() {
    const DB_URL = process.env.DATABASE_URL;
    if (DB_URL === undefined) {
      throw Error('Database connection string not found in environment variables');
    }
    this.sequelize = new Sequelize(DB_URL, {
      models: [User, Theme, ThemeUsers],
    });
  }

  public init(): Promise<any> {
    return this.sequelize.sync({ alter: true });
  }
}

export const sequelizeGlobal = new SequelizeGlobal();
