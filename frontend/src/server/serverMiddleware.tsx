import React from 'react';
import { Request, Response } from 'express';
import { App } from '@frontend/src/app/app';
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

export default (req: Request, res: Response): void => {
  const location = req.url;
  const jsx = (
    <StaticRouter location={ location }>
     <App />
    </StaticRouter>
  );
  const rendered = renderToString(sheet.collectStyles(jsx));
  const styles = sheet.getStyleTags();

  res.send(getHTML(styles, rendered));
};
