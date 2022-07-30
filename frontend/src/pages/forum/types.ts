export type User = {
  id: number,
  login: string
};

export type Topic = {
  id: number,
  data: string,
  counts?: number
};

export type Post = {
  id: number,
  data: string,
  title: string
};

export type Comment = {
  id: number,
  user: User,
  comment: string
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
