import React, { FC } from 'react';
import styled from 'styled-components';
import { BlackPageLayout } from '../../../layouts/blackPage/blackPage';
import { StrokedText } from '../../../components/strokedText/strokedText';

const LoadingBox = styled.div`
  position: relative;

  &::after {
    animation: dot-hide 1s infinite;
    display: inline-block;
    position: absolute;
    left: 130px;
    background-color: black;
    height: 100%;
    width: 100px;
    content: " ";
  }

  @keyframes dot-hide {
    0% {
      background-color: rgb(0 0 0 / 100%);
    }

    50% {
      background-color: rgb(0 0 0 / 0%);
    }
  }
`;

export const Loading: FC = () => {
  return <BlackPageLayout>
      <LoadingBox>
        <StrokedText textColor='#f00' strokeColor='#fff500' strokeSize='2' fontSize='40'>Loading...</StrokedText>
      </LoadingBox>
  </BlackPageLayout>;
};
