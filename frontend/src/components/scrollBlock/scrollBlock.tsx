import React, { FC } from 'react';
import styled from 'styled-components';
import { ButtonTriangle, ButtonTriangleDirection, ButtonTriangleSize } from '../button/buttonTriangle';

const WrapScroll = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 34px;
  margin: 5px 0;
`;

const ScrollBlockImpl: FC = () => {
  const onClick = (direction: string) => {
    return () => {
      console.log(`direction: ${direction}`);
    };
  };

  return (
    <WrapScroll>
      <ButtonTriangle onClick={onClick('up')} isActive={true} size={ButtonTriangleSize.BIG}
                      direction={ButtonTriangleDirection.UP}/>
      <ButtonTriangle onClick={onClick('down')} size={ButtonTriangleSize.BIG}
                      direction={ButtonTriangleDirection.DOWN}/>
    </WrapScroll>
  );
};

export const ScrollBlock = React.memo(ScrollBlockImpl);
