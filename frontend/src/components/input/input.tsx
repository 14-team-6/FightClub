import React, { InputHTMLAttributes } from 'react';
import styled from 'styled-components';
import {
  INPUTS_FONT_SIZE, MAIN_RED, MAIN_YELLOW, PIXEBOY,
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

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  placeholder: string,
  required?: boolean,
  type: string,
}

const InputElement: React.FC<InputProps> = (props) => {
  return <Input {...props}/>;
};

export default InputElement;
