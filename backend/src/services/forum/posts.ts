import {
  AddDataProps,
  BaseForumService,
  ForumApiRequestResult
} from '@backend/src/services/forum/baseForumEntity';
import { Comment } from '@backend/src/models/forum/comments';
import { FindOptions, Sequelize } from 'sequelize';
import { Post } from '@backend/src/models/forum/posts';
import { Topic } from '@backend/src/models/forum/topics';

type PostsResponse = {
  topic: {
    id: number,
    data: string,
  },
  posts: Post[],
};

export class PostsService implements BaseForumService {
  add(data: AddDataProps): Promise<ForumApiRequestResult> {
    return Post.create(data as any)
      .then(() => ({result: 'OK',}))
      .catch((e) => ({result: `Error: ${e}`}));
  }

  children(id: number): Promise<Comment[]> {
    return Post.findOne({
      include: [Comment],
      where: {
        id
      }
    }).then((item: Post) => item.comments);
  }

  delete(id: number): Promise<ForumApiRequestResult> {
    return Post.destroy({
      where: {
        id
      }
    })
      .then(() => {
        return Promise.resolve({ result: 'OK'});})
      .catch((e) => {
        return Promise.resolve({ result: `Error: ${e}`});
      });
  }

  get(id: number): Promise<Post | null> {
    return Post.findOne({
      where: {
        id
      }
    });
  }

  getAll(parentId?: number): Promise<PostsResponse | null> {
    const options = {
      attributes: {
        include: [
          [
            Sequelize.fn("COUNT", Sequelize.col("comments.id")),
            'counts',
          ]
        ],
      },
      include: [
        {
          model: Comment,
          attributes: [],
        }
      ],
      group: [
        'Post.id',
        'Post.title',
      ],
    } as FindOptions;

    if (parentId !== undefined) {
      options.where = {
        topicId: parentId,
      };
    }

    return Topic.findOne({
      where: {
        id: parentId,
      }
    }).then((topic: Topic) => Post.findAll(options).then((posts: Post[]) => ({
      topic: {
        id: topic.id,
        data: topic.data,
      },
      posts,
    })));
  }

  update(id: number, data: AddDataProps): Promise<ForumApiRequestResult> {
    const searchOptions = {
      where: {
        id
      }
    } as FindOptions;
    return Post.findOne({...searchOptions})
      .then((item: Post | null) => {
        if (item === null) {
          return Promise.reject({result: 'NOT FOUND'});
        }
        return item.update(data)
      }).then(() => ({result: 'OK'}));
  }
}
