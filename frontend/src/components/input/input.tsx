import React, { ForwardedRef, InputHTMLAttributes } from 'react';
import styled from 'styled-components';
import { FieldError } from 'react-hook-form';
import {
  INPUTS_FONT_SIZE, MAIN_RED, MAIN_WHITE, MAIN_YELLOW, PIXEBOY,
} from '../../../consts/styles';

const Input = styled.input`
  font-family: ${PIXEBOY};
  margin: 8px 0;
  height: 42px;
  background-color: ${MAIN_YELLOW};
  font-weight: 400;
  font-size: ${INPUTS_FONT_SIZE};
  border: 6px solid ${MAIN_RED};
  padding-left: 6px;
  max-width: 205px;
`;

const Span = styled.span`
  font-family: ${PIXEBOY};
  color: ${MAIN_WHITE};
  max-width: 205px;
`;

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  placeholder: string,
  required?: boolean,
  type: string,
  value?: string,
  ref?: ForwardedRef<any>,
  error?: FieldError,
}

const InputElement: React.FC<InputProps> = React.forwardRef(({ error, ...props }, ref) => {
  return (
    <>
      <Input ref={ref} {...props}/>
      {error && <Span>{error.message}</Span>}
    </>
  );
});

export default React.memo(InputElement);
