import React, {
  FC,
  MouseEventHandler,
} from 'react';
import styled from 'styled-components';
import cx from 'classnames';

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
  'data-cy'?: string,
};

const ButtonTriangleStyled = styled.div<Partial<ButtonTriangleProps>>`
  position: relative;
  width: 0;
  height: 0;
  border-left: 17px solid transparent;
  border-right: 17px solid transparent;
  border-bottom: 20px solid ${({ isActive, theme }) => (isActive ? theme.colors.mainRed : theme.colors.mainBlue)};
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
    border-bottom: 12px solid ${({ theme }) => theme.colors.mainYellow};
  }

  &.small {
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-bottom: 16px solid ${({ isActive, theme }) => (isActive ? theme.colors.mainRed : theme.colors.mainBlue)};

    &.small::before {
      top: 5px;
      left: -5px;
      border-left: 5px solid transparent;
      border-right: 5px solid transparent;
      border-bottom: 8px solid ${({ theme }) => theme.colors.mainYellow};
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
    'data-cy': dataCY,
  } = props;
  return (
    <ButtonTriangleStyled
      onClick={onClick}
      isActive={isActive}
      data-cy={dataCY}
      className={`${className} ${cx({
        up: direction === ButtonTriangleDirection.UP,
        down: direction === ButtonTriangleDirection.DOWN,
        small: size === ButtonTriangleSize.SMALL,
      })}`} />
  );
};

export const ButtonTriangle = React.memo(ButtonTriangleImpl);
