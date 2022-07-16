import React from 'react';
import { Request, Response } from 'express';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import { ServerStyleSheet } from 'styled-components';
import store from '@frontend/src/store/store';
import { Provider } from 'react-redux';
import serialize from 'serialize-javascript';

const sheet = new ServerStyleSheet();

const getHTML = (styles: string, rendered: string, data: string) => `
    <!DOCTYPE html>
    <html lang="en">
        <head>
            <title>Fight Club</title>
            <meta charset="UTF-8"/>
            <script>
              (function startServiceWorker () {
                if ('serviceWorker' in navigator) {
                  try {
                    navigator.serviceWorker.register('sw.js', { scope: '/' }).then((registration) => {
                      console.log('ServiceWorker registration successful with scope: ', registration.scope);
                    });
                  } catch(error) {
                    console.log('ServiceWorker registration failed: ', error);
                  }
                }
              }());
            </script>
            ${styles}
        </head>
        <body>
            <div id="app">${rendered}</div>
            <script>window.__PRELOADED_STATE__ = ${data}</script>
            <script src="/bundle.js"></script>
        </body>
    </html>
`;

export const serverMiddlewareWithCallback = (callback: Function) => (req: Request, res: Response) => {
  const location = req.url;

  // here we have to dynamic load the app bundle while debuggign
  // otherwise server content will not equal client content after hmr
  // and hydrate will fire a mismatch error
  // I couldn't find any way to dynamic import in Typescript
  const AppToRender = callback();

  const jsx = (
    <Provider store={store}>
      <StaticRouter location={location}>
        <AppToRender/>
      </StaticRouter>
    </Provider>
  );
  const rendered = renderToString(sheet.collectStyles(jsx));
  const styles = sheet.getStyleTags();
  const data = serialize(store.getState()).replace(/</g, '\\\\\u003c');

  res.send(getHTML(styles, rendered, data));
};
