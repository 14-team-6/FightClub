import React, { FC } from 'react';
import styled, { createGlobalStyle } from 'styled-components';

const GC = createGlobalStyle`
  * {
    @font-face {
      font-family: Pixeboy;
      src:
        url("../../../../public/font/Pixeboy.woff2") format("woff2"),
        url("../../../../public/font/Pixeboy.woff") format("woff");
      font-style: normal;
      font-display: swap;
    }
  }
`;

const Wrap = styled.div`
  width: 100vw;
  height: 100vh;

  background-image: url("../../../../public/img/mainBackground.png");
  background-size: auto 100vh;

  &::after {
    width: 100vw;
    height: 100vh;
    display: block;
    content: ' ';
    background-color: rgb(0 0 0 / 40%);
    background-image: none;
  }
`;

const Header = styled.h1`
  font-family: Pixeboy, sans-serif;
  color: #ff0000;
  font-size: 140px;
  -webkit-text-stroke: 1px #fff500;
`;

export enum EndGameType {
  'win'= 'You win!',
  'loose' = 'You loose!'
}

type EndGameProps = {
  endGameType: EndGameType,
}

export const EndGame: FC<EndGameProps> = (props: EndGameProps) => {
  return <Wrap>
    <GC/>
    <Header>{props.endGameType}</Header>
  </Wrap>
}
