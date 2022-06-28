import React, { FC } from 'react';
import styled from 'styled-components';
import { MAIN_GREEN, MAIN_RED, MAIN_WHITE } from '../../../consts/styles';
import { LifeBarProps, LifeBarTypes } from '../types';

const LifeBarWrap = styled.div`
  width: 300px;
  display: flex;
  flex-direction: column;
  align-items: ${({ lifeType }: Partial<LifeBarProps>) => (lifeType === LifeBarTypes.IAM ? 'flex-start' : 'flex-end')};
`;

const LifeBarBar = styled.div<Partial<LifeBarProps>>`
  width: 100%;
  height: 30px;
  background:
    linear-gradient(
      to right,
      ${MAIN_GREEN} ${(props) => props.lifePercent}%,
      ${MAIN_RED} 0% 100%
    );
`;

const LifeBarName = styled.div`
  font-family: Pixeboy, sans-serif;
  font-size: 30px;
  color: ${MAIN_WHITE};
`;

const LifeBarImpl: FC<LifeBarProps> = ({ name, lifeType, lifePercent }) => (
  <LifeBarWrap lifeType={lifeType}>
    <LifeBarBar lifePercent={lifePercent} />
    <LifeBarName>{name}</LifeBarName>
  </LifeBarWrap>
);

export const LifeBar = React.memo(LifeBarImpl);
