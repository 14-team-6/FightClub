import { useEffect, useState } from 'react';
import { Topic } from '@frontend/src/pages/forum/types';
import { forumService } from '@frontend/src/services';

export function useTopics() {
  const [topics, setTopics] = useState<Topic[]>();

  useEffect(() => {
    forumService.getTopic()
      .then((tpcs: Topic[]) => {
        setTopics(tpcs);
      });
  }, []);
  return topics;
}
