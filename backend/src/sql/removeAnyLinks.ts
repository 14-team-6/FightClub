export const removeAnyLinks = `
      UPDATE "ThemeUsers" as tmu SET "isActive" = false
      FROM "Users" as us
      WHERE tmu.user_id = us.id and us.login = :login
      `;
