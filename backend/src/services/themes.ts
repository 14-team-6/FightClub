import { Theme } from '@backend/src/models/themes/themes';
import { sequelizeGlobal } from '@backend/src/components/sequelizeGlobal';
import { ThemeUsers } from '@backend/src/models/themes/themeUsers';
import { User } from '@backend/src/models/users/users';
import { BaseService } from '@backend/src/services/baseService';

type ThemeProps = {
  name: string,
  isPremium: boolean,
  isActive: boolean,
  data: Object,
};

export class ThemesService implements BaseService<Theme> {
  public create(themeData: ThemeProps): Promise<Theme | null> {
    return Theme.create(themeData);
  }

  public get(): Promise<Theme[]> {
    return Theme.findAll({
      attributes: ['id', 'name', 'isPremium'],
      where: {
        isActive: true,
      },
    });
  }

  public update(themeId: number, themeData: ThemeProps): Promise<Theme | null> {
    return Theme.findOne({
      where: {
        id: themeId,
      },
    }).then((theme: Theme) => theme.update(themeData));
  }

  public getUserThemes(userLogin: string): Promise<Theme[]> {
    return sequelizeGlobal.sequelize.query(`
      SELECT DISTINCT
        th.id, th.name, th.data
      FROM
      "Themes" as th
      INNER JOIN "ThemeUsers" as tmu ON tmu.theme_id = th.id
      INNER JOIN "Users" as us ON us.id = tmu.user_id
      WHERE us.login = '${userLogin}'
      AND th."isActive" = true;
    `, {
      model: Theme,
      mapToModel: true,
    });
  }

  public linkToUser(userLogin: string, themeId: number): Promise<any> {
    return sequelizeGlobal.sequelize.query(`
      DELETE FROM "ThemeUsers" as tmu
      USING "Users" as us
      WHERE tmu.user_id = us.id and us.login = '${userLogin}'
    `).then(() => User.findOne({ where: { login: userLogin } }))
      .then((user: User) => ThemeUsers.create({
        userId: user.id,
        themeId,
      }));
  }
}
