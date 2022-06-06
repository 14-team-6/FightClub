import React, { FC } from 'react';
import styled from 'styled-components';
import { BlackPageLayout } from '../../../layouts/blackPage';
import { StrokedText } from '../../../components/strokedText/strokedText';
import { MAIN_RED, MAIN_YELLOW } from '../../../../consts/styles';

const LoadingText = styled(StrokedText)`
  font-size: 100px;

  &::after {
    animation: dot-hide 1s infinite;
    content: "...";
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
      <LoadingText
        fontSize='40px'
        textColor={MAIN_RED}
        strokeColor={MAIN_YELLOW}
      >
        Loading
      </LoadingText>
  </BlackPageLayout>;
};
