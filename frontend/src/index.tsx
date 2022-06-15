import React, { FC } from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter,
  Link,
  Route,
  Routes,
} from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';
import LoginPage from './pages/login/login';
import { Loading } from './pages/game/loading/loading';
import { Errors, ErrorTypes } from './pages/errors/errors';
import Pixeboy from '../public/font/Pixeboy.ttf';
import MainLayout from './layouts/mainLayout';
import RegistrationPage from './pages/registration/registration';
import { EndGame, EndGameType } from './pages/game/endGame/endGame';
import { Results } from './pages/results/results';

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
  }
`;

const App: FC = () => {
  return <React.Fragment>
    <BrowserRouter>
      <GS/>
      <Routes>
        <Route path='/' element={
          <ul>
           <li><Link to='/login'>Login</Link></li>
           <li><Link to='/game/loading'>Load game</Link></li>
          </ul>
        }/>
        <Route path='/results' element={<Results/>}/>
        <Route path='/game/loading' element={<Loading/>}/>
        <Route path='/game/end' element={<EndGame endGameType={EndGameType.LOOSE}/>}/>
        <Route path='*' element={<Errors errorType={ErrorTypes.e404}/>}/>
        <Route path='/login' element={<MainLayout><LoginPage/></MainLayout>}/>
        <Route path='/registration' element={<MainLayout><RegistrationPage/></MainLayout>}/>
      </Routes>
    </BrowserRouter>
  </React.Fragment>;
};

ReactDOM.render(<App/>, document.getElementById('app'));
