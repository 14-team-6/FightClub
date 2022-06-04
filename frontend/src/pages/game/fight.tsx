import React from 'react';
import styled from 'styled-components';
import Canvas from '../../components/canvas/canvas';

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

const FightPage: React.FC = () => {
  return (
    <Wrapper>
      <Canvas/>
    </Wrapper>
  );
};

export default FightPage;
