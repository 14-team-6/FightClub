import React, { FC } from 'react';
import styled from 'styled-components';
import { ButtonTriangle, ButtonTriangleDirection, ButtonTriangleSize } from '../../../components/button/buttonTriangle';

type SortBlockProps = {
  className?: string,
};

const SortBlockImpl: FC<SortBlockProps> = (props) => {
  const onClick = (sortBy: string) => {
    return () => {
      console.log(`sort by: ${sortBy}`);
    };
  };

  return (
    <div className={ props.className }>
      <ButtonTriangle onClick={onClick('name')} isActive={true} className="button-triangle"
                      size={ButtonTriangleSize.SMALL} direction={ButtonTriangleDirection.UP}/>
      <ButtonTriangle onClick={onClick('score')} className="button-triangle" size={ButtonTriangleSize.SMALL}
                      direction={ButtonTriangleDirection.DOWN}/>
    </div>
  );
};

const SortBlockStyled = styled(SortBlockImpl)`
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

export const SortBlock = React.memo(SortBlockStyled);
