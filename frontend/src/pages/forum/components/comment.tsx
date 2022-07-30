import React from 'react';
import styled from 'styled-components';
import { MAIN_FONT_SIZE, MAIN_WHITE, MAIN_YELLOW } from '@frontend/consts/styles';
import { Comment } from '../types';

const StyledUsername = styled.div`
  color: ${MAIN_YELLOW};
  font-size: ${MAIN_FONT_SIZE};
`;

const StyledComment = styled.div`
  display: flex;
  text-align: start;
  height: fit-content;
  max-height: 100px;
  margin-bottom: 20px;
  color: ${MAIN_WHITE};
  font-size: ${MAIN_FONT_SIZE};
  width: 100%;
  word-break: break-word;
`;

const CommentElement: React.FC<Comment> = ({
  user,
  comment,
}) => (
  <>
    <StyledUsername>{user.login.toUpperCase()}@</StyledUsername>
    <StyledComment>{comment.toUpperCase()}</StyledComment>
  </>
);

export default CommentElement;
