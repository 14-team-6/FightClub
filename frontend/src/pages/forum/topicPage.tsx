import React from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { useTopic } from '@frontend/src/pages/forum/hooks/useTopic';
import Link from '../../components/link/link';
import { Post } from './types';
import PostElement from './components/post';
import TopicElement from './components/topic';

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  padding: 20px;
`;

const ActionButtons = styled.div`
  display: flex;
  justify-content: space-between;
  width: 300px;
`;

const Topic = styled.div`
  margin-left: 20px;
`;

const Posts = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  padding: 20px;
`;

const TopicPage: React.FC = () => {
  const { topicId } = useParams();
  const topic = useTopic(topicId);

  return (
    <>
      <Header>
        <Link to="/topics">FIGHT FORUM</Link>
        <ActionButtons>
          <Link to={`/topics/${topicId}/posts/add`}>NEW POST</Link>
          <Link to="/topics">BACK</Link>
          <Link to="/fight">CLOSE</Link>
        </ActionButtons>
      </Header>
      <Topic>
        {topic ? <TopicElement id={topic.topic.id} name={topic.topic.name} /> : 'Loading...'}
      </Topic>
      <Posts>
        {
          topic
            ? topic.posts.map((post: Post) => <PostElement key={post.id} {...post} />)
            : null
        }
      </Posts>
    </>
  );
};

export default TopicPage;
