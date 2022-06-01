import React, { FC } from 'react';
import styled, { createGlobalStyle } from 'styled-components';

const GC = createGlobalStyle`
  * {
    background-color: black;
  }

  @font-face {
    font-family: Pixeboy;
    src:
      url("../../../public/font/Pixeboy.woff2") format("woff2"),
      url("../../../public/font/Pixeboy.woff") format("woff");
    font-style: normal;
    font-display: swap;
  }
`;

const Wrap = styled.div`
  display: flex;
  height: 100vh;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ErrorText = styled.h1`
  display: flex;
  align-items: end;
  flex-basis: 30%;
  font-family: Pixeboy, sans-serif;
  text-align: center;
  font-weight: 500;
  font-size: 80px;
  color: #f00;
  -webkit-text-stroke: 4px #fff500;
`;

const Img = styled.div`
  margin: 47px 0 0;
  background-image: url("../../../public/img/dead_cat.png");
  background-repeat: no-repeat;
  background-position: bottom;
  width: 94px;
  height: 50px;
`;

const BText = styled.a`
  display: block;
  margin: 27px 0 0;
  font-family: Pixeboy, sans-serif;
  font-size: 30px;
  color: #fff500;
  text-decoration: none;
  -webkit-text-stroke: 0.7px #5061ff;
`;

export enum ErrorTypes {
  'e404' = '404',
  'e500' = '500',
}

type ErrorProps = {
  errorType: ErrorTypes,
};

export const Errors: FC<ErrorProps> = (props: ErrorProps) => {
  return <Wrap>
    <GC/>
    <ErrorText>{props.errorType}</ErrorText>
    <Img/>
    <BText href="#">Back</BText>
  </Wrap>;
};
