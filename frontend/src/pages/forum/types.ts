export type Topic = {
  id: number,
  name: string,
  counts?: number
};

export type Post = {
  id: number,
  name: string
};

export type Comment = {
  id: number,
  name: string
};

export type TopicData = {
  topic: Topic,
  posts: Post[]
};

export type PostData = {
  topic: Topic,
  post: Post,
  comments: Comment[]
};
