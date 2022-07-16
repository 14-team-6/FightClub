import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAuth } from '@frontend/src/hooks/useAuth';
import AuthService from '@frontend/src/services/authService';
import UserService from '@frontend/src/services/userService';
import { RequestError } from '@frontend/src/services/types';
import { FormInputsNames, EditProfileFormData } from '../../models/form';
import { InputProps } from '../input/input';
import FormElement from '../form/form';
import { ButtonProps } from '../button/button';
import SubmitFormError from '../submitFormError/submitFormError';
import schema from './schema';

const EditProfilePageForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<EditProfileFormData>({
    resolver: yupResolver(schema),
  });
  const auth = useAuth();
  const [error, setError] = useState<string>('');

  const onSubmit: (e?: React.BaseSyntheticEvent) => Promise<void> = React.useCallback(handleSubmit(
    (data) => {
      UserService.userProfile(data)
        .then((user: User) => {
          auth.profile(user);
        })
        .catch(({ reason }: RequestError) => {
          setError(reason);
        });
    },
  ), []);

  const editProfilePageFormInputs: InputProps[] = React.useMemo(() => ([
    {
      placeholder: 'Display name',
      type: 'text',
      error: errors[FormInputsNames.DISPLAY_NAME],
      ...register(FormInputsNames.DISPLAY_NAME),
    },
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
      placeholder: 'Phone',
      type: FormInputsNames.PHONE,
      error: errors[FormInputsNames.PHONE],
      ...register(FormInputsNames.PHONE),
    },
  ]), [errors]);

  const editProfilePageMenuButtons: ButtonProps[] = React.useMemo(() => ([{
    text: 'Save',
    type: 'submit',
  }]), []);

  useEffect(() => {
    AuthService.getUser().then((user: User) => {
      setValue(FormInputsNames.DISPLAY_NAME, user.displayName ? user.displayName : '');
      setValue(FormInputsNames.FIRST_NAME, user.firstName ? user.firstName : '');
      setValue(FormInputsNames.SECOND_NAME, user.secondName ? user.secondName : '');
      setValue(FormInputsNames.EMAIL, user.email ? user.email : '');
      setValue(FormInputsNames.LOGIN, user.login ? user.login : '');
      setValue(FormInputsNames.PHONE, user.phone ? user.phone : '');
    });
  }, [errors]);

  return (
    <>
      <SubmitFormError error={error}/>
      <FormElement
        onSubmit={onSubmit}
        inputs={editProfilePageFormInputs}
        buttons={editProfilePageMenuButtons}
      />
    </>
  );
};

export default React.memo(EditProfilePageForm);
