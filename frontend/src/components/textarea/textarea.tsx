import React, { ForwardedRef, TextareaHTMLAttributes } from 'react';
import styled from 'styled-components';
import {
  MAIN_BLUE,
  MAIN_FONT_SIZE,
  MAIN_RED,
  MAIN_YELLOW,
} from '../../../consts/styles';

const Textarea = styled.textarea`
  font-family: Pixeboy, sans-serif;
  margin: 8px 0;
  background-color: ${MAIN_YELLOW};
  font-weight: 400;
  font-size: ${MAIN_FONT_SIZE};
  border: 6px solid ${MAIN_RED};
  padding-left: 6px;
  max-width: 70%;
  resize: none;

  &:focus {
    border: 6px solid ${MAIN_BLUE};
  }
`;

const Wrapper = styled.span`
  display: flex;
  justify-content: end;
  flex-direction: column;
`;

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  placeholder: string,
  ref?: ForwardedRef<any>,
}

const TextareaElement: React.FC<TextareaProps> = React.forwardRef(({
  ...props
}, ref) => (
  <Wrapper>
    <Textarea ref={ref} {...props} />
  </Wrapper>
));

export default React.memo(TextareaElement);
