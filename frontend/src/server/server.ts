import express from 'express';
import * as path from 'path';
import serverMiddleware from '@frontend/src/server/serverMiddleware';

const ssrServer = express();

console.log(__dirname);

ssrServer.use(express.static(path.resolve(__dirname, '../dist/')));
ssrServer.use('/public', express.static(path.resolve(__dirname, '../frontend/public/')));

ssrServer.get('/*', serverMiddleware);

export { ssrServer };
