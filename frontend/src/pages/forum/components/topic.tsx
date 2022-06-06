import React from 'react';
import styled from 'styled-components';
import { MAIN_BLUE, MAIN_FONT_SIZE, MAIN_YELLOW } from '../../../../consts/styles';
import { Topic } from '../types';
import Link from '../../../components/link/link';

const StyledTopic = styled.div`
  display: flex;
  justify-content: space-between;
  width: 550px;
`;

const StyledLink = styled(Link)`
  color: ${MAIN_YELLOW};
  text-shadow:
    1px 1px 1px ${MAIN_BLUE},
    -1px 1px 1px ${MAIN_BLUE},
    1px -1px 1px ${MAIN_BLUE},
    -1px -1px 1px ${MAIN_BLUE};
`;

const Counts = styled.div`
  color: ${MAIN_YELLOW};
  text-shadow:
    1px 1px 1px ${MAIN_BLUE},
    -1px 1px 1px ${MAIN_BLUE},
    1px -1px 1px ${MAIN_BLUE},
    -1px -1px 1px ${MAIN_BLUE};
  font-size: ${MAIN_FONT_SIZE};
`;

const TopicElement: React.FC<Topic> = ({
  id,
  name,
  counts,
}) => (
  <StyledTopic>
    <StyledLink to={`/topics/${id}`}>{name}</StyledLink>
    <Counts>{counts} POSTS</Counts>
  </StyledTopic>
);

export default TopicElement;
