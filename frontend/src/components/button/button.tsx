import React, { ButtonHTMLAttributes } from 'react';
import styled from 'styled-components';
import {
  INPUT_BORDER_BLUE, INPUTS_FONT_SIZE, MAIN_YELLOW, PIXEBOY,
} from '../../../consts/styles';

const Button = styled.button`
  cursor: pointer;
  margin-top: 10px;
  font-family: ${PIXEBOY};
  font-size: ${INPUTS_FONT_SIZE};
  background-color: transparent;
  text-shadow: 0 2px 0 ${INPUT_BORDER_BLUE};
  border: none;
  color: ${MAIN_YELLOW};
`;

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string,
  type: 'button' | 'submit' | 'reset' | undefined,
}

const ButtonElement: React.FC<ButtonProps> = ({ text, ...props }) => {
  return <Button {...props}>{text}</Button>;
};

export default React.memo(ButtonElement);
