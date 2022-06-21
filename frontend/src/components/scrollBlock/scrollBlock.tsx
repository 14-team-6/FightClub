import React, { FC } from 'react';
import styled from 'styled-components';
import {
  ButtonTriangle,
  ButtonTriangleDirection,
  ButtonTriangleSize,
} from '@frontend/src/components/button/buttonTriangle';

const WrapScroll = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 34px;
  margin: 5px 0;
`;

const ScrollBlockImpl: FC = () => {
  const onClick = (direction: string) => () => {
    console.log(`direction: ${direction}`); // eslint-disable-line no-console
  };

  return (
    <WrapScroll>
      <ButtonTriangle onClick={onClick('up')} isActive={true} size={ButtonTriangleSize.BIG}
                      direction={ButtonTriangleDirection.UP} />
      <ButtonTriangle onClick={onClick('down')} size={ButtonTriangleSize.BIG}
                      direction={ButtonTriangleDirection.DOWN} />
    </WrapScroll>
  );
};

export const ScrollBlock = React.memo(ScrollBlockImpl);
