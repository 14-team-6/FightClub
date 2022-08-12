import React from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { MAIN_BLACK, MAIN_YELLOW } from '@frontend/consts/styles';
import { Post } from '../types';
import Link from '../../../components/link/link';

const StyledPost = styled(Link)`
  color: ${MAIN_YELLOW};
  text-shadow:
    1px 1px 1px ${MAIN_BLACK},
    -1px 1px 1px ${MAIN_BLACK},
    1px -1px 1px ${MAIN_BLACK},
    -1px -1px 1px ${MAIN_BLACK};
`;

const StyledPostData = styled.p`
  font-size: 28px
`;

const PostElement: React.FC<Post> = ({
  id,
  title,
  data,
}) => {
  const { topicId } = useParams();

  return (
    <>
      <StyledPost to={`/topics/${topicId}/posts/${id}`}>{title.toUpperCase()}</StyledPost>
      <StyledPostData>{data}</StyledPostData>
    </>
  );
};

export default PostElement;
