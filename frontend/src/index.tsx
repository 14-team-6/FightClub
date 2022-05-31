import React, { FC, MouseEventHandler } from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter, Route, Routes, useNavigate,
} from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components';

const GS = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  a {
    color: blue;
    text-decoration: underline;
    cursor: grab;
  }
`;

const Wrapper = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: rgb(0  0  0 / 23%);
`;

const H1Cont = styled.div`
  display: block;
  position: absolute;
  left: calc(50% - 100px);
  top: calc(50% - 100px);
  text-align: center;
  line-height: 100px;
  width: 200px;
  height: 200px;
  border-radius: 10px;
  background-color: rgb(255  255  255 / 100%);
`;

interface HiProps {
  name: string,
  routeTo: string,
}

const SayHi: FC<HiProps> = (props) => {
  const nav = useNavigate();

  const handleClick = React.useCallback((prp: HiProps): MouseEventHandler => {
    return () => {
      nav(`${prp.routeTo}`);
    };
  }, []);

  return <React.Fragment>
    <Wrapper>
      <H1Cont>
        <h1>Hi {props.name}!</h1>
        <a onClick={handleClick(props)}>Click me!</a>
      </H1Cont>
    </Wrapper>
  </React.Fragment>;
};

const App: FC = () => {
  return <React.Fragment>
    <GS/>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SayHi name="team" routeTo="/url2"/>}/>
        <Route path="url2" element={<SayHi name="routing" routeTo="/"/>}/>
      </Routes>
    </BrowserRouter>
    </React.Fragment>;
};

ReactDOM.render(<App/>, document.getElementById('app'));
