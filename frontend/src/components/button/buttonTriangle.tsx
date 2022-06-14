import React, {
  FC,
  MouseEventHandler,
  useMemo,
} from 'react';
import styled from 'styled-components';
import classNamesBuild from 'classnames';
import { INPUT_BORDER_BLUE, MAIN_RED, MAIN_YELLOW } from '../../../consts/styles';

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
  border-bottom: 20px solid ${(props) => { return props.isActive ? MAIN_RED : INPUT_BORDER_BLUE; }};
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
    border-bottom: 16px solid ${(props) => { return props.isActive ? MAIN_RED : INPUT_BORDER_BLUE; }};

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

const ButtonTriangleImpl:FC<ButtonTriangleProps> = (props) => {
  const classNames = useMemo(() => {
    const classNamesTmp = {
      up: props.direction === ButtonTriangleDirection.UP,
      down: props.direction === ButtonTriangleDirection.DOWN,
      small: props.size === ButtonTriangleSize.SMALL,
    };
    return classNamesBuild(classNamesTmp);
  }, [props.direction, props.size]);

  return (
      <ButtonTriangleStyled onClick={props.onClick} isActive={props.isActive}
                                 className={`${props.className} ${classNames}`}/>
  );
};

export const ButtonTriangle = React.memo(ButtonTriangleImpl);
