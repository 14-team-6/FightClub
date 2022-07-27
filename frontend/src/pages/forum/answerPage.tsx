import React from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { usePost } from '@frontend/src/pages/forum/hooks/usePost';
import Link from '../../components/link/link';
import TopicElement from './components/topic';
import CommentElement from './components/comment';
import PostElement from './components/post';
import Textarea from '../../components/textarea/textarea';
import Button from '../../components/button/button';

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
  height: 63%;
`;

const TopicWrapper = styled.div`
  margin-bottom: 20px;
`;

const PostWrapper = styled.div`
  margin-bottom: 20px;
`;

const CommentWrapper = styled.div`
  margin-bottom: 20px;
  width: 70%;
`;

const Send = styled(Button)`
  margin-left: 35px;
`;

const AnswerPage: React.FC = () => {
  const { topicId, postId } = useParams();
  const postData = usePost(topicId, postId);

  return (
    <>
      <Header>
        <Link to="/topics">FIGHT FORUM</Link>
        <ActionButtons>
          <Link to={`/topics/${topicId}/posts/${postId}`}>BACK</Link>
          <Link to="/fight">CLOSE</Link>
        </ActionButtons>
      </Header>
      <Wrapper>
        {
          postData ? (
            <>
              <TopicWrapper>
                <TopicElement id={postData.topic.id} data={postData.topic.data} />
              </TopicWrapper>
              <PostWrapper>
                <PostElement id={postData.post.id} data={postData.post.data} />
              </PostWrapper>
              <CommentWrapper>
                <CommentElement {...postData.comments[0]} />
              </CommentWrapper>
              <Textarea rows={9} placeholder="WRITE COMMENT HERE!" />
              <Send type="button" text="SEND" />
            </>
          ) : 'Loading...'
        }
      </Wrapper>
    </>
  );
};

export default AnswerPage;
