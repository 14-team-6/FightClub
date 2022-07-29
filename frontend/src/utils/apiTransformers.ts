import {
  UserDTO, ThemeDTO, ThemeDataDTO, ThemeItem,
} from '@frontend/src/services/types';

function isUser(user: UserDTO | User): user is User {
  return !!(user as User)?.displayName;
}

function emptyTheme(theme: ThemeDataDTO | {}) {
  return !(theme as ThemeDataDTO)?.data;
}

export const transformToUser = (dto: UserDTO | User): User => {
  if (isUser(dto)) {
    return dto;
  }

  return {
    id: dto.id as number,
    avatar: dto.avatar,
    displayName: dto.display_name,
    email: dto.email,
    firstName: dto.first_name,
    secondName: dto.second_name,
    login: dto.login,
    phone: dto.phone,
  };
};

export const transformToTheme = (dto: ThemeDTO): ThemeItem => ({
  id: dto.id,
  name: dto.name,
  isPremium: dto.isPremium,
});

export const transformToThemeData = (dto: ThemeDataDTO): ThemeData | {} => {
  if (emptyTheme(dto)) {
    return dto;
  }

  return {
    id: dto.id,
    font: dto.data.font,
    colors: dto.data.colors,
    fontSizes: dto.data.fontSizes,
    background: dto.data.background,
  };
};
