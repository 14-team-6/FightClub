import { useEffect, useState } from 'react';
import { Topic } from '@frontend/src/pages/forum/types';
import { getTopics } from '@frontend/src/services/forum';

export function useTopics() {
  const [topics, setTopics] = useState<Topic[]>();

  useEffect(() => {
    getTopics().then((tpcs: Topic[]) => { setTopics(tpcs); });
  }, []);
  return topics;
}
