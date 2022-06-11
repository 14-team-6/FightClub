import React, {
  FC,
  MouseEventHandler,
  useEffect,
  useState,
} from 'react';
import styled, { createGlobalStyle } from 'styled-components';

enum ButtonTriangleState {
  general,
  active,
}

export enum ButtonTriangleDirection {
  up = 'up',
  down = 'down',
}

export enum ButtonTriangleSize {
  general,
  big,
}

type ButtonTriangleProps = {
  state?: ButtonTriangleState,
  direction: ButtonTriangleDirection,
  size: ButtonTriangleSize,
  className?: string,
  isActive?: Boolean,
  onClick: MouseEventHandler,
};

const GC = createGlobalStyle`
  .small {
    transform: scale(0.58);
  }

  .active {
    background: url("../../../public/img/buttonArrow-blue.svg");
  }

  .up {
    background-position: 0 0;
  }

  .down {
    background-position: 0 -22px;
  }
`;

const ButtonTriangleStyled = styled.div`
  background: url("../../../public/img/buttonArrow-red.svg");
  width: 34px;
  height: 20px;
`;

export const ButtonTriangle:FC<ButtonTriangleProps> = (props) => {
  const [active, setActive] = useState<Boolean>(false);
  const classNames = [];

  useEffect(() => {
    if (props.isActive) {
      setActive(props.isActive);
    }
  });

  if (props.direction === ButtonTriangleDirection.up) {
    classNames.push('up');
  } else {
    classNames.push('down');
  }
  if (active) {
    classNames.push('active');
  }
  if (props.size === ButtonTriangleSize.general) {
    classNames.push('small');
  }

  return (
    <><GC/><ButtonTriangleStyled onClick={props.onClick}
                                 className={`${props.className} ${classNames.join(' ')}`}/></>
  );
};
