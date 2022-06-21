import React from 'react';
import styled from 'styled-components';
import Canvas from '../../components/canvas/canvas';
import { GameLayout } from '../../layouts/gameLayout';

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

const FightPage: React.FC = () => (
    <GameLayout>
      <Wrapper>
        <Canvas/>
      </Wrapper>
    </GameLayout>
);

export default FightPage;
