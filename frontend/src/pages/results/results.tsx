import React, { FC } from 'react';
import styled from 'styled-components';
import MainLayout from '../../layouts/mainLayout';
import ButtonElement from '../../components/button/button';
import { Leaders } from './components/leaders';
import MainTitle from '../../components/mainTitle/mainTitle';
import kittenImg from '../../../public/img/Meow-Knight_Attack_2.png';

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
  justify-content: space-between;
`;

const WrapperContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: calc(100vh / 2 - 200px) 0 0;
`;

const Footer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  justify-self: flex-end;
`;

type KittenProps = {
  direction: string,
  sprite: number,
};

const Kitten = styled.div`
  width: 160px;
  height: 90px;
  margin: 0 120px;
  background: url(${kittenImg}) 0 ${(props: KittenProps) => {
  if (props.sprite === 1) {
    return '0';
  }
  return `-${(props.sprite - 1) * 90}`;
}}px;
  background-size: cover;
  transform: scale(${(props: KittenProps) => {
    return props.direction === 'right' ? '1' : '-1';
  }
}, 1);
`;

const ResultsImpl: FC = () => {
  return (
    <MainLayout>
      <Wrapper>
        <WrapperContent>
          <MainTitle text={'Leaders'}/>
          <Leaders items={mock}/>
          <ButtonElement type="button" text="Back"/>
        </WrapperContent>
        <Footer>
          <Kitten direction="right" sprite={1}/>
          <Kitten direction="left" sprite={4}/>
        </Footer>
      </Wrapper>
    </MainLayout>
  );
};

export const Results = React.memo(ResultsImpl);
