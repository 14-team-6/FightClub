import {
  Column,
  DataType,
  Table,
  ForeignKey,
  AllowNull,
  AutoIncrement,
  PrimaryKey,
  HasMany, Model, Length,
} from 'sequelize-typescript';
import { User } from '@backend/src/models/users/users';
import { Post } from '@backend/src/models/forum/posts';

@Table
export class Topic extends Model {
  @AutoIncrement
  @PrimaryKey
  @Column(DataType.INTEGER)
    id: number;

  @Length({ min: 1, max: 200 })
  @AllowNull(false)
  @Column(DataType.STRING)
    data: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    field: 'user_id',
  })
    userId: number;

  @HasMany(() => Post)
    posts: Post[];
}
