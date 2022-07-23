import {
  Model,
  Column,
  DataType,
  Table,
  ForeignKey,
  AllowNull,
} from 'sequelize-typescript';
import { Theme } from '@backend/src/models/themes/themes';
import { User } from '@backend/src/models/users/users';

@Table
export class ThemeUsers extends Model {
  @AllowNull(false)
  @ForeignKey(() => Theme)
  @Column({
    type: DataType.INTEGER,
    field: 'theme_id',
  })
    themeId: number;

  @AllowNull(false)
  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    field: 'user_id',
  })
    userId: number;
}
