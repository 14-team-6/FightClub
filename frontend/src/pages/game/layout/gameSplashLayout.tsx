import React, { FC } from 'react';
import styled from 'styled-components';

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

type GameSplashProps = {
  children: React.ReactNode,
};

export const GameSplashLayout: FC<GameSplashProps> = ({ children }) => (
  <Paranja>
    <Wrap>
      {children}
    </Wrap>
  </Paranja>
);
