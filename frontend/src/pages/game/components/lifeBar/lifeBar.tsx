import React, { FC } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { MAIN_GREEN, MAIN_RED, MAIN_WHITE } from '@frontend/consts/styles';
import { LifeBarProps, LifeBarTypes } from '../../../../game/types';

const LifeBarWrap = styled.div`
  width: 300px;
  display: flex;
  flex-direction: column;
  align-items: ${({ lifeType }: Partial<LifeBarProps>) => (lifeType === LifeBarTypes.IAM ? 'flex-start' : 'flex-end')};
`;

const LifeBarPercent = styled.div<Partial<LifeBarProps>>`
  width: 300px;
  height: 30px;
`;

const LifeBarCharacterName = styled.div`
  font-size: 30px;
  color: ${MAIN_WHITE};
`;

const LifeBarImpl: FC<LifeBarProps> = ({ name, lifeType, lifePercentPropName }) => {
  const lifePercent = useSelector((state: any) => state.gameState[lifePercentPropName]);
  const style = {
    background: `linear-gradient(to right,
  ${MAIN_GREEN} ${lifePercent}%,
  ${MAIN_RED} 0% 100%)`,
  };
  return (
    <LifeBarWrap lifeType={lifeType}>
      <LifeBarPercent style={style} lifePercent={lifePercent}/>
      <LifeBarCharacterName>{name}</LifeBarCharacterName>
    </LifeBarWrap>
  );
};

export const LifeBar = React.memo(LifeBarImpl);
