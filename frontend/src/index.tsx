import React, { FC } from 'react';
import { hydrateRoot } from 'react-dom/client';
import { App } from '@frontend/src/app/app';
import { Provider } from 'react-redux';
import store from '@frontend/src/store/store';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '@frontend/src/hooks/useAuth';
import { createGlobalStyle } from 'styled-components';
import Pixeboy from '@frontend/public/font/Pixeboy.ttf';

const GS = createGlobalStyle`
  @font-face {
    font-family: Pixeboy;
    src: url(${Pixeboy}) format("truetype");
    font-style: normal;
    font-display: swap;
  }

  * {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
    font-family: Pixeboy, serif;
  }
`;

const AppToRender: FC = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <GS />
        <AuthProvider>
          <App/>
        </AuthProvider>
      </BrowserRouter>
    </Provider>
  )
};

const container = document.getElementById('app');
const root = hydrateRoot(container!, <AppToRender/>);
root.render(<AppToRender />);
