import React, { FC } from 'react';
import {
  GAME_HEADER_FONT_SIZE,
  GAME_HEADER_STROKE_COLOR,
  GAME_HEADER_TEXT_COLOR,
} from '@frontend/consts/styles';
import { StrokedText } from '@frontend/src/components/strokedText/strokedText';

export const GameHeader: FC<{ children: string | undefined }> = ({ children }) => (
  <StrokedText
    fontSize={GAME_HEADER_FONT_SIZE}
    textColor={GAME_HEADER_TEXT_COLOR}
    strokeColor={GAME_HEADER_STROKE_COLOR}>
    {children}
  </StrokedText>
);
