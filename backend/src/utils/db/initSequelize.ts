import { Sequelize } from 'sequelize-typescript';
import { User } from '@backend/src/models/users/users';
import { Theme } from '@backend/src/models/themes/themes';
import { ThemeUsers } from '@backend/src/models/themes/themeUsers';
import { Topic } from '@backend/src/models/forum/topics';
import { Post } from '@backend/src/models/forum/posts';
import { Comment } from '@backend/src/models/forum/comments';

export const initSequelize = (sequelizeOptions: Record<any, any>, isSSL = false) => {
  const DB_URL = process.env.DATABASE_URL as string;

  const sequelize = new Sequelize(DB_URL, {
    models: [User, Theme, ThemeUsers, Topic, Post, Comment],
    dialect: 'postgres',
    dialectOptions: isSSL ? {
      ssl: {
        rejectUnauthorized: false,
      },
    } : {},
  });

  return sequelize.sync(sequelizeOptions);
};
