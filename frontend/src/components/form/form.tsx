import React from 'react';
import Input, { InputProps } from '../input/input.tsx';

interface FormProps {
  inputs: InputProps[],
  className?: string,
}

const Form: React.FC<FormProps> = ({ inputs, className }) => {
  return (
    <form className={className}>
      {inputs.map((input) => {
        return (
        <Input key={input.placeholder} {...input}/>
        );
      })}
    </form>
  );
};

export default Form;
