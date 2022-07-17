import React, { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import MainLayout from '@frontend/src/layouts/mainLayout';
import ButtonElement from '@frontend/src/components/button/button';
import MainTitle from '@frontend/src/components/mainTitle/mainTitle';
import Kitten from '@frontend/src/components/kitten/kitten';
import { KITTEN_HEIGHT, KITTEN_WIDTH } from '@frontend/consts/styles';
import leaderboardService, { LeaderItem } from '@frontend/services/leaderboardService';
import { SortOrder, SortParams } from '@frontend/src/pages/results/components/sortBlock';
import { useIsSSR } from '@frontend/src/hooks/useIsSSR';
import { Leaders } from './components/leaders';

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
  const isSSR = useIsSSR();

  const navigate = useNavigate();
  const [leaders, setLeaders] = useState<LeaderItem[]>([]);

  useEffect(() => {
    leaderboardService.getLeaders()
      .then((items: LeaderItem[]) => setLeaders(items));
  }, [isSSR]);

  const handleSort = (sortBy: SortParams) => {
    setLeaders([...leaders.sort((a, b) => {
      if (sortBy.sortOrder === SortOrder.ASC) {
        return a[sortBy.sortField] > b[sortBy.sortField] ? 1 : -1;
      }
      return a[sortBy.sortField] < b[sortBy.sortField] ? 1 : -1;
    })]);
  };

  return (
    <MainLayout>
      <Wrapper>
        <WrapperContent>
          <MainTitle text={'Leaders'}/>
          <Leaders handleSortCallback={handleSort} items={leaders}/>
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
