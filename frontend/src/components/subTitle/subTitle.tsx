import React, { HTMLAttributes } from 'react';
import { useSelector } from 'react-redux';
import { selectThemeData } from '@frontend/src/selectors/theme';
import { SUB_TITLE_SIZE } from '../../../consts/styles';
import { StrokedText } from '../strokedText/strokedText';

interface SubTitleProps extends HTMLAttributes<HTMLHeadingElement> {
  text?: string;
}

const SubTitle: React.FC<SubTitleProps> = ({ text }) => {
  const theme = useSelector(selectThemeData);

  return (
    <StrokedText
      fontSize={SUB_TITLE_SIZE}
      textColor={theme.colors.mainYellow}
      strokeColor={theme.colors.mainBlue}
    >
      {text}
    </StrokedText>
  );
};

export default SubTitle;
