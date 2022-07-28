import { Router } from 'express';
import { withService } from '@backend/src/controllers/forum/forumBaseController';
import { TopicsService } from '@backend/src/services/forum/topics';
import { PostsService } from '@backend/src/services/forum/posts';
import { CommentsService } from '@backend/src/services/forum/comments';
import { checkAuthMiddleware } from '@backend/src/middleware/checkAuth';

const topicOptions = {
  serviceClass: TopicsService,
  ownField: 'topicId',
};

const postOptions = {
  serviceClass: PostsService,
  ownField: 'postID',
  parentField: 'topicId',
};

const commentOptions = {
  serviceClass: CommentsService,
  parentField: 'postId',
};

export class ForumApi {
  public static initRoute(route: Router): void {
    const forumRoutes = Router();

    forumRoutes.use(checkAuthMiddleware);

    forumRoutes
      .get(
        '/topics',
        withService(topicOptions).get,
      ) // get all topics
      .post(
        '/topics',
        withService(topicOptions).add,
      ) // add new topic
      .put(
        '/topics/:topicId(\\d+)',
        withService(topicOptions).edit,
      ) // edit topic name
      .get(
        '/topics/:topicId(\\d+)/posts',
        withService(postOptions).get,
      ) // get all posts
      .post(
        '/topics/:topicId(\\d+)/posts',
        withService(postOptions).add,
      ) // add new post
      .put(
        '/topics/:topicId(\\d+)/posts/:postId(\\d+)',
        withService(postOptions).edit,
      ) // edit post name
      .get(
        '/topics/:topicId(\\d+)/posts/:postId(\\d+)/comments',
        withService(commentOptions).get,
      ) // get all comments
      .post(
        '/topics/:topicId(\\d+)/posts/:postId(\\d+)/comments',
        withService(commentOptions).add,
      ) // add new comment
      .put(
        '/topics/:topicId(\\d+)/posts/:postId(\\d+)/comments/:commentId(\\d+)',
        withService(commentOptions).edit,
      ) // edit comment
      .delete(
        '/topics/:topicId(\\d+)/posts/:postId(\\d+)/comments/:commentId(\\d+)',
        withService(commentOptions).delete,
      ); // delete comment

    route.use('/forum', forumRoutes);
  }
}
