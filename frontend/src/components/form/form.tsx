import React from 'react';
import styled from 'styled-components';
import InputElement, { InputProps } from '../input/input';
import ButtonElement, { ButtonProps } from '../button/button';

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

interface FormProps {
  inputs: InputProps[],
  buttons: ButtonProps[],
  onSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>
}

const FormElement: React.FC<FormProps> = ({
  inputs,
  buttons,
  onSubmit,
}) => {
  return (
    <Form onSubmit={onSubmit}>
      {inputs.map((input) => {
        return (
          <InputElement key={input.placeholder} {...input}/>
        );
      })}

      {buttons.map((button) => {
        return (
          <ButtonElement key={button.text} {...button}/>
        );
      })}
    </Form>
  );
};

export default React.memo(FormElement);
