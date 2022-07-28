import React, { HTMLAttributes } from 'react';
import { SUB_TITLE_SIZE, MAIN_YELLOW, MAIN_BLUE } from '../../../consts/styles';
import { StrokedText } from '../strokedText/strokedText';

interface SubTitleProps extends HTMLAttributes<HTMLHeadingElement> {
  text?: string;
}

const SubTitle: React.FC<SubTitleProps> = ({ text }) => (
  <StrokedText
    fontSize={SUB_TITLE_SIZE}
    textColor={MAIN_YELLOW}
    strokeColor={MAIN_BLUE}
  >
    {text}
  </StrokedText>
);

export default SubTitle;
