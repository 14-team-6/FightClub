import React, { FC } from 'react';
import styled from 'styled-components';
import { ButtonTriangle, ButtonTriangleDirection, ButtonTriangleSize } from '../../../components/button/buttonTriangle';

const WrapSort = styled.div`
  display: flex;
  flex-direction: row;
  width: 300px;
  justify-content: center;
  margin: 0 0 10px 0;

  .button-triangle:first-child {
    margin: 0 7px 0 0;
  }

  .button-triangle:last-child {
    margin: 0 0 0 7px;
  }
`;

const SortBlockImpl: FC = () => {
  const onClick = (sortBy: string) => {
    return () => {
      console.log(`sort by: ${sortBy}`);
    };
  };

  return (
    <WrapSort>
      <ButtonTriangle onClick={onClick('name')} isActive={true} className="button-triangle"
                      size={ButtonTriangleSize.SMALL} direction={ButtonTriangleDirection.UP}/>
      <ButtonTriangle onClick={onClick('score')} className="button-triangle" size={ButtonTriangleSize.SMALL}
                      direction={ButtonTriangleDirection.DOWN}/>
    </WrapSort>
  );
};

export const SortBlock = React.memo(SortBlockImpl);
