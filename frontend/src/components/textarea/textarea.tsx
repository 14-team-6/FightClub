import React, { ForwardedRef, TextareaHTMLAttributes } from 'react';
import styled from 'styled-components';
import {  MAIN_FONT_SIZE } from '../../../consts/styles';

const Textarea = styled.textarea`
  margin: 8px 0;
  background-color: ${({ theme }) => theme.colors.mainWhite};
  font-weight: 400;
  font-size: ${MAIN_FONT_SIZE};
  border: 6px solid ${({ theme }) => theme.colors.mainYellow};
  padding-left: 6px;
  max-width: 70%;
  resize: none;

  &:focus {
    border: 6px solid ${({ theme }) => theme.colors.mainBlue};
  }
`;

const Wrapper = styled.span`
  display: flex;
  justify-content: end;
  flex-direction: column;
`;

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
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
