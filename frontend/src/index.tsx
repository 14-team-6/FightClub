import React, { FC } from 'react';
import ReactDOM from 'react-dom';
import { createGlobalStyle } from 'styled-components';
import {
  BrowserRouter, Link, Route, Routes,
} from 'react-router-dom';
import LoginPage from './pages/login/login';
import Pixeboy from '../public/font/Pixeboy.ttf';
import RegistrationPage from './pages/registration/registration';
import MainLayout from './layouts/main-layout';

const GS = createGlobalStyle`
  @font-face {
    font-family: Pixeboy;
    src: url(${Pixeboy}) format("truetype");
    font-display: swap;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
`;

const App: FC = () => {
  return <React.Fragment>
    <BrowserRouter>
      <GS/>

      <Routes>
        <Route path='/login' element={<MainLayout><LoginPage/></MainLayout>}/>
        <Route path='/registration' element={<MainLayout><RegistrationPage/></MainLayout>}/>
      </Routes>
      <Link to={'login'}>Login</Link>

    </BrowserRouter>
  </React.Fragment>;
};

ReactDOM.render(<App/>, document.getElementById('app'));
