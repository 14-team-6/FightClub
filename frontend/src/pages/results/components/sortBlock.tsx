import React, { FC } from 'react';
import styled from 'styled-components';
import {
  ButtonTriangle,
  ButtonTriangleDirection,
  ButtonTriangleSize,
} from '@frontend/src/components/button/buttonTriangle';

const ButtonTriangleStyled = styled(ButtonTriangle)`
  &:first-child {
    margin: 0 15px 0 0;
  }

  &:last-child {
    margin: 0 0 0 15px;
  }
`;

const WrapScroll = styled.div`
  display: flex;
  flex-direction: row;
  width: 300px;
  justify-content: center;
  margin: 0 0 10px 0;
`;

const SortBlockImpl: FC = () => {
  const onClick = (sortBy: string) => () => {
    console.log(`sort by: ${sortBy}`); // eslint-disable-line no-console
  };

  return (
    <WrapScroll>
      <ButtonTriangleStyled onClick={onClick('name')} isActive={true}
                            size={ButtonTriangleSize.SMALL} direction={ButtonTriangleDirection.UP} />
      <ButtonTriangleStyled onClick={onClick('score')} size={ButtonTriangleSize.SMALL}
                            direction={ButtonTriangleDirection.DOWN} />
    </WrapScroll>
  );
};

export const SortBlock = React.memo(SortBlockImpl);
