import { Model, AutoIncrement, Column, DataType, Length, PrimaryKey, Table, Index } from 'sequelize-typescript';

type ThemeData = {
  consts: Record<string, string>[];
};

@Table
export class Theme extends Model<Theme> {
  @AutoIncrement
  @PrimaryKey
  @Column(DataType.INTEGER)
  id: number;

  @Index
  @Length({max: 30})
  @Column(DataType.STRING)
  name: string;

  @Column(DataType.INTEGER)
  isPremium: number;

  @Column(DataType.JSON)
  data: ThemeData;
}
