import React, { FC } from 'react';
import styled from 'styled-components';
import { StrokedText } from '../../../components/strokedText/strokedText';
import { MAIN_RED, MAIN_YELLOW } from '../../../../consts/styles';
import { ButtonTriangle, ButtonTriangleDirection, ButtonTriangleSize } from '../../../components/button/buttonTriangle';

type LeaderItem = {
  name: string,
  score: number,
};

type LeadersProps = {
  items: Array<LeaderItem>,
};

const WrapListItem = styled.div`
  display: flex;
  flex-direction: row;
  height: 20px;
  width: 300px;
  align-items: center;
  justify-content: center;
  margin: 5px 0;

  .stroked-text {
    width: 100px;
    text-overflow: ellipsis;
  }

  .stroked-text:first-child {
    margin: 0 30px 0 0;
    text-align: right;
  }

  .stroked-text:last-child {
    text-align: left;
  }
`;

const ListItem: FC<LeaderItem> = (props) => {
  return (
    <WrapListItem>
      <StrokedText className="stroked-text" fontSize="30px" textColor={MAIN_YELLOW}
                   strokeColor={MAIN_RED}>{props.name}</StrokedText>
      <StrokedText className="stroked-text" fontSize="30px" textColor={MAIN_YELLOW}
                   strokeColor={MAIN_RED}>{props.score}</StrokedText>
    </WrapListItem>
  );
};

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  width: 334px;
`;

const WrapSort = styled.div`
  display: flex;
  flex-direction: row;
  width: 300px;
  justify-content: center;
  margin: 0 0 10px 0;

  .button-triangle:first-child {
    margin: 0 7px 0 0;
  }

  .button-triangle:last-child {
    margin: 0 0 0 7px;
  }
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

const WrapScroll = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 34px;
  margin: 5px 0;
`;

const SortBlock: FC = () => {
  const onClick = (sortBy: string) => {
    return () => {
      console.log(`sort by: ${sortBy}`);
    };
  };

  return (
    <WrapSort>
      <ButtonTriangle onClick={onClick('name')} isActive={true} className="button-triangle"
                      size={ButtonTriangleSize.SMALL} direction={ButtonTriangleDirection.UP}/>
      <ButtonTriangle onClick={onClick('score')} className="button-triangle" size={ButtonTriangleSize.SMALL}
                      direction={ButtonTriangleDirection.DOWN}/>
    </WrapSort>
  );
};

const ScrollBlock: FC = () => {
  const onClick = (direction: string) => {
    return () => {
      console.log(`direction: ${direction}`);
    };
  };

  return (
    <WrapScroll>
      <ButtonTriangle onClick={onClick('up')} size={ButtonTriangleSize.BIG}
                      direction={ButtonTriangleDirection.UP}/>
      <ButtonTriangle onClick={onClick('down')} size={ButtonTriangleSize.BIG}
                      direction={ButtonTriangleDirection.DOWN}/>
    </WrapScroll>
  );
};

export const Leaders: FC<LeadersProps> = (props) => {
  return (
    <Wrap>
      <SortBlock/>
      <WrapOther>
        <WrapList>
          {props.items.map((o, i) => {
            return <ListItem key={i} name={o.name} score={o.score}/>;
          })}
        </WrapList>
        <ScrollBlock/>
      </WrapOther>
    </Wrap>
  );
};
