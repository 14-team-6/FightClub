import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import Link from '../../components/link/link';
import { getPosts } from '../../services/forum';
import { Post } from './types';
import PostElement from './components/post';

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  padding: 20px;
`;

const ActionButtons = styled.div`
  display: flex;
  justify-content: space-between;
  width: 350px;
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

  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    getPosts(topicId).then((psts: Post[]) => { setPosts(psts); });
  }, []);

  return (
    <>
      <Header>
        <Link to="/topics">FIGHT FORUM</Link>
        <ActionButtons>
          <Link to="/topics/add">NEW POST</Link>
          <Link to="/login">BACK</Link>
          <Link to="/login">CLOSE</Link>
        </ActionButtons>
      </Header>
      <Posts>
        {posts.length > 0 ? posts.map((post: Post) => <PostElement key={post.id} {...post} />) : 'Loading...'}
      </Posts>
    </>
  );
};

export default TopicPage;
