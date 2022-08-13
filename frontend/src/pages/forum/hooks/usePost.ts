import { useEffect, useState } from 'react';
import { forumService } from '@frontend/src/services';
import { CommentsResponse } from '@backend/src/services/forum/comments';

export function usePost(topicId: string | undefined, postId: string | undefined) {
  const [postData, setPostData] = useState<CommentsResponse>();

  useEffect(() => {
    if (topicId === undefined || postId === undefined) return;

    forumService.getComments(topicId, postId)
      .then((topicPst: CommentsResponse) => {
        setPostData(topicPst);
      });
  }, []);
  return postData;
}
