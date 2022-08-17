export type UserDTO = {
  id: number | null,
  login: string,
  first_name: string,
  second_name: string,
  display_name: string,
  avatar: string,
  phone: string,
  email: string,
};

export type ThemeDTO = {
  id: number,
  name: string,
  isPremium: boolean,
};

export type ThemeItem = {
  id: number,
  name: string,
  isPremium: boolean,
};

export type ThemeDataDTO = {
  id: number,
  data: ThemeData
};
export interface RequestError {
  reason: string;
}
