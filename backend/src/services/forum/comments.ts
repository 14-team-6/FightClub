import {
  AddDataProps,
  BaseForumService,
  ForumApiRequestResult,
} from '@backend/src/services/forum/baseForumEntity';
import { Comment } from '@backend/src/models/forum/comments';
import { FindOptions } from 'sequelize';
import { Topic } from '@backend/src/models/forum/topics';
import { Post } from '@backend/src/models/forum/posts';
import { User } from '@backend/src/models/users/users';

export type CommentsResponse = {
  topic: {
    id: number,
    data: string,
  },
  post: {
    id: number,
    data: string,
    title: string,
  },
  comments: Comment[],
};

export class CommentsService implements BaseForumService {
  add(data: AddDataProps): Promise<ForumApiRequestResult> {
    if (data.commentId === 'new') {
      // eslint-disable-next-line no-param-reassign
      delete data.commentId;
    }
    return Comment.create(data as any)
      .then(() => ({ result: 'OK' }))
      .catch((e) => ({ result: `Error: ${e}` }));
  }

  children(): Promise<ForumApiRequestResult> {
    return Promise.reject({ result: 'No children in this class' });
  }

  delete(id: number): Promise<ForumApiRequestResult> {
    return Comment.destroy({
      where: {
        id,
      },
    })
      .then(() => Promise.resolve({ result: 'OK' }))
      .catch((e) => Promise.resolve({ result: `Error: ${e}` }));
  }

  get(id: number): Promise<Comment | null> {
    return Comment.findOne({
      where: {
        id,
      },
    });
  }

  getAll(parentId?: number): Promise<CommentsResponse | null> {
    const options = {
      include: {
        model: User,
      },
      order: ['id'],
    } as FindOptions;

    if (parentId !== undefined) {
      options.where = {
        ...options.where,
        postId: parentId,
      };
    }
    return Post.findOne({
      include: [
        Topic,
      ],
      where: {
        id: parentId,
      },
    })
      .then((post: Post) => Comment.findAll(options)
        .then((comments: Comment[]) => ({
          topic: {
            id: post.topic.id,
            data: post.topic.data,
          },
          post: {
            id: post.id,
            data: post.data,
            title: post.title,
          },
          comments: this.convertToTree(comments),
        })));
  }

  update(id: number, data: AddDataProps): Promise<ForumApiRequestResult> {
    const searchOptions = {
      where: {
        id,
      },
    } as FindOptions;
    return Comment.findOne({ ...searchOptions })
      .then((item: Comment | null) => {
        if (item === null) {
          return Promise.reject({ result: 'NOT FOUND' });
        }
        return item.update(data);
      })
      .then(() => ({ result: 'OK' }));
  }

  private convertToTree = (comments: Comment[]): Comment[] => {
    const commentMap = new Map();
    const res: Partial<Comment>[] = [];

    for (const comment of comments) {
      const { id, data, user } = comment;
      const newComment: Partial<Comment> = {
        id, data, user, comments: [],
      };
      commentMap.set(newComment.id, newComment);
      if (!comment.commentId) {
        res.push(newComment);
      } else {
        const commentToUpdate = commentMap.get(comment.commentId);
        commentToUpdate.comments.push(newComment);
      }
    }

    return res as Comment[];
  };
}
