import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAuth } from '@frontend/src/hooks/useAuth';
import FormElement from '../form/form';
import { InputProps } from '../input/input';
import { FormInputsNames, LoginFormData } from '../../models/form';
import ButtonElement, { ButtonProps } from '../button/button';
import AuthService, { AuthError, REDIRECT_URL } from '../../services/authService';
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

  const auth = useAuth();
  const [error, setError] = useState<string>('');

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const onSubmit: (e?: React.BaseSyntheticEvent) => Promise<void> = React.useCallback(handleSubmit(
    (data) => {
      AuthService.signIn(data)
        .then((user: User) => {
          auth.login(user);
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

  const handleOAuth = useCallback(async () => {
    window.location.href = await AuthService.makeOAuthRedirectUrl();
  }, []);

  useEffect(() => {
    if (searchParams.has('code')) {
      AuthService.finalizeOAuth(searchParams.get('code'), REDIRECT_URL)
        .then((user: User) => {
          auth.login(user);
        }).catch(({ reason }: AuthError) => {
          navigate('.');
          setError(reason);
        });
    }
  }, []);

  return (
    <>
      <SubmitFormError error={error}/>
      <FormElement
        onSubmit={onSubmit}
        inputs={loginPageFormItems}
        buttons={loginPageMenuButtons}
      />
      <ButtonElement onClick={handleOAuth} type={'button'} text={'login by Yandex'}/>
      <ButtonElement onClick={() => navigate('/registration')} type={'button'} text={'register'}/>
    </>
  );
};

export default LoginPageForm;
