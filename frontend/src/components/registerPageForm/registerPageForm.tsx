import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@frontend/src/hooks/useAuth';
import { RequestError } from '../../services/types';
import { authService } from '@frontend/src/services';
import { useNavigate } from 'react-router-dom';
import { FormInputsNames, RegisterFormData } from '../../models/form';
import { InputProps } from '../input/input';
import FormElement from '../form/form';
import ButtonElement, { ButtonProps } from '../button/button';
import SubmitFormError from '../submitFormError/submitFormError';
import schema from './schema';

const RegisterPageForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: yupResolver(schema),
  });
  const auth = useAuth();
  const navigator = useNavigate();
  const [error, setError] = useState<string>('');
  const navigate = useNavigate();

  const onSubmit: (e?: React.BaseSyntheticEvent) => Promise<void> = React.useCallback(handleSubmit(
    (data) => {
      authService.signUp(data)
        .then((user: User) => {
          auth.login(user);
        })
        .catch(({ reason }: RequestError) => {
          setError(reason);
        });
    },
  ), []);

  const registerPageFormInputs: InputProps[] = React.useMemo(() => ([
    {
      placeholder: 'First name',
      type: 'text',
      error: errors[FormInputsNames.FIRST_NAME],
      ...register(FormInputsNames.FIRST_NAME),
    },
    {
      placeholder: 'Second name',
      type: 'text',
      error: errors[FormInputsNames.SECOND_NAME],
      ...register(FormInputsNames.SECOND_NAME),
    },
    {
      placeholder: 'Login',
      type: 'text',
      error: errors[FormInputsNames.LOGIN],
      ...register(FormInputsNames.LOGIN),
    },
    {
      placeholder: 'Email',
      type: 'text',
      error: errors[FormInputsNames.EMAIL],
      ...register(FormInputsNames.EMAIL),
    },
    {
      placeholder: 'Password',
      type: FormInputsNames.PASSWORD,
      error: errors[FormInputsNames.PASSWORD],
      ...register(FormInputsNames.PASSWORD),
    },
    {
      placeholder: 'Phone',
      type: FormInputsNames.PHONE,
      error: errors[FormInputsNames.PHONE],
      ...register(FormInputsNames.PHONE),
    },
  ]), [errors]);

  const registerPageMenuButtons: ButtonProps[] = React.useMemo(() => ([{
    text: 'Register',
    type: 'submit',
  }, {
    text: 'Login',
    type: 'button',
    onClick: () => {
      navigator('/login');
    },
  }]), []);

  return (
    <>
      <SubmitFormError error={error}/>
      <FormElement
        onSubmit={onSubmit}
        inputs={registerPageFormInputs}
        buttons={registerPageMenuButtons}
      />);
      <ButtonElement type={'button'} text={'back'} onClick={() => navigate(-1)}/>
    </>
  );
};

export default React.memo(RegisterPageForm);
