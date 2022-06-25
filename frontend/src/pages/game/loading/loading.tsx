import React, { FC } from 'react';
import styled from 'styled-components';
import { MAIN_RED, MAIN_YELLOW } from '@frontend/consts/styles';
import { BlackPageLayout } from '../../../layouts/blackPage';
import { StrokedText } from '../../../components/strokedText/strokedText';

const LoadingText = styled(StrokedText)`
  &::after {
    animation: dot-hide 1s infinite;
    position: absolute;
    content: "...";
  }

  @keyframes dot-hide {
    0% {
      content: "...";
    }

    50% {
      content: "";
    }
  }
`;

export const Loading: FC = () => (
  <BlackPageLayout>
    <LoadingText
      fontSize="40px"
      textColor={MAIN_RED}
      strokeColor={MAIN_YELLOW}
    >
      Loading
    </LoadingText>
  </BlackPageLayout>
);
