import React, { FC } from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter, Link, Route, Routes,
} from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';
import { Login } from './pages/login/login';
import { Loading } from './pages/game/loading/loading';
import FightPage from './pages/fight/fight';

const GS = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
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
           <li><Link to='/fight'>Fight!</Link></li>
          </ul>
        }/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/game/loading' element={<Loading/>}/>
        <Route path='/fight' element={<FightPage/>}/>
      </Routes>
    </BrowserRouter>
    </React.Fragment>;
};

ReactDOM.render(<App/>, document.getElementById('app'));
