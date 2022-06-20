import React, { FC } from 'react';
import styled from 'styled-components';
import { StrokedText } from '@frontend/src/components/strokedText/strokedText';
import { MAIN_RED, MAIN_YELLOW } from '@frontend/consts/styles';

export type LeaderItem = {
  id: number,
  name: string,
  score: number,
  className?: string,
};

const ListItemImpl: FC<Omit<LeaderItem, 'id'>> = (props) => (
  <div className={props.className}>
    <StrokedText className="stroked-text" fontSize="30px" textColor={MAIN_YELLOW}
                 strokeColor={MAIN_RED}>{props.name}</StrokedText>
    <StrokedText className="stroked-text" fontSize="30px" textColor={MAIN_YELLOW}
                 strokeColor={MAIN_RED}>{props.score}</StrokedText>
  </div>
);

const ListItemStyled = styled(ListItemImpl)`
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

export const ListItem = React.memo(ListItemStyled);
