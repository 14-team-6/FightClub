export enum FormInputsNames {
  LOGIN = 'login',
  PASSWORD = 'password',
  FIRST_NAME = 'first_name',
  SECOND_NAME = 'second_name',
  DISPLAY_NAME = 'display_name',
  EMAIL = 'email',
  PHONE = 'phone',
}

export type LoginFormData = {
  [FormInputsNames.LOGIN]: string;
  [FormInputsNames.PASSWORD]: string;
};

export type RegisterFormData = {
  [FormInputsNames.FIRST_NAME]: string;
  [FormInputsNames.SECOND_NAME]: string;
  [FormInputsNames.EMAIL]: string;
  [FormInputsNames.PHONE]: string;
} & LoginFormData;

export type EditProfileFormData = {
  [FormInputsNames.DISPLAY_NAME]: string;
} & RegisterFormData;
