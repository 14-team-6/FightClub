import { useEffect, useState } from 'react';
import { PostData } from '@frontend/src/pages/forum/types';
import { getComments } from '@frontend/src/services/forum';

export function usePost(topicId: string | undefined, postId: string | undefined) {
  const [postData, setPostData] = useState<PostData>();

  useEffect(() => {
    if (topicId === undefined || postId === undefined) return;

    getComments(topicId, postId).then((topicPst: PostData) => { setPostData(topicPst); });
  }, []);
  return postData;
}
