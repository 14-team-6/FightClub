import React, { FC } from 'react';
import styled from 'styled-components';
import { ScrollBlock } from '@frontend/src/components/scrollBlock/scrollBlock';
import { LeaderItem, ListItem } from './leaderListItem';
import { SortBlock } from './sortBlock';

type LeadersProps = {
  items: Array<LeaderItem>,
  className?: string,
};

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
    <div className={ props.className }>
      <SortBlock/>
      <WrapOther>
        <WrapList>
          {props.items.map((leaderItem) => {
            return <ListItem key={leaderItem.id} name={leaderItem.name} score={leaderItem.score}/>;
          })}
        </WrapList>
        <ScrollBlock/>
      </WrapOther>
    </div>
  );
};

const LeadersImplStyled = styled(LeadersImpl)`
  display: flex;
  flex-direction: column;
  width: 334px;
`;

export const Leaders = React.memo(LeadersImplStyled);
