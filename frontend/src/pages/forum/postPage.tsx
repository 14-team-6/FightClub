import React from 'react';
import styled from 'styled-components';
import { usePost } from '@frontend/src/pages/forum/hooks/usePost';
import { useParams } from 'react-router-dom';
import Link from '../../components/link/link';
import TopicElement from './components/topic';
import CommentElement from './components/comment';
import PostElement from './components/post';

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  padding: 20px;
`;

const ActionButtons = styled.div`
  display: flex;
  justify-content: space-between;
  width: 150px;
`;

const Wrapper = styled.div`
  margin-left: 20px;
  height: 85%;
`;

const TopicWrapper = styled.div`
  margin-bottom: 20px;
`;

const PostWrapper = styled.div`
  margin-bottom: 20px;
`;

const CommentsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  max-height: 82%;
  width: 70%;
  margin-bottom: 20px;
  overflow: auto;
`;

const Answer = styled(Link)`
  margin-left: 20px;
`;

const PostPage: React.FC = () => {
  const { topicId, postId } = useParams();
  const post = usePost(topicId, postId);

  return (
    <>
      <Header>
        <Link to="/topics">FIGHT FORUM</Link>
        <ActionButtons>
          <Link to={`/topics/${topicId}`}>BACK</Link>
          <Link to="/fight">CLOSE</Link>
        </ActionButtons>
      </Header>
      <Wrapper>
        {
          post ? (
            <>
              <TopicWrapper>
                <TopicElement id={post.topic.id} name={post.topic.name} />
              </TopicWrapper>
              <PostWrapper>
                <PostElement id={post.post.id} name={post.post.name} />
              </PostWrapper>
              <CommentsWrapper>
                {post.comments.map((comment) => <CommentElement key={comment.id} {...comment} />)}
              </CommentsWrapper>
            </>
          ) : 'Loading...'
        }
      </Wrapper>
      <Answer to={`/topics/${topicId}/posts/${postId}/comments/add`}>ANSWER</Answer>
    </>
  );
};

export default PostPage;
