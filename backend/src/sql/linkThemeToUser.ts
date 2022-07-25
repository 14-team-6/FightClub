export const linkThemeToUser = `
      DELETE FROM "ThemeUsers" as tmu
      USING "Users" as us
      WHERE tmu.user_id = us.id and us.login = :login
      `;
