import React, { ReactNode, FC } from 'react';
import styled from 'styled-components';
import { MAIN_BLACK } from '../../consts/styles';

const Wrap = styled.div`
  background-color: ${MAIN_BLACK};
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
