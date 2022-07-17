import React from 'react';
import styled from 'styled-components';
import { MAIN_WHITE, MAIN_YELLOW, MIDDLE_FONT_SIZE } from '@frontend/consts/styles';
import { Comment } from '../types';

const StyledUsername = styled.div`
  color: ${MAIN_YELLOW};
  font-size: ${MIDDLE_FONT_SIZE};
`;

const StyledComment = styled.div`
  display: flex;
  text-align: start;
  height: fit-content;
  min-height: 22px;
  margin-bottom: 20px;
  overflow-y: auto;
  color: ${MAIN_WHITE};
  font-size: ${MIDDLE_FONT_SIZE};
`;

const CommentElement: React.FC<Comment> = ({
  user,
  comment,
}) => (
  <>
    <StyledUsername>{user.name.toUpperCase()}@</StyledUsername>
    <StyledComment>{comment.toUpperCase()}</StyledComment>
  </>
);

export default CommentElement;
