import React, { ChangeEvent, useState } from 'react';
import { InputProps } from '../input/input';
import MenuItems, { MenuItem } from '../menu-buttons/menu-items';
import Form from '../form/form';

const RegisterPageForm: React.FC = () => {
  const [firstName, setFirstName] = useState<string>();
  const [secondName, setSecondName] = useState<string>();
  const [login, setLogin] = useState<string>();
  const [password, setPassword] = useState<string>();

  const loginPageFormItems: InputProps[] = React.useMemo(() => {
    return ([
      {
        placeholder: 'First name',
        type: 'text',
        required: true,
        onChange: (e: ChangeEvent<HTMLInputElement>) => {
          setFirstName(e.target.value);
        },
      },
      {
        placeholder: 'Second name',
        type: 'text',
        required: true,
        onChange: (e: ChangeEvent<HTMLInputElement>) => {
          setSecondName(e.target.value);
        },
      },
      {
        placeholder: 'Login',
        type: 'text',
        required: true,
        onChange: (e: ChangeEvent<HTMLInputElement>) => {
          setLogin(e.target.value);
        },
      },
      {
        placeholder: 'Password',
        type: 'password',
        required: true,
        onChange: (e: ChangeEvent<HTMLInputElement>) => {
          setPassword(e.target.value);
        },
      },
    ]);
  }, []);

  const loginPageMenuItem: MenuItem[] = React.useMemo(() => {
    return ([{
      text: 'Registration',
      onClick: () => {
        console.log(firstName, secondName, password, login);
      },
    }]);
  }, [firstName, secondName, password, login]);

  return (
    <>
      <Form inputs={loginPageFormItems}/>
      <MenuItems items={loginPageMenuItem}/>
    </>
  );
};

export default RegisterPageForm;
