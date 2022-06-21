import topics from './fixtures/topics.json';
import posts from './fixtures/posts.json';
import comments from './fixtures/comments.json';

export const getTopics = () => new Promise((resolve) => {
  setTimeout(() => resolve(topics), 300);
});

export const getPosts = (topicId: string) => new Promise((resolve) => {
  console.log(topicId); // eslint-disable-line no-console
  setTimeout(() => resolve(posts), 300);
});

export const getComments = (topicId: string, postId: string) => new Promise((resolve) => {
  console.log(topicId, postId); // eslint-disable-line no-console
  setTimeout(() => resolve(comments), 300);
});
