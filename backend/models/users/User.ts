import { Model, AutoIncrement, Column, DataType, Length, PrimaryKey, Table, Index } from 'sequelize-typescript';

@Table
export class User extends Model<User> {
  @AutoIncrement
  @PrimaryKey
  @Column(DataType.INTEGER)
  id: number;

  @Index
  @Length({max: 30})
  @Column(DataType.STRING)
  login: string;

  @Column(DataType.INTEGER)
  isPremium: number;

  @Column(DataType.INTEGER)
  isAdmin: number;
}
