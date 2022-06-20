import { useEffect, useState } from 'react';
import { TopicData } from '@frontend/src/pages/forum/types';
import { getPosts } from '@frontend/src/services/forum';

export function useTopic(topicId: string | undefined) {
  const [topicData, setTopicData] = useState<TopicData>();

  useEffect(() => {
    if (topicId === undefined) return;

    getPosts(topicId).then((topicPst: TopicData) => { setTopicData(topicPst); });
  }, []);
  return topicData;
}
