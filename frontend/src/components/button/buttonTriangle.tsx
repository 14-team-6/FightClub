import React, {
  FC,
  MouseEventHandler,
  useEffect, useMemo,
  useState,
} from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import buttonArrowBlue from '../../../public/img/buttonArrow-blue.svg';
import buttonArrowRed from '../../../public/img/buttonArrow-red.svg';

export enum ButtonTriangleDirection {
  UP = 'UP',
  DOWN = 'DOWN',
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

const GC = createGlobalStyle`
  .small {
    transform: scale(0.58);
  }

  .active {
    background: url(${buttonArrowBlue});
  }

  .up {
    background-position: 0 0;
  }

  .down {
    background-position: 0 -22px;
  }
`;

const ButtonTriangleStyled = styled.div`
  background: url(${buttonArrowRed});
  width: 34px;
  height: 20px;
`;

const ButtonTriangleImpl:FC<ButtonTriangleProps> = (props) => {
  const [active, setActive] = useState<Boolean>(false);

  useEffect(() => {
    if (props.isActive) {
      setActive(props.isActive);
    }
  });

  const classNames = useMemo(() => {
    const classNamesTmp = [];
    if (props.direction === ButtonTriangleDirection.UP) {
      classNamesTmp.push('up');
    } else {
      classNamesTmp.push('down');
    }
    if (active) {
      classNamesTmp.push('active');
    }
    if (props.size === ButtonTriangleSize.SMALL) {
      classNamesTmp.push('small');
    }
    return classNamesTmp.join(' ');
  }, [props.direction, props.size, active]);

  return (
    <>
      <GC/>
      <ButtonTriangleStyled onClick={props.onClick}
                                 className={`${props.className} ${classNames}`}/>
    </>
  );
};

export const ButtonTriangle = React.memo(ButtonTriangleImpl);
