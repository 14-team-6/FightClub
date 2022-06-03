import React, { ButtonHTMLAttributes } from 'react';
import styled from 'styled-components';
import {
  INPUT_BORDER_BLUE, INPUTS_FONT_SIZE, MAIN_RED, MAIN_YELLOW,
} from '../../../consts/styles';

const Button = styled.button`
  cursor: pointer;
  font-size: ${INPUTS_FONT_SIZE};
  background-color: transparent;
  text-shadow: 0 2px 0 ${INPUT_BORDER_BLUE};
  border: none;
  color: ${MAIN_YELLOW};
  margin-right: 15px;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 10px;

  &::before {
    content: "";
    text-shadow: 0 2px 0 ${MAIN_RED};
    width: 15px;
    height: 30px;
    display: block;
  }

  &:hover {
    ${Button} {
      text-shadow: 0 2px 0 ${MAIN_RED};
    }

    &::before {
      content: "*";
      font-size: ${INPUTS_FONT_SIZE};
      text-shadow: 0 2px 0 ${MAIN_RED};
      color: ${MAIN_YELLOW};
      display: block;
    }
  }
`;

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string,
  type: 'button' | 'submit' | 'reset' | undefined,
}

const ButtonElement: React.FC<ButtonProps> = ({
  text,
  ...props
}) => {
  return <Wrapper><Button {...props}>{text}</Button></Wrapper>;
};

export default React.memo(ButtonElement);
