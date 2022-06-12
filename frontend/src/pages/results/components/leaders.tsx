import React, { FC } from 'react';
import styled from 'styled-components';
import { LeaderItem, ListItem } from './leaderListItem';
import { ScrollBlock } from '../../../components/scrollBlock/scrollBlock';
import { SortBlock } from './sortBlock';

type LeadersProps = {
  items: Array<LeaderItem>,
};

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  width: 334px;
`;

const WrapOther = styled.div`
  display: flex;
  flex-direction: row;
`;

const WrapList = styled.div`
  width: 100%;
  height: 150px;
  overflow-y: hidden;
`;

const LeadersImpl: FC<LeadersProps> = (props) => {
  return (
    <Wrap>
      <SortBlock/>
      <WrapOther>
        <WrapList>
          {props.items.map((leaderItem) => {
            return <ListItem key={leaderItem.id} name={leaderItem.name} score={leaderItem.score}/>;
          })}
        </WrapList>
        <ScrollBlock/>
      </WrapOther>
    </Wrap>
  );
};

export const Leaders = React.memo(LeadersImpl);
