import React from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { MAIN_BLACK, MAIN_YELLOW } from '../../../../consts/styles';
import { Post } from '../types';
import Link from '../../../components/link/link';

const StyledPost = styled(Link)`
  color: ${MAIN_YELLOW};
  text-shadow: 1px 1px 1px ${MAIN_BLACK},
  -1px 1px 1px ${MAIN_BLACK},
    1px -1px 1px ${MAIN_BLACK},
    -1px -1px 1px ${MAIN_BLACK};
`;

const PostElement: React.FC<Post> = ({
  id,
  name,
}) => {
  const { topicId } = useParams();

  return (
    <StyledPost to={`/topics/${topicId}/posts/${id}`}>{name}</StyledPost>
  );
};

export default PostElement;
