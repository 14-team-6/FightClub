import { Theme } from '@backend/src/models/themes/themes';
import { sequelizeGlobal } from '@backend/src/components/sequelizeGlobal';
import { ThemeUsers } from '@backend/src/models/themes/themeUsers';
import { User } from '@backend/src/models/users/users';
import { BaseService } from '@backend/src/services/baseService';
import { getUserTheme } from '@backend/src/sql/getUserTheme';
import { linkThemeToUser } from '@backend/src/sql/linkThemeToUser';

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
    return sequelizeGlobal.sequelize.query(getUserTheme, {
      model: Theme,
      mapToModel: true,
      replacements: { login: userLogin },
    });
  }

  public linkToUser(userLogin: string, themeId: number): Promise<any> {
    return sequelizeGlobal.sequelize.query(linkThemeToUser, {
      replacements: { login: userLogin },
    }).then(() => User.findOne({ where: { login: userLogin } }))
      .then((user: User) => ThemeUsers.create({
        userId: user.id,
        themeId,
      }));
  }
}
