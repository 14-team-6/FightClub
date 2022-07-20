import React, { FC, useState } from 'react';
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
  width: 360px;
  justify-content: center;
  margin: 0 0 10px;
`;

export enum SortField {
  NAME = 'name',
  SCORE = 'score',
}

export enum SortOrder {
  ASC = 'ASC',
  DESC = 'DESC',
}

export type SortParams = {
  sortField: SortField,
  sortOrder: SortOrder,
};

const SortBlockImpl: FC<{ handleSortCallback: Function }> = ({ handleSortCallback }) => {
  const [nameOrder, setNameOrder] = useState<SortOrder>(SortOrder.ASC);
  const [scoreOrder, setScoreOrder] = useState<SortOrder>(SortOrder.ASC);

  const onClick = (sortBy: SortParams) => () => {
    if (sortBy.sortField === SortField.SCORE) {
      setScoreOrder(scoreOrder === SortOrder.ASC ? SortOrder.DESC : SortOrder.ASC);
    } else {
      setNameOrder(nameOrder === SortOrder.ASC ? SortOrder.DESC : SortOrder.ASC);
    }
    handleSortCallback(sortBy);
  };

  return (
    <WrapScroll>
      <ButtonTriangleStyled
        onClick={onClick({ sortField: SortField.NAME, sortOrder: nameOrder })} isActive={true}
        size={ButtonTriangleSize.SMALL}
        direction={nameOrder === SortOrder.ASC ? ButtonTriangleDirection.UP : ButtonTriangleDirection.DOWN}/>
      <ButtonTriangleStyled
        onClick={onClick({ sortField: SortField.SCORE, sortOrder: scoreOrder })}
        size={ButtonTriangleSize.SMALL}
        direction={scoreOrder === SortOrder.ASC ? ButtonTriangleDirection.UP : ButtonTriangleDirection.DOWN}/>
    </WrapScroll>
  );
};

export const SortBlock = React.memo(SortBlockImpl);
