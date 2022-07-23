import {
  Column,
  DataType,
  Table,
  ForeignKey,
  AllowNull,
  AutoIncrement,
  PrimaryKey, HasMany, BelongsTo, Length,
  Model,
} from 'sequelize-typescript';
import { User } from '@backend/src/models/users/users';
import { Topic } from '@backend/src/models/forum/topics';
import { Comment } from '@backend/src/models/forum/comments';

@Table
export class Post extends Model {
  @AutoIncrement
  @PrimaryKey
  @Column(DataType.INTEGER)
    id: number;

  @Length({ min: 5, max: 200 })
  @AllowNull(false)
  @Column(DataType.STRING)
    title: string;

  @Length({ min: 1 })
  @AllowNull(false)
  @Column(DataType.STRING)
    data: string;

  @AllowNull(false)
  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    field: 'user_id',
  })
    userId: number;

  @AllowNull(false)
  @ForeignKey(() => Topic)
  @Column({
    type: DataType.INTEGER,
    field: 'topic_id',
  })
    topicId: number;

  @HasMany(() => Comment)
    comments: Comment[];

  @BelongsTo(() => Topic)
    topic: Topic;
}
