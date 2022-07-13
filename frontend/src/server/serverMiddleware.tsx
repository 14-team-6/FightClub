import React from 'react';
import { Request, Response } from 'express';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import { ServerStyleSheet } from 'styled-components';

const sheet = new ServerStyleSheet();

const getHTML = (styles: string, rendered: string) => `
    <!DOCTYPE html>
    <html lang="en">
        <head>
            <title>Fight Club</title>
            <meta charset="UTF-8"/>
            ${styles}
        </head>
        <body>
            <div id="app">${rendered}</div>
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
    <StaticRouter location={location}>
      <AppToRender/>
    </StaticRouter>
  );
  const rendered = renderToString(sheet.collectStyles(jsx));
  const styles = sheet.getStyleTags();

  res.send(getHTML(styles, rendered));
};
