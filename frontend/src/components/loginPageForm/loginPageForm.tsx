import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import FormElement from '../form/form';
import { InputProps } from '../input/input';
import { FormInputsNames, LoginFormData } from '../../models/form';
import { ButtonProps } from '../button/button';
import AuthService, { AuthError } from '../../../services/authService';
import SubmitFormError from '../submitFormError/submitFormError';
import schema from './schema';

const LoginPageForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: yupResolver(schema),
  });

  const navigator = useNavigate();
  const [error, setError] = useState<string>('');

  const onSubmit: (e?: React.BaseSyntheticEvent) => Promise<void> = React.useCallback(handleSubmit(
    (data) => {
      AuthService.signIn(data)
        .then(() => {
          navigator('/main');
        })
        .catch(({ reason }: AuthError) => {
          setError(reason);
        });
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
    <>
      <SubmitFormError error={error}/>
      <FormElement
        onSubmit={onSubmit}
        inputs={loginPageFormItems}
        buttons={loginPageMenuButtons}
      />
    </>
  );
};

export default LoginPageForm;
