import { Sequelize } from 'sequelize-typescript';
import { User } from '@backend/src/models/users/users';
import { Theme } from '@backend/src/models/themes/themes';
import { ThemeUsers } from '@backend/src/models/themes/themeUsers';
import { Topic } from '@backend/src/models/forum/topics';
import { Post } from '@backend/src/models/forum/posts';
import { Comment } from '@backend/src/models/forum/comments';

class SequelizeGlobal {
  public sequelize: Sequelize;

  constructor() {
    const DB_URL = process.env.DATABASE_URL;
    const isDebug = process.env.NODE_ENV === 'development';
    if (DB_URL === undefined) {
      throw Error('Database connection string not found in environment variables');
    }
    this.sequelize = new Sequelize(DB_URL, {
      models: [User, Theme, ThemeUsers, Topic, Post, Comment],
      dialect: 'postgres',
      dialectOptions: !isDebug ? {
        ssl: {
          rejectUnauthorized: false,
        },
      } : {},
    });
  }

  public init(): Promise<any> {
    return this.sequelize.sync({ alter: true });
  }
}

export const sequelizeGlobal = new SequelizeGlobal();
