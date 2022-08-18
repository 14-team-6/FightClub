import React, { HTMLAttributes } from 'react';
import { useSelector } from 'react-redux';
import { selectThemeData } from '@frontend/src/selectors/theme';
import { StrokedText } from '../strokedText/strokedText';

interface MainTitleProps extends HTMLAttributes<HTMLHeadingElement> {
  text?: string;
}

const MainTitle: React.FC<MainTitleProps> = (props) => {
  const theme = useSelector(selectThemeData);
  const { text = 'Fight Club', ...rest } = props;

  return (
    <StrokedText
      fontSize={theme.fontSizes.mainTitle}
      textColor={theme.colors.mainRed}
      strokeColor={theme.colors.mainYellow}
      { ...rest }
    >
      {text}
    </StrokedText>
  );
};

export default MainTitle;
