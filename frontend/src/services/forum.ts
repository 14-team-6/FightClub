import topics from './fixtures/topics.json';
import posts from './fixtures/posts.json';

export const getTopics = () => new Promise((resolve) => {
  setTimeout(() => resolve(topics), 300);
});

export const getPosts = (topicId: string | undefined) => new Promise((resolve) => {
  // eslint-disable-next-line no-console
  console.log(topicId);
  setTimeout(() => resolve(posts), 300);
});
