import React, { FC } from 'react';
import styled, { createGlobalStyle } from 'styled-components';

const Wrap = createGlobalStyle`
  * {
    background-color: black;
  }

  @font-face {
    font-family: Pixeboy;
    src:
      url("../../../../public/font/Pixeboy.woff2") format("woff2"),
      url("../../../../public/font/Pixeboy.woff") format("woff");
    font-style: normal;
    font-display: swap;
  }
`;

const LoadingText = styled.h1`
  font-family: Pixeboy, sans-serif;
  text-align: center;
  line-height: 100vh;
  font-size: 40px;
  color: #f00;
  -webkit-text-stroke: 1px #fff500;

  &::after {
    animation: dot-hide 1s infinite;
    content: "...";
  }

  @keyframes dot-hide {
    0% {
      color: #f00;
      -webkit-text-stroke: 1px #fff500;
    }

    50% {
      color: black;
      -webkit-text-stroke: 1px black;
    }
  }
`;

export const Loading: FC = () => {
  return <React.Fragment>
    <Wrap/>
    <LoadingText>Loading</LoadingText>
  </React.Fragment>;
};
