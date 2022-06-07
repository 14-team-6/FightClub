import React from 'react';
import styled from 'styled-components';
import { MAIN_WHITE, MIDDLE_FONT_SIZE } from '../../../../consts/styles';
import { Comment } from '../types';

const StyledComment = styled.div`
  display: flex;
  text-align: start;
  height: fit-content;
  min-height: 22px;
  margin-bottom: 20px;
  overflow-y: auto;
  font-family: Pixeboy, serif;
  color: ${MAIN_WHITE};
  font-size: ${MIDDLE_FONT_SIZE};
`;

const CommentElement: React.FC<Comment> = ({
  name,
}) => (
  <StyledComment>{name}</StyledComment>
);

export default CommentElement;
