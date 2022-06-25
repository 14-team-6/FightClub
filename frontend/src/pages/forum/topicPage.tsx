import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import Link from '../../components/link/link';
import { getPosts } from '../../services/forum';
import { Post, TopicData } from './types';
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

  const [topicData, setTopicData] = useState<TopicData>();

  useEffect(() => {
    if (topicId === undefined) return;

    getPosts(topicId).then((topicPst: TopicData) => { setTopicData(topicPst); });
  }, []);

  return (
    <>
      <Header>
        <Link to="/topics">FIGHT FORUM</Link>
        <ActionButtons>
          <Link to={`/topics/${topicId}/posts/add`}>NEW POST</Link>
          <Link to="/topics">BACK</Link>
          <Link to="#">CLOSE</Link>
        </ActionButtons>
      </Header>
      <Topic>
        {topicData ? <TopicElement id={topicData.topic.id} name={topicData.topic.name} /> : 'Loading...'}
      </Topic>
      <Posts>
        {
          topicData
            ? topicData.posts.map((post: Post) => <PostElement key={post.id} {...post} />)
            : null
        }
      </Posts>
    </>
  );
};

export default TopicPage;
