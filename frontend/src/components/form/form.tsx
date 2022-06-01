import React from 'react';
import styled from 'styled-components';
import Input, { InputProps } from '../input/input';

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

interface FormProps {
  inputs: InputProps[],
  className?: string,
}

const FormElement: React.FC<FormProps> = ({ inputs }) => {
  return (
    <Form>
      {inputs.map((input) => {
        return (
        <Input key={input.placeholder} {...input}/>
        );
      })}
    </Form>
  );
};

export default FormElement;
