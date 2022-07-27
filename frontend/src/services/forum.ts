import HttpTransport from '@frontend/core/http-transport';
import { AddDataProps, ForumApiRequestResult } from '@backend/src/services/forum/baseForumEntity';
import store from '@frontend/src/store/store';
import { Topic as ResponseTopic } from '@backend/src/models/forum/topics';
import { TopicData } from '@frontend/src/pages/forum/types';
import { Post as ResponsePost } from '@backend/src/models/forum/posts';
import { CommentsResponse } from '@backend/src/services/forum/comments';

export class ForumService {
  private httpTransport: HttpTransport;

  constructor(authService: HttpTransport) {
    this.httpTransport = authService;
  }

  createTopic = (name: string) => this.httpTransport.post<AddDataProps, ForumApiRequestResult>('/topics', {
    body: {
      data: name,
      userId: store.getState().user.id,
    },
  });

  getTopic = () => this.httpTransport.get<ResponseTopic[]>('/topics')
    .then((topics) => topics);

  getPosts = (topicId: string) => this.httpTransport.get<ResponsePost>(`/topics/${topicId}/posts`)
    .then((posts) => posts as unknown as TopicData);

  // eslint-disable-next-line max-len
  createPost = (topicId: string, content: string, title: string) => {
    console.log(title, 'title');
    return this.httpTransport.post<AddDataProps, { result: string }>(`/topics/${topicId}/posts`, {
      body: {
        data: content,
        userId: store.getState().user.id,
        title,
      },
    });
  };

  getComments = (topicId: string, postId: string) => this.httpTransport.get<CommentsResponse>(`/topics/${topicId}/posts/${postId}/comments`);
}
