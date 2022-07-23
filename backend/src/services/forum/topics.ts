import {
  AddDataProps,
  BaseForumService,
  ForumApiRequestResult
} from '@backend/src/services/forum/baseForumEntity';
import { FindOptions, Sequelize } from 'sequelize';
import { Post } from '@backend/src/models/forum/posts';
import { Topic } from '@backend/src/models/forum/topics';

export class TopicsService implements BaseForumService {
  add(data: AddDataProps): Promise<ForumApiRequestResult> {
    return Topic.create(data as any)
      .then(() => ({result: 'OK',}))
      .catch((e) => ({result: `Error: ${e}`}));
  }

  children(id: number): Promise<Post[]> {
    return Topic.findOne({
      include: [Post],
      where: {
        id
      }
    }).then((item: Topic) => item.posts);
  }

  delete(id: number): Promise<ForumApiRequestResult> {
    return Topic.destroy({
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

  get(id: number): Promise<Topic | null> {
    return Topic.findOne({
      where: {
        id
      }
    });
  }

  getAll(): Promise<Topic[] | null> {
    return Topic.findAll({
        attributes: {
          include: [
            [
              Sequelize.fn("COUNT", Sequelize.col("posts.id")),
              'counts',
            ]
          ],
        },
        include: [
          {
            model: Post,
            attributes: [],
          }
        ],
        group: [
          'Topic.id',
          'Topic.data',
        ]
      }
    );
  }

  update(id: number, data: AddDataProps): Promise<ForumApiRequestResult> {
    const searchOptions = {
      where: {
        id
      }
    } as FindOptions;
    return Topic.findOne({...searchOptions})
      .then((item: Topic | null) => {
        if (item === null) {
          return Promise.reject({result: 'NOT FOUND'});
        }
        return item.update(data)
      }).then(() => ({result: 'OK'}));
  }
}
