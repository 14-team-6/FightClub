import React, { InputHTMLAttributes } from 'react';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  placeholder: string,
  required?: boolean,
  type: string,
}

const Input: React.FC<InputProps> = (props) => {
  return <input {...props}/>;
};

export default Input;
