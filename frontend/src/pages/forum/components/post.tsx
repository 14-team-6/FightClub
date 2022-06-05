import React from 'react';
import styled from 'styled-components';
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

const TopicElement: React.FC<Post> = ({
  id,
  name,
}) => (
    <StyledPost to={`posts/${id}`}>{name}</StyledPost>
);

export default TopicElement;
