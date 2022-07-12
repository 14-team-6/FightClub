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

type ScrollBlockProps = {
  handleScrollButton: Function,
};

export enum ScrollDirection {
  UP = 'UP',
  DOWN = 'DOWN',
}

const ScrollBlockImpl: FC<ScrollBlockProps> = ({ handleScrollButton }) => {
  const onClick = (direction: ScrollDirection) => () => {
    handleScrollButton(direction);
  };

  return (
    <WrapScroll>
      <ButtonTriangle onClick={onClick(ScrollDirection.UP)} isActive={true} size={ButtonTriangleSize.BIG}
                      direction={ButtonTriangleDirection.UP} />
      <ButtonTriangle onClick={onClick(ScrollDirection.DOWN)} size={ButtonTriangleSize.BIG}
                      direction={ButtonTriangleDirection.DOWN} />
    </WrapScroll>
  );
};

export const ScrollBlock = React.memo(ScrollBlockImpl);
