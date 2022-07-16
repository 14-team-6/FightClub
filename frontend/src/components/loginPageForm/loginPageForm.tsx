import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAuth } from '@frontend/src/hooks/useAuth';
import { authService } from '@frontend/src/services';
import FormElement from '../form/form';
import { InputProps } from '../input/input';
import { FormInputsNames, LoginFormData } from '../../models/form';
import { ButtonProps } from '../button/button';
import { RequestError } from '../../services/types';
import SubmitFormError from '../submitFormError/submitFormError';
import schema from './schema';
import { REDIRECT_URL } from '@frontend/src/services/authService';

const LoginPageForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: yupResolver(schema),
  });

  const auth = useAuth();
  const navigator = useNavigate();
  const [error, setError] = useState<string>('');

  const [searchParams] = useSearchParams();

  const onSubmit: (e?: React.BaseSyntheticEvent) => Promise<void> = React.useCallback(handleSubmit(
    (data) => {
      authService.signIn(data)
        .then((user: User) => {
          auth.login(user);
        })
        .catch(({ reason }: RequestError) => {
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

  const loginPageMenuButtons: ButtonProps[] = React.useMemo(() => ([
    {
      text: 'Login',
      type: 'submit',
    },
    {
      text: 'Login by Yandex',
      type: 'button',
      onClick: handleOAuth,
    },
    {
      text: 'Registration',
      type: 'button',
      onClick: () => {
        navigator('/registration');
      },
    }]), []);

  const handleOAuth = useCallback(async () => {
    window.location.href = await authService.makeOAuthRedirectUrl();
  }, []);

  useEffect(() => {
    if (searchParams.has('code')) {
      authService.finalizeOAuth(searchParams.get('code'), REDIRECT_URL)
        .then((user: User) => {
          auth.login(user);
        }).catch(({ reason }: RequestError) => {
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
    </>
  );
};

export default LoginPageForm;
