import React, { FC, useState } from 'react';
import FormElement from '@frontend/src/components/form/form';
import { InputProps } from '@frontend/src/components/input/input';
import { ButtonProps } from '@frontend/src/components/button/button';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { forumService } from '@frontend/src/services';
import SubmitFormError from '@frontend/src/components/submitFormError/submitFormError';

const schema = yup.object({
  name: yup.string()
    .required()
    .trim()
    .min(2),
})
  .required();

type AddTopicFormFields = {
  name: string;
};

const AddTopicForm: FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddTopicFormFields>({
    resolver: yupResolver(schema),
  });
  const [error, setError] = useState<string>('');
  const navigate = useNavigate();

  const addTopicPageFormInputs: InputProps[] = React.useMemo(() => ([
    {
      placeholder: 'Topic name',
      type: 'text',
      error: errors.name,
      ...register('name'),
    },
  ]), [errors]);

  const addTopicPageMenuButtons: ButtonProps[] = React.useMemo(() => ([
    {
      text: 'Create',
      type: 'submit',
    }, {
      text: 'Back',
      type: 'button',
      onClick: () => {
        navigate('/topics');
      },
    }]), []);

  const onSubmit: (e?: React.BaseSyntheticEvent) => Promise<void> = React.useCallback(handleSubmit(
    (data) => {
      forumService.createTopic(data.name)
        .then(() => {
          navigate('/topics');
        })
        .catch((e: { result: string }) => {
          setError(e.result);
        });
    },
  ), []);

  return (
    <>
      <SubmitFormError error={error}/>
      <FormElement
        onSubmit={onSubmit}
        inputs={addTopicPageFormInputs}
        buttons={addTopicPageMenuButtons}
      />
    </>
  );
};

export { AddTopicForm };
