import React, {
  FC,
  MouseEventHandler,
} from 'react';
import styled from 'styled-components';
import cx from 'classnames';
import { INPUT_BORDER_BLUE, MAIN_RED, MAIN_YELLOW } from '@frontend/consts/styles';

export enum ButtonTriangleDirection {
  UP,
  DOWN,
}

export enum ButtonTriangleSize {
  SMALL,
  BIG,
}

type ButtonTriangleProps = {
  direction: ButtonTriangleDirection,
  size: ButtonTriangleSize,
  className?: string,
  isActive?: Boolean,
  onClick: MouseEventHandler,
};

const ButtonTriangleStyled = styled.div<Partial<ButtonTriangleProps>>`
  position: relative;
  width: 0;
  height: 0;
  border-left: 17px solid transparent;
  border-right: 17px solid transparent;
  border-bottom: 20px solid ${({ isActive }) => (isActive ? MAIN_RED : INPUT_BORDER_BLUE)};
  cursor: pointer;

  &::before {
    content: "";
    position: absolute;
    top: 5px;
    left: -10px;
    width: 0;
    height: 0;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-bottom: 12px solid ${MAIN_YELLOW};
  }

  &.small {
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-bottom: 16px solid ${({ isActive }) => (isActive ? MAIN_RED : INPUT_BORDER_BLUE)};

    &.small::before {
      top: 5px;
      left: -5px;
      border-left: 5px solid transparent;
      border-right: 5px solid transparent;
      border-bottom: 8px solid ${MAIN_YELLOW};
    }
  }

  &.down {
    transform: scale(-1);
  }
`;

const ButtonTriangleImpl: FC<ButtonTriangleProps> = (props) => {
  const {
    className,
    direction,
    size,
    onClick,
    isActive,
  } = props;
  return (
    <ButtonTriangleStyled
      onClick={onClick}
      isActive={isActive}
      className={`${className} ${cx({
        up: direction === ButtonTriangleDirection.UP,
        down: direction === ButtonTriangleDirection.DOWN,
        small: size === ButtonTriangleSize.SMALL,
      })}`} />
  );
};

export const ButtonTriangle = React.memo(ButtonTriangleImpl);
