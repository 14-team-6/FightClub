import React, { FC } from 'react';
import { hydrateRoot } from 'react-dom/client';
import { App } from '@frontend/src/app/app';
import { Provider } from 'react-redux';
import store from '@frontend/src/store/store';
import { BrowserRouter } from 'react-router-dom';
import * as Sentry from '@sentry/react';
import { BrowserTracing } from '@sentry/tracing';
import { JSDOM } from 'jsdom';

Sentry.init({
  dsn: 'https://7da3e5a22ab74fadb84d7effbb17e6c1@o1329302.ingest.sentry.io/6591297',
  integrations: [new BrowserTracing()],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
});

const AppToRender: FC = () => (
  <Provider store={store}>
    <BrowserRouter>
      <App/>
    </BrowserRouter>
  </Provider>
);

const container = document.getElementById('app');

if (container) {
  hydrateRoot(container!, <AppToRender/>);
} else {
  const template: string = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <title>Чат</title>
        </head>
        <body>
            <div id="app"></div>
        </body>
        </html>`;

  const fakeDOM = new JSDOM(template);

  // eslint-disable-next-line no-console
  console.log(fakeDOM.window.document);
  (global as any).window = fakeDOM.window;
  (global as any).document = fakeDOM.window.document;

  hydrateRoot(document.getElementById('app')!, <AppToRender/>);
}
