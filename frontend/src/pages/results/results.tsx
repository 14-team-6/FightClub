import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import MainLayout from '@frontend/src/layouts/mainLayout';
import ButtonElement from '@frontend/src/components/button/button';
import MainTitle from '@frontend/src/components/mainTitle/mainTitle';
import Kitten from '@frontend/src/components/kitten/kitten';
import { KITTEN_HEIGHT, KITTEN_WIDTH } from '@frontend/consts/styles';
import { Leaders } from './components/leaders';

const mock = [
  {
    id: 1,
    name: 'stan',
    score: 3000000,
  },
  {
    id: 2,
    name: 'rui',
    score: 28000,
  },
  {
    id: 3,
    name: 'joao',
    score: 12900,
  },
  {
    id: 4,
    name: 'maria',
    score: 7800,
  },
  {
    id: 5,
    name: 'leonor',
    score: 5800,
  },
  {
    id: 6,
    name: 'duarte',
    score: 4000,
  },
  {
    id: 7,
    name: 'pedro',
    score: 2400,
  },
  {
    id: 8,
    name: 'stan',
    score: 30000,
  },
];

const Wrapper = styled.div`
  display: flex;
  height: 100vh;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const WrapperContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Footer = styled.div`
  position: absolute;
  top: calc(100vh - ${KITTEN_HEIGHT}px);
  width: 100%;
  height: ${KITTEN_HEIGHT}px;
  padding: 0 220px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const ResultsImpl: FC = () => {
  const navigate = useNavigate();

  return (
    <MainLayout>
      <Wrapper>
        <WrapperContent>
          <MainTitle text={'Leaders'}/>
          <Leaders items={mock}/>
          <ButtonElement type="button" text="Back" onClick={() => navigate(-1)}/>
        </WrapperContent>
      </Wrapper>
      <Footer>
        <Kitten direction="right" sprite={1} width={KITTEN_WIDTH} height={KITTEN_HEIGHT}/>
        <Kitten direction="left" sprite={4} width={KITTEN_WIDTH} height={KITTEN_HEIGHT}/>
      </Footer>
    </MainLayout>
  );
};

export const Results = React.memo(ResultsImpl);
