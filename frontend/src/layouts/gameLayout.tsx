import React, { FC } from 'react';
import styled from 'styled-components';
import { LifeBar, LifeBarTypes } from '../game/components/lifeBar';
import { StrokedText } from '../components/strokedText/strokedText';
import { MAIN_RED, MAIN_WHITE, MAIN_YELLOW } from '../../consts/styles';

type GameProps = {
  children: React.ReactNode,
};

const Wrap = styled.div`
  background: url("../../public/img/mainBackground.png") no-repeat;
  background-size: cover;
  width: 100%;
  height: 100vh;
`;

const Hud = styled.div`
  position: absolute;
  margin: 24px 20px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: calc(100% - 40px);
`;

const RoundWrap = styled.div`
  font-family: Pixeboy, sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const RoundString = styled.h1`
  color: ${MAIN_WHITE};
  font-size: 30px;
`;

export const GameLayout: FC<GameProps> = ({ children }) => {
  return <Wrap>
  <Hud>
    <LifeBar lifePercent={0} lifeType={LifeBarTypes.iam} name={'Stan'}/>
    <RoundWrap>
      <StrokedText fontSize={'40px'} textColor={MAIN_RED} strokeColor={MAIN_YELLOW}>Round 1</StrokedText>
      <RoundString>vs</RoundString>
    </RoundWrap>
    <LifeBar lifePercent={70} lifeType={LifeBarTypes.enemy} name={'Joao'}/>
  </Hud>
      {children}
  </Wrap>;
};
