import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Link from '../../components/link/link';
import { getTopics } from '../../services/forum';
import { Topic } from './types';
import TopicElement from './components/topic';

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  padding: 20px;
`;

const ActionButtons = styled.div`
  display: flex;
  justify-content: space-between;
  width: 210px;
`;

const Topics = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  padding: 20px;
`;

const ForumPage: React.FC = () => {
  const [topics, setTopics] = useState<Topic[]>([]);

  useEffect(() => {
    getTopics().then((tpcs: Topic[]) => { setTopics(tpcs); });
  }, []);

  return (
    <>
      <Header>
        <Link to="/topics">FIGHT FORUM</Link>
        <ActionButtons>
          <Link to="/topics/add">NEW TOPIC</Link>
          <Link to="/login">CLOSE</Link>
        </ActionButtons>
      </Header>
      <Topics>
        {topics.length > 0 ? topics.map((topic: Topic) => <TopicElement key={topic.id} {...topic} />) : 'Loading...'}
      </Topics>
    </>
  );
};

export default ForumPage;
