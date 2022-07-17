import React, { FC, useRef } from 'react';
import styled from 'styled-components';
import { ScrollBlock, ScrollDirection } from '@frontend/src/components/scrollBlock/scrollBlock';
import { LeaderItem, ListItem } from './leaderListItem';
import { SortBlock } from './sortBlock';

type LeadersProps = {
  items: Array<LeaderItem>,
  handleSortCallback: Function,
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
  const refScrollBlock = useRef<HTMLDivElement>(null);

  const handleScrollButtons = (direction: ScrollDirection) => {
    if (refScrollBlock.current === null) {
      return;
    }
    const el = refScrollBlock.current;
    if (direction === ScrollDirection.UP) {
      el.scroll(0, el.scrollTop -= 10);
    } else {
      el.scroll(0, el.scrollTop += 10);
    }
  };

  return (
    <div className={props.className}>
      <SortBlock handleSortCallback={props.handleSortCallback}/>
      <WrapOther>
        <WrapList ref={refScrollBlock}>
          {
            props.items.map((leaderItem) => (
              <ListItem key={leaderItem.id} name={leaderItem.name} score={leaderItem.score}/>
            ))
          }
        </WrapList>
        <ScrollBlock handleScrollButton={handleScrollButtons}/>
      </WrapOther>
    </div>
  );
};

const LeadersImplStyled = styled(LeadersImpl)`
  display: flex;
  flex-direction: column;
  width: 400px;
`;

export const Leaders = React.memo(LeadersImplStyled);
