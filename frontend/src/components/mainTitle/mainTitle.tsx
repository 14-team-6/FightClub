import React, { HTMLAttributes } from 'react';
import { MAIN_RED, MAIN_TITLE_SIZE, MAIN_YELLOW } from '../../../consts/styles';
import { StrokedText } from '../strokedText/strokedText';

interface MainTitleProps extends HTMLAttributes<HTMLHeadingElement> {
  text?: string;
}

const MainTitle: React.FC<MainTitleProps> = (props) => {
  const { text = 'Fight Club', ...rest } = props;
  return (
    <StrokedText
      fontSize={MAIN_TITLE_SIZE}
      textColor={MAIN_RED}
      strokeColor={MAIN_YELLOW}
      { ...rest }
    >
      {text}
    </StrokedText>
  );
};

export default MainTitle;
