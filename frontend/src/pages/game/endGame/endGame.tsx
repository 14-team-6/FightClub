import React, { FC } from 'react';
import styled from 'styled-components';
import { MAIN_RED, MAIN_YELLOW } from '@frontend/consts/styles';
import { StrokedText } from '../../../components/strokedText/strokedText';
import { GameLayout } from '../../../layouts/gameLayout';

const Paranja = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0 0 0 / 40%);
`;

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

export enum EndGameType {
  'WIN' = 'You win!',
  'LOOSE' = 'You loose!',
}

type EndGameProps = {
  endGameType: EndGameType,
};

export const EndGame: FC<EndGameProps> = (props: EndGameProps) => (
  <GameLayout>
    <Paranja>
      <Wrap>
        <StrokedText fontSize={'140px'} textColor={MAIN_RED} strokeColor={MAIN_YELLOW}>
          {props.endGameType}
        </StrokedText>
      </Wrap>
    </Paranja>
  </GameLayout>
);
