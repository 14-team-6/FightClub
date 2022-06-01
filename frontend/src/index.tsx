import React, { FC } from 'react';
import ReactDOM from 'react-dom';
import styled, { createGlobalStyle } from 'styled-components';
import {
  BrowserRouter, Link, Route, Routes,
} from 'react-router-dom';
import LoginPage from './pages/login/login';
import mainBackgroundImage from '../public/img/main-background.png';
import Pixeboy from '../public/font/Pixeboy.ttf';
import RegistrationPage from './pages/registration/registration';

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

const Wrapper = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  background-image: url(${mainBackgroundImage});
  background-repeat: no-repeat;
  background-size: cover;
`;

const App: FC = () => {
  return <React.Fragment>
    <BrowserRouter>
      <GS/>
      <Wrapper>
        <Routes>
          <Route path='/login' element={<LoginPage/>} />
          <Route path='/registration' element={<RegistrationPage/>} />
        </Routes>
        <Link to={'login'}>Login</Link>
      </Wrapper>
    </BrowserRouter>
  </React.Fragment>;
};

ReactDOM.render(<App/>, document.getElementById('app'));
