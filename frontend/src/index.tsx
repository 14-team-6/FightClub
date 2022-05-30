import React, { FC } from 'react';
import ReactDOM from 'react-dom';
import styled, { createGlobalStyle } from 'styled-components';

const GS = createGlobalStyle`
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
  background-color: rgb(0  0  0  23%);
`;

const H1 = styled.h1`
  display: block;
  position: absolute;
  left: calc(50% - 100px);
  top: calc(50% - 100px);
  text-align: center;
  line-height: 200px;
  width: 200px;
  height: 200px;
  border-radius: 10px;
  background-color: rgb(255  255  255  100%);
`;

const App: FC = () => {
  return <React.Fragment>
        <GS/>
        <Wrapper>
            <H1>Hi team!</H1>
        </Wrapper>
    </React.Fragment>;
};

ReactDOM.render(<App/>, document.getElementById('app'));
