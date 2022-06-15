import React, { FC } from 'react';
import styled from 'styled-components';
import {
  ButtonTriangle,
  ButtonTriangleDirection,
  ButtonTriangleSize,
} from '@frontend/src/components/button/buttonTriangle';

type ScrollBlockProps = {
  className?: string,
};

const ScrollBlockImpl: FC<ScrollBlockProps> = ({ className }) => {
  const onClick = (direction: string) => {
    return () => {
      console.log(`direction: ${direction}`);
    };
  };

  return (
    <div className={ className }>
      <ButtonTriangle onClick={onClick('up')} isActive={true} size={ButtonTriangleSize.BIG}
                      direction={ButtonTriangleDirection.UP}/>
      <ButtonTriangle onClick={onClick('down')} size={ButtonTriangleSize.BIG}
                      direction={ButtonTriangleDirection.DOWN}/>
    </div>
  );
};

const ScrollBlockStyled = styled(ScrollBlockImpl)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 34px;
  margin: 5px 0;
`;

export const ScrollBlock = React.memo(ScrollBlockStyled);
