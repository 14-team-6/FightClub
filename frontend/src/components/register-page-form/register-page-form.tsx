import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { FormInputsNames, RegisterFormData } from '../../models/form';
import { InputProps } from '../input/input';
import FormElement from '../form/form';
import { ButtonProps } from '../button/button';
import { phoneRegExp } from '../../../consts/regexp';

const schema = yup.object({
  [FormInputsNames.LOGIN]: yup.string()
    .required()
    .trim()
    .min(5),
  [FormInputsNames.PASSWORD]: yup.string()
    .required()
    .trim()
    .min(5),
  [FormInputsNames.FIRST_NAME]: yup.string()
    .required('First name is required field')
    .trim()
    .min(2),
  [FormInputsNames.SECOND_NAME]: yup.string()
    .required('Second name is required field')
    .trim()
    .min(2),
  [FormInputsNames.EMAIL]: yup.string()
    .required()
    .email(),
  [FormInputsNames.PHONE]: yup.string()
    .required()
    .matches(phoneRegExp, 'Phone number is not valid')
    .min(5),
})
  .required();

const RegisterPageForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: yupResolver(schema),
  });
  const onSubmit: (e?: React.BaseSyntheticEvent) => Promise<void> = React.useCallback(handleSubmit(
    (data) => {
      // eslint-disable-next-line no-console
      console.log(data);
    },
  ), []);

  const registerPageFormInputs: InputProps[] = React.useMemo(() => {
    return ([
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
        type: 'text',
        error: errors[FormInputsNames.PASSWORD],
        ...register(FormInputsNames.PASSWORD),
      },
      {
        placeholder: 'Phone',
        type: FormInputsNames.PHONE,
        error: errors[FormInputsNames.PHONE],
        ...register(FormInputsNames.PHONE),
      },
    ]);
  }, [errors]);

  const registerPageMenuButtons: ButtonProps[] = React.useMemo(() => {
    return ([{
      text: 'Register',
      type: 'submit',
    }]);
  }, []);

  return (
    <FormElement
      onSubmit={onSubmit}
      inputs={registerPageFormInputs}
      buttons={registerPageMenuButtons}
    />);
};

export default React.memo(RegisterPageForm);
