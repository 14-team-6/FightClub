export const getUserTheme = `
      SELECT DISTINCT
        th.id, th.name, th.data
      FROM
      "Themes" as th
      INNER JOIN "ThemeUsers" as tmu ON tmu.theme_id = th.id
      INNER JOIN "Users" as us ON us.id = tmu.user_id
      WHERE us.login = :login
      AND th."isActive" = true;
    `;
