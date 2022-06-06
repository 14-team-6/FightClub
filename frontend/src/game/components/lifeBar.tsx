import React, { FC } from 'react';
import styled from 'styled-components';
import { MAIN_GREEN, MAIN_RED, MAIN_WHITE } from '../../../consts/styles';

export enum LifeBarTypes {
  iam,
  enemy,
}

type LifeBarProps = {
  lifePercent: number,
  lifeType: LifeBarTypes,
  name: string
};

const LifeBarWrap = styled.div`
  width: 300px;
  display: flex;
  flex-direction: column;
  align-items: ${({ lifeType }: Partial<LifeBarProps>) => {
    return lifeType === LifeBarTypes.iam ? 'flex-start' : 'flex-end';
  }
};
`;

const LifeBarBar = styled.div`
  width: 100%;
  height: 30px;
  background: linear-gradient(to right,
    ${MAIN_GREEN} ${({ lifePercent }: Partial<LifeBarProps>) => { return lifePercent; }}%,
    ${MAIN_RED} 0% 100%
  );
`;

const LifeBarName = styled.div`
  font-family: Pixeboy, sans-serif;
  font-size: 30px;
  color: ${MAIN_WHITE};
`;

export const LifeBar: FC<LifeBarProps> = ({ name, lifeType, lifePercent }) => {
  return <LifeBarWrap lifeType={lifeType}>
    <LifeBarBar lifePercent={lifePercent}/>
    <LifeBarName>{name}</LifeBarName>
  </LifeBarWrap>;
};
