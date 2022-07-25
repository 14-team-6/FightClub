import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import {
  MAIN_BACKGROUND,
  MAIN_RED,
  MAIN_WHITE,
  MAIN_YELLOW,
} from '@frontend/consts/styles';
import { LifeBar } from '@frontend/src/pages/game/components/lifeBar/lifeBar';
import { LifeBarTypes } from '@frontend/src/game/types';
import { StrokedText } from '@frontend/src/components/strokedText/strokedText';
import { RootState } from '@frontend/src/store/store';
import Canvas from '../canvas';

const Wrap = styled.div`
  background: url(${MAIN_BACKGROUND}) no-repeat;
  background-size: cover;
  width: 100%;
  height: 100vh;
`;

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

const Hud = styled.div`
  position: fixed;
  margin: 24px 20px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: calc(100% - 40px);
`;

const RoundWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const RoundString = styled.h1`
  color: ${MAIN_WHITE};
  font-size: 30px;
`;

const FightPage: React.FC = () => {
  const roundName = useSelector((state: RootState) => state.gameState.roundName);

  const player = useSelector((state: RootState) => state.user);
  const playerName = player.displayName ?? player.login;

  return (
    <Wrap>
      <Hud>
        <LifeBar lifePercentPropName={'myLifePercent'} lifeType={LifeBarTypes.IAM} name={playerName}/>
        <RoundWrap>
          <StrokedText fontSize={'40px'} textColor={MAIN_RED} strokeColor={MAIN_YELLOW}>{roundName}</StrokedText>
          <RoundString>vs</RoundString>
        </RoundWrap>
        <LifeBar lifePercentPropName={'enemyLifePercent'} lifeType={LifeBarTypes.ENEMY} name={'Cat Buster'}/>
      </Hud>
      <Wrapper>
        <Canvas/>
      </Wrapper>
    </Wrap>
  );
};

export default React.memo(FightPage);
