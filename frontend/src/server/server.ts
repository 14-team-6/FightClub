import express from 'express';
import * as path from 'path';
import serverMiddleware from '@frontend/src/server/serverMiddleware';

const ssrServer = express();

ssrServer.use(express.static(path.resolve(__dirname, '../dist')))
  .use(express.static(path.resolve(__dirname, '../public')));

ssrServer.get('/*', serverMiddleware);

export { ssrServer };
