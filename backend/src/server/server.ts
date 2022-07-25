import express, { Express, Router } from 'express';
import { serverMiddlewareWithCallback } from '@backend/src/server/serverMiddleware';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import compression from 'compression';
import { sequelizeGlobal } from '@backend/src/components/sequelizeGlobal';
import { initBackendRoutes } from '@backend/src/components/initBackendRoutes';
import * as Sentry from '@sentry/node';
import * as Tracing from '@sentry/tracing';

/// #if DEBUG
import * as path from 'path';
import { webpack } from 'webpack';
// seems like a bug: the linter give a 'should be listed in the project's dependencies' error,
// but it's almost there
import webpackHotMiddleware from 'webpack-hot-middleware'; // eslint-disable-line
import webpackDevMiddleware from 'webpack-dev-middleware';
import config from '../../../build/webpack.client.config';
/// #endif

const ssrServerWithCallback = (callback: Function): Express => {
  const ssrServer = express();

  Sentry.init({
    dsn: 'https://eda72f0264dc47dc9b12abd100ed8b83@o1329302.ingest.sentry.io/6591298',
    integrations: [
      // enable HTTP calls tracing
      new Sentry.Integrations.Http({ tracing: true }),
      // enable Express.js middleware tracing
      new Tracing.Integrations.Express({ app: ssrServer }),
    ],

    // Set tracesSampleRate to 1.0 to capture 100%
    // of transactions for performance monitoring.
    // We recommend adjusting this value in production
    tracesSampleRate: 1.0,
  });

  // RequestHandler creates a separate execution context using domains, so that every
  // transaction/span/breadcrumb is attached to its own Hub instance
  ssrServer.use(Sentry.Handlers.requestHandler());
  // TracingHandler creates a trace for every incoming request
  ssrServer.use(Sentry.Handlers.tracingHandler());

  const serverMiddleware = serverMiddlewareWithCallback(callback);

  ssrServer.use(compression());
  ssrServer.use(cookieParser());
  ssrServer.use(bodyParser());

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

  const router = Router();
  initBackendRoutes(router);

  router.get('/*', serverMiddleware);

  ssrServer.use(router);

  (async () => {
    await sequelizeGlobal.init();
  })();

  ssrServer.use(cookieParser());

  ssrServer.get('/*', serverMiddleware);


  // The error handler must be before any other error middleware and after all controllers
  ssrServer.use(Sentry.Handlers.errorHandler());

  // Optional fallthrough error handler
  /* eslint-disable */
  // @ts-ignore
  ssrServer.use(function onError(err, req, res, next) {
    // The error id is attached to `res.sentry` to be returned
    // and optionally displayed to the user for support.
    res.statusCode = 500;
    res.end(res.sentry + "\n");
  });
  /* eslint-enable */

  return ssrServer;
};

export { ssrServerWithCallback };
