import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import Link from '../../components/link/link';
import { getComments } from '../../services/forum';
import { PostData } from './types';
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
  height: 69%;
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

  const [postData, setPostData] = useState<PostData>();

  useEffect(() => {
    getComments(topicId!, postId!).then((topicPst: PostData) => { setPostData(topicPst); });
  }, []);

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
                <TopicElement id={postData.topic.id} name={postData.topic.name} />
              </TopicWrapper>
              <PostWrapper>
                <PostElement id={postData.post.id} name={postData.post.name} />
              </PostWrapper>
              <CommentWrapper>
                <CommentElement {...postData.comments[0]} />
              </CommentWrapper>
              <Textarea rows={12} placeholder='WRITE COMMENT HERE!' />
            </>
          ) : 'Loading...'
        }
      </Wrapper>
      <Send type="button" text="SEND" />
    </>
  );
};

export default AnswerPage;
