import React from 'react';
import styled from 'styled-components';
import { MAIN_FONT_SIZE, MAIN_WHITE, MAIN_YELLOW } from '@frontend/consts/styles';
import { Link } from 'react-router-dom';
import { Comment } from '@backend/src/models/forum/comments';

const StyledUsername = styled(Link)`
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

const WrapperNestedComments = styled.div`
  padding-left: 10px;
`;

type CommentProps = Pick<Comment, 'comments' | 'postId' | 'user' | 'data' | 'id'> & { topicId: string };

const CommentElement: React.FC<CommentProps> = ({
  user,
  data,
  id,
  topicId,
  postId,
  comments,
}) => (
  <>
    <StyledUsername to={`/topics/${topicId}/posts/${postId}/comments/${id}/add`}>{user.login.toUpperCase()}@</StyledUsername>
    <StyledComment dangerouslySetInnerHTML={{ __html: data.toUpperCase() }}/>
    <WrapperNestedComments>
      {
        comments?.map((comment) => <CommentElement key={comment.id} {...comment} topicId={topicId} />)
      }
    </WrapperNestedComments>
  </>
);

export default CommentElement;
