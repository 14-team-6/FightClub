import React, { HTMLAttributes } from 'react';
import styled from 'styled-components';
import { MAIN_RED, MAIN_YELLOW, MAIN_TITLE_SIZE } from '../../../consts/styles';

const H1 = styled.h1`
  font-family: Pixeboy, serif;
  color: ${MAIN_RED};
  font-size: ${MAIN_TITLE_SIZE};
  text-shadow:
    0 -8px 0 ${MAIN_YELLOW},
    -1px 0 ${MAIN_YELLOW},
    -1px -1px ${MAIN_YELLOW},
    0 -1px ${MAIN_YELLOW};
`;

interface MainTitleProps extends HTMLAttributes<HTMLHeadingElement> {
  text?: string;
}

const MainTitle: React.FC<MainTitleProps> = ({ text = 'Fight club' }) => {
  return (
    <H1>{text}</H1>
  );
};

export default MainTitle;
