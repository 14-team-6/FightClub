import React, { FC, useState } from 'react';
import FormElement from '@frontend/src/components/form/form';
import { InputProps } from '@frontend/src/components/input/input';
import { ButtonProps } from '@frontend/src/components/button/button';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate, useParams } from 'react-router-dom';
import { forumService } from '@frontend/src/services';
import SubmitFormError from '@frontend/src/components/submitFormError/submitFormError';

const schema = yup.object({
  content: yup.string()
    .required()
    .trim()
    .min(10),
  title: yup.string()
    .required()
    .trim()
    .min(2),
})
  .required();

type AddPostFormFields = {
  content: string;
  title: string;
};

const AddPostForm: FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddPostFormFields>({
    resolver: yupResolver(schema),
  });
  const { topicId } = useParams();
  const [error, setError] = useState<string>('');
  const navigate = useNavigate();

  const addPostPageFormInputs: InputProps[] = React.useMemo(() => ([
    {
      placeholder: 'Post title',
      type: 'text',
      error: errors.title,
      ...register('title'),
    },
    { // TODO convert to textArea asap
      placeholder: 'Post content',
      type: 'text',
      error: errors.content,
      ...register('content'),
    },
  ]), [errors]);

  const addPostPageMenuButtons: ButtonProps[] = React.useMemo(() => ([
    {
      text: 'Create',
      type: 'submit',
    }, {
      text: 'Back',
      type: 'button',
      onClick: () => {
        navigate(-1);
      },
    }]), []);

  const onSubmit: (e?: React.BaseSyntheticEvent) => Promise<void> = React.useCallback(handleSubmit(
    (data) => {
      forumService.createPost(topicId!, data.content, data.title)
        .then(() => {
          navigate(-1);
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
        inputs={addPostPageFormInputs}
        buttons={addPostPageMenuButtons}
      />
    </>
  );
};

export { AddPostForm };
