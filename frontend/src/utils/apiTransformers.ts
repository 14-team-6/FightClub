import { UserDTO } from '@frontend/src/services/types';

export const transformToUser = (dto: UserDTO): User => ({
  id: dto.id,
  avatar: '',
  displayName: dto.display_name,
  email: dto.email,
  firstName: dto.first_name,
  secondName: dto.second_name,
  login: dto.login,
  phone: dto.phone,
} as User);
