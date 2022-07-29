import React, { HTMLAttributes } from 'react';
import { StrokedText } from '../strokedText/strokedText';
import { useSelector } from 'react-redux';
import { selectThemeData } from '@frontend/src/selectors/theme';

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
}  

export default MainTitle;
