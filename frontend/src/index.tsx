import React, { FC } from 'react';
import { hydrateRoot } from 'react-dom/client';
import { App } from '@frontend/src/app/app';
import { Provider } from 'react-redux';
import store from '@frontend/src/store/store';
import { BrowserRouter } from 'react-router-dom';
import * as Sentry from '@sentry/react';
import { BrowserTracing } from '@sentry/tracing';

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
hydrateRoot(container!, <AppToRender/>);
