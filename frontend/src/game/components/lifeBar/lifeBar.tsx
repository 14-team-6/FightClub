import React, { FC } from 'react';
import styled from 'styled-components';
import { MAIN_GREEN, MAIN_RED, MAIN_WHITE } from '@frontend/consts/styles';
import { LifeBarProps, LifeBarTypes } from '../../types';
import { useSelector } from 'react-redux';

const LifeBarWrap = styled.div`
  width: 300px;
  display: flex;
  flex-direction: column;
  align-items: ${({ lifeType }: Partial<LifeBarProps>) => (lifeType === LifeBarTypes.IAM ? 'flex-start' : 'flex-end')};
`;

const LifeBarBar = styled.div<Partial<LifeBarProps>>`
  width: 300px;
  height: 30px;
`;

const LifeBarBarImpl: FC<Pick<LifeBarProps, 'lifePercentPropName'>> = ({ lifePercentPropName }) => {
  const lifePercent = useSelector((state: any) => { return state[lifePercentPropName]; });
  const style = {background: `linear-gradient(to right,
  ${MAIN_GREEN} ${lifePercent}%,
  ${MAIN_RED} 0% 100%)`};
  return (
    <LifeBarBar style={style} lifePercent={lifePercent}/>
  );
};

const LifeBarName = styled.div`
  font-size: 30px;
  color: ${MAIN_WHITE};
`;

const LifeBarImpl: FC<LifeBarProps> = ({ name, lifeType, lifePercentPropName }) => {
  return (
    <LifeBarWrap lifeType={lifeType}>
      <LifeBarBarImpl lifePercentPropName={lifePercentPropName}/>
      <LifeBarName>{name}</LifeBarName>
    </LifeBarWrap>
  );
};

export const LifeBar = React.memo(LifeBarImpl);
