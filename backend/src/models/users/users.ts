import {
  Model,
  AutoIncrement,
  Column,
  DataType,
  Length,
  PrimaryKey,
  Table,
  Index,
  Unique,
  Default,
  AllowNull,
} from 'sequelize-typescript';

@Table
export class User extends Model {
  @AutoIncrement
  @PrimaryKey
  @Column(DataType.INTEGER)
    id: number;

  @Index
  @Unique
  @AllowNull(false)
  @Length({ max: 30 })
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
