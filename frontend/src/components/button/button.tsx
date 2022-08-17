import React, { ButtonHTMLAttributes } from 'react';
import styled from 'styled-components';

const Button = styled.button`
  cursor: pointer;
  font-size: ${({ theme }) => theme.fontSizes.nav};
  background-color: transparent;
  text-shadow: 0 2px 0 ${({ theme }) => theme.colors.mainBlue};
  border: none;
  color:  ${({ theme }) => theme.colors.mainYellow};
  margin-right: 15px;
  margin-left: 15px;
  margin-top: 15px;
  display: flex;
  position: relative;

  &::before {
    content: "";
    text-shadow: 0 2px 0 ${({ theme }) => theme.colors.mainRed};
    width: 15px;
    display: block;
    position: absolute;
    left: -15px;
  }

  &:hover,
  &:focus,
  &.active {
    text-shadow: 0 2px 0 ${({ theme }) => theme.colors.mainRed};

    &::before {
      content: "*";
      font-size: ${({ theme }) => theme.fontSizes.nav};
      color: ${({ theme }) => theme.colors.mainYellow};
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
}) => (
  <Button {...props}>{text}</Button>
);

export default React.memo(ButtonElement);
