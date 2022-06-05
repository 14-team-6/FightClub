import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import FormElement from '../form/form';
import { InputProps } from '../input/input';
import { FormInputsNames, LoginFormData } from '../../models/form';
import { ButtonProps } from '../button/button';

const schema = yup.object({
  [FormInputsNames.LOGIN]: yup.string()
    .required()
    .trim()
    .min(5),
  [FormInputsNames.PASSWORD]: yup.string()
    .required()
    .trim()
    .min(5),
})
  .required();

const LoginPageForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: yupResolver(schema),
  });
  const onSubmit: (e?: React.BaseSyntheticEvent) => Promise<void> = React.useCallback(handleSubmit(
    (data) => {
      // eslint-disable-next-line no-console
      console.log(data);
    },
  ), []);

  const loginPageFormItems: InputProps[] = React.useMemo(() => ([
    {
      placeholder: 'Login',
      type: 'text',
      error: errors[FormInputsNames.LOGIN],
      ...register(FormInputsNames.LOGIN),
    },
    {
      placeholder: 'Password',
      type: FormInputsNames.PASSWORD,
      error: errors[FormInputsNames.PASSWORD],
      ...register(FormInputsNames.PASSWORD),
    },
  ]), [errors]);

  const loginPageMenuButtons: ButtonProps[] = React.useMemo(() => ([{
    text: 'Login',
    type: 'submit',
  }]), []);

  return (
    <FormElement
      onSubmit={onSubmit}
      inputs={loginPageFormItems}
      buttons={loginPageMenuButtons}
    />
  );
};

export default LoginPageForm;
