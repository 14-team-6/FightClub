import React, { HTMLAttributes } from 'react';
import { useSelector } from 'react-redux';
import { selectThemeData } from '@frontend/src/selectors/theme';
import { StrokedText } from '../strokedText/strokedText';

interface MainTitleProps extends HTMLAttributes<HTMLHeadingElement> {
  text?: string;
}

const MainTitle: React.FC<MainTitleProps> = ({ text = 'Fight club' }) => {
  const theme = useSelector(selectThemeData);

  return (
    <StrokedText
      fontSize={theme.fontSizes.mainTitle}
      textColor={theme.colors.mainRed}
      strokeColor={theme.colors.mainYellow}
    >
      {text}
    </StrokedText>
  );
};

export default MainTitle;
