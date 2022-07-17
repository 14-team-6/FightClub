import React, { ForwardedRef, InputHTMLAttributes } from 'react';
import styled from 'styled-components';
import { FieldError } from 'react-hook-form';
import {
  MAIN_BLUE,
  MAIN_FONT_SIZE, MAIN_RED, MAIN_WHITE, MAIN_YELLOW,
} from '../../../consts/styles';

const Input = styled.input`
  margin: 8px 0;
  height: 42px;
  background-color: ${MAIN_YELLOW};
  font-weight: 400;
  font-size: ${MAIN_FONT_SIZE};
  border: 6px solid ${MAIN_RED};
  padding-left: 6px;
  max-width: 205px;

  &:focus {
    border: 6px solid ${MAIN_BLUE};
  }
`;

const Span = styled.span`
  color: ${MAIN_WHITE};
  max-width: 205px;
`;

const Wrapper = styled.span`
  display: flex;
  justify-content: end;
  flex-direction: column;
`;

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  placeholder: string,
  required?: boolean,
  type: string,
  value?: string,
  ref?: ForwardedRef<any>,
  error?: FieldError,
}

const InputElement: React.FC<InputProps> = React.forwardRef(({
  error,
  ...props
}, ref) => (
  <Wrapper>
    <Input ref={ref} {...props} />
    <Span>{error?.message}</Span>
  </Wrapper>
));

export default React.memo(InputElement);
