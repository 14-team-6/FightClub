import React, { FC } from 'react';
import { hydrateRoot } from 'react-dom/client';
import { App } from '@frontend/src/app/app';
import { Provider } from 'react-redux';
import store from '@frontend/src/store/store';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '@frontend/src/hooks/useAuth';

const AppToRender: FC = () => (
  <Provider store={store}>
    <BrowserRouter>
      <AuthProvider>
        <App/>
      </AuthProvider>
    </BrowserRouter>
  </Provider>
);

const container = document.getElementById('app');
hydrateRoot(container!, <AppToRender/>);
