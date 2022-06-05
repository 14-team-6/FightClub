import React, { FC } from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter,
  Link,
  Route,
  Routes,
} from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';
import { Login } from './pages/login/login';
import { Loading } from './pages/game/loading/loading';
import { Errors, ErrorTypes } from './pages/errors/errors';
import Pixeboy from '../public/font/Pixeboy.ttf';

const GS = createGlobalStyle`
  * {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
  }

  @font-face {
    font-family: Pixeboy;
    src: url(${Pixeboy});
    font-style: normal;
    font-display: swap;
  }
`;

const App: FC = () => {
  return <React.Fragment>
    <GS/>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={
          <ul>
           <li><Link to='/login'>Login</Link></li>
           <li><Link to='/game/loading'>Load game</Link></li>
          </ul>
        }/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/game/loading' element={<Loading/>}/>
        <Route path='*' element={<Errors errorType={ErrorTypes.e404}/>}/>
      </Routes>
    </BrowserRouter>
    </React.Fragment>;
};

ReactDOM.render(<App/>, document.getElementById('app'));
