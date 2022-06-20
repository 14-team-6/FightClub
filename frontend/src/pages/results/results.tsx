import React, { FC } from 'react';
import styled from 'styled-components';
import MainLayout from '@frontend/src/layouts/mainLayout';
import ButtonElement from '@frontend/src/components/button/button';
import MainTitle from '@frontend/src/components/mainTitle/mainTitle';
import kittenImg from '@frontend/public/img/attack-right-frame-sm.png';
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
const kittenHeight = 131;

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
  top: calc(100vh - ${kittenHeight}px);
  width: 100%;
  height: ${kittenHeight}px;
  padding: 0 100px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

type KittenProps = {
  direction: string,
  sprite: number,
};

const Kitten = styled.div`
  width: 160px;
  height: ${kittenHeight}px;
  margin: 0 120px;
  background: url(${kittenImg}) 0 ${({ sprite }: KittenProps) => {
  if (sprite === 1) {
    return '0';
  }
  return `-${(sprite - 1) * kittenHeight}`;
}}px;
  transform: scale(${({ direction }: KittenProps) => (direction === 'right' ? '1' : '-1')
}, 1);
`;

const ResultsImpl: FC = () => (
  <MainLayout>
    <Wrapper>
      <WrapperContent>
        <MainTitle text={'Leaders'} />
        <Leaders items={mock} />
        <ButtonElement type="button" text="Back" />
      </WrapperContent>
    </Wrapper>
    <Footer>
      <Kitten direction="right" sprite={1} />
      <Kitten direction="left" sprite={4} />
    </Footer>
  </MainLayout>
);

export const Results = React.memo(ResultsImpl);
