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
export interface RequestError {
  reason: string;
}
