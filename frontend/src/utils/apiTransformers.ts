import { UserDTO } from '@frontend/src/services/types';

function isUser(user: UserDTO | User): user is User {
  return !!(user as User)?.displayName;
}

export const transformToUser = (dto: UserDTO | User): User => {
  if (isUser(dto)) {
    return dto;
  }

  return {
    id: dto.id,
    avatar: dto.avatar,
    displayName: dto.display_name,
    email: dto.email,
    firstName: dto.first_name,
    secondName: dto.second_name,
    login: dto.login,
    phone: dto.phone,
  };
};
