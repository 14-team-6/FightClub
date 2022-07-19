import { Model, AutoIncrement, Column, DataType, PrimaryKey, Table, ForeignKey } from 'sequelize-typescript';
import { Theme } from '@backend/models/themes/Theme';
import { User } from '@backend/models/users/User';

@Table
export class ThemeUser extends Model<ThemeUser> {
  @AutoIncrement
  @PrimaryKey
  @Column(DataType.INTEGER)
  id: number;

  @ForeignKey(() => Theme)
  @Column({
    type: DataType.INTEGER,
    field: 'theme_id',
  })
  themeId: number;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    field: 'user_id',
  })
  userId: number;
}
