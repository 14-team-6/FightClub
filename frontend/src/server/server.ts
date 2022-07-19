import express, { Express } from 'express';
import { serverMiddlewareWithCallback } from '@frontend/src/server/serverMiddleware';
import cookieParser from 'cookie-parser';
import compression from 'compression';
/// #if DEBUG
import * as path from 'path';
import { webpack } from 'webpack';
// seems like a bug: the linter give a 'should be listed in the project's dependencies' error,
// but it's almost there
import webpackHotMiddleware from 'webpack-hot-middleware'; // eslint-disable-line
import webpackDevMiddleware from 'webpack-dev-middleware';
import config from '../../build/webpack.client.config';
/// #endif
import { Sequelize } from 'sequelize-typescript';
import { ThemeUser } from '@backend/models/themes/ThemeUser';
import { Theme } from '@backend/models/themes/Theme';
import { User } from '@backend/models/users/User';

const ssrServerWithCallback = (callback: Function): Express => {
  const ssrServer = express();

  const serverMiddleware = serverMiddlewareWithCallback(callback);

  ssrServer.use(compression());

  /// #if DEBUG

  const compiler = webpack(config);

  ssrServer.use(webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath,
    serverSideRender: true,
    index: false,
  }));

  ssrServer.use(webpackHotMiddleware(compiler, {
    log: false,
    path: '/__webpack_hmr',
    heartbeat: 10 * 1000,
  }));

  ssrServer.use(express.static(path.resolve(__dirname, '../dist/')));
  ssrServer.use('/public', express.static(path.resolve(__dirname, '../frontend/public/')));

  /// #endif

  ssrServer.use(cookieParser());
  ssrServer.get('/*', serverMiddleware);

  const DB_URL = process.env.DATABASE_URL;
  if (DB_URL === undefined) {
    throw Error('Database connection string not found in environment variables');
  }
  const sequelize = new Sequelize(DB_URL, {
    models: [User, Theme, ThemeUser],
  });
  (async () => {
    await sequelize.sync({ alter: true });
    console.log(sequelize.models);
  })();

  return ssrServer;
};

export { ssrServerWithCallback };
