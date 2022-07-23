import {
  Model,
  AutoIncrement,
  Column,
  DataType,
  Length,
  PrimaryKey,
  Table,
  Index,
  Default,
  AllowNull,
} from 'sequelize-typescript';

type ThemeData = {
  constants: Record<string, string>;
};

@Table
export class Theme extends Model {
  @AutoIncrement
  @PrimaryKey
  @Column(DataType.INTEGER)
    id: number;

  @Index
  @AllowNull(false)
  @Length({ max: 30 })
  @Column(DataType.STRING)
    name: string;

  @Default(false)
  @Column(DataType.BOOLEAN)
    isPremium: boolean;

  @Default(true)
  @Column(DataType.BOOLEAN)
    isActive: boolean;

  @AllowNull(false)
  @Column(DataType.JSONB)
    data: ThemeData;
}
