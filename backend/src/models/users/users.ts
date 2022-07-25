import {
  Model,
  AutoIncrement,
  Column,
  DataType,
  Length,
  PrimaryKey,
  Table,
  Default,
  AllowNull, Index, Unique,
} from 'sequelize-typescript';

@Table
export class User extends Model {
  @AutoIncrement
  @PrimaryKey
  @Column(DataType.INTEGER)
    id: number;

  @Length({ max: 30 })
  @AllowNull(false)
  @Index
  @Unique(true)
  @Column(DataType.STRING)
    login: string;

  @Length({ max: 30 })
  @Column(DataType.STRING)
    name: string;

  @Default(false)
  @Column(DataType.BOOLEAN)
    isPremium: boolean;

  @Default(false)
  @Column(DataType.BOOLEAN)
    isAdmin: boolean;
}
