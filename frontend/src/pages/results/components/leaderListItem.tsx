import React, { FC } from 'react';
import styled from 'styled-components';
import { StrokedText } from '@frontend/src/components/strokedText/strokedText';
import { MAIN_RED, MAIN_YELLOW } from '@frontend/consts/styles';
import { useSelector } from 'react-redux';
import { selectThemeData } from '@frontend/src/selectors/theme';

export type LeaderItem = {
  id: number,
  name: string,
  score: number,
  className?: string,
};

const ListItemImpl: FC<Omit<LeaderItem, 'id'>> = (props) => {
  const theme = useSelector(selectThemeData);
  return (
    <div className={props.className}>
      <StrokedText data-cy="leaders-item-login" className="stroked-text" fontSize={`${theme.fontSizes.nav}`} textColor={MAIN_YELLOW}
                   strokeColor={MAIN_RED}>{props.name}</StrokedText>
      <StrokedText data-cy="leaders-item-score" className="stroked-text" fontSize={`${theme.fontSizes.nav}`} textColor={MAIN_YELLOW}
                   strokeColor={MAIN_RED}>{props.score}</StrokedText>
    </div>
  );
};

const ListItemStyled = styled(ListItemImpl)`
  display: flex;
  flex-direction: row;
  height: 20px;
  width: 360px;
  align-items: center;
  justify-content: center;
  margin: 5px 0;

  .stroked-text {
    width: 100%;
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
