import React, { ReactNode, FC } from 'react';
import styled from 'styled-components';

const Wrap = styled.div`
  background-color: #000;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

type Props = {
  children?: ReactNode
};

export const BlackPageLayout: FC<Props> = ({ children }) => {
  return <Wrap>
    { children }
  </Wrap>;
};
