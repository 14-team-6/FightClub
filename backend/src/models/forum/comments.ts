import {
  Column,
  DataType,
  Table,
  ForeignKey,
  AllowNull,
  AutoIncrement,
  PrimaryKey,
  Model,
  BelongsTo,
  Length,
} from 'sequelize-typescript';
import { User } from '@backend/src/models/users/users';
import { Post } from '@backend/src/models/forum/posts';

@Table
export class Comment extends Model {
  @AutoIncrement
  @PrimaryKey
  @Column(DataType.INTEGER)
    id: number;

  @Length({ min: 1, max: 1000 })
  @AllowNull(false)
  @Column(DataType.TEXT)
    data: string;

  @AllowNull(false)
  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    field: 'user_id',
  })
    userId: number;

  @AllowNull(false)
  @ForeignKey(() => Post)
  @Column({
    type: DataType.INTEGER,
    field: 'post_id',
  })
    postId: number;

  @BelongsTo(() => User)
    user: User;
}
