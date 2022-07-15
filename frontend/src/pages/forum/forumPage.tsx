import React from 'react';
import styled from 'styled-components';
import { useTopics } from '@frontend/src/pages/forum/hooks/useTopics';
import { Topic } from './types';
import Link from '../../components/link/link';
import TopicElement from './components/topic';

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  padding: 20px;
`;

const ActionButtons = styled.div`
  display: flex;
  justify-content: space-between;
  width: 225px;
`;

const Topics = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  padding: 20px;
`;

const ForumPage: React.FC = () => {
  const topics = useTopics();

  return (
    <>
      <Header>
        <Link to="/topics">FIGHT FORUM</Link>
        <ActionButtons>
          <Link to="/topics/add">NEW TOPIC</Link>
          <Link to="/fight">CLOSE</Link>
        </ActionButtons>
      </Header>
      <Topics>
        {
          topics
            ? topics.map((topic: Topic) => <TopicElement key={topic.id} {...topic} />)
            : 'Loading...'
        }
      </Topics>
    </>
  );
};

export default ForumPage;
