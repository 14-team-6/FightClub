import { useEffect, useState } from 'react';
import { TopicData } from '@frontend/src/pages/forum/types';
import { forumService } from '@frontend/src/services';

export function useTopic(topicId: string | undefined) {
  const [topicData, setTopicData] = useState<TopicData>();

  useEffect(() => {
    if (topicId === undefined) return;

    forumService.getPosts(topicId)
      .then((topicPst: TopicData) => {
        setTopicData(topicPst);
      });
  }, []);
  return topicData;
}
