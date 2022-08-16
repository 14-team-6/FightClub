import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import { usePost } from '@frontend/src/pages/forum/hooks/usePost';
import { forumService } from '@frontend/src/services';
import { useSelector } from 'react-redux';
import { selectUserInfo } from '@frontend/src/selectors/user';
import { MAIN_FONT_SIZE, MAIN_RED } from '@frontend/consts/styles';
import Emoji from '@frontend/src/pages/forum/components/emoji';
import Link from '../../components/link/link';
import TopicElement from './components/topic';
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

const Send = styled(Button)`
  margin-left: 35px;
`;

const Error = styled.p`
  font-size: ${MAIN_FONT_SIZE};
  color: ${MAIN_RED}
`;

const AnswerPage: React.FC = () => {
  const {
    topicId,
    postId,
    commentId,
  } = useParams();
  const postData = usePost(topicId, postId);
  const [newComment, setComment] = useState('');
  const navigate = useNavigate();
  const userId = useSelector(selectUserInfo)?.id;
  const [error, setError] = useState('');

  const addEmoji = (emoji: string) => {
    const newValue: string = `${newComment}${emoji}`;

    setComment(newValue);
  };

  const handleClick = () => {
    if (newComment.length && newComment.length < 1000) {
      if (commentId === 'new') {
        forumService.createComment(
          topicId as string,
          postId as string,
          {
            userId,
            data: newComment,
          },
        )
          .then(() => navigate(-1));
      } else {
        forumService.createNestedComment(
          topicId as string,
          postId as string,
          commentId as string,
          {
            userId,
            data: newComment,
          },
        )
          .then(() => navigate(-1));
      }
    }
  };

  const handleChange = (e: React.FormEvent<HTMLTextAreaElement>) => {
    const { value } = e.currentTarget;

    if (newComment.trim().length > 1000) {
      setError('Max length is 1000 chars!');
      return;
    }

    setComment(value);
  };

  return (
    <>
      <Header>
        <Link to="/topics">FIGHT FORUM</Link>
        <ActionButtons>
          <Link to={`/topics/${topicId}/posts/${postId}`}>BACK</Link>
          <Link to="/">CLOSE</Link>
        </ActionButtons>
      </Header>
      <Wrapper>
        {
          postData ? (
            <>
              <TopicWrapper>
                <TopicElement id={postData.topic.id} data={postData.topic.data}/>
              </TopicWrapper>
              <PostWrapper>
                <PostElement
                  id={postData.post.id}
                  title={postData.post.title}
                  data={postData.post.data}/>
              </PostWrapper>
              <Error>{error}</Error>
              <Textarea value={newComment} onChange={handleChange} rows={9}
                        placeholder="WRITE COMMENT HERE!"/>
              <Emoji onClick={addEmoji}/>
              <Send onClick={handleClick} type="button" text="SEND"/>
            </>
          ) : 'Loading...'
        }
      </Wrapper>
    </>
  );
};

export default AnswerPage;
