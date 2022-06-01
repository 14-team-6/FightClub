import React, { ChangeEvent, useState } from 'react';
import Form from '../form/form';
import { InputProps } from '../input/input';
import MenuItems, { MenuItem } from '../menu-buttons/menu-items';

const LoginPageForm = () => {
  const [login, setLogin] = useState<string>();
  const [password, setPassword] = useState<string>();

  const loginPageFormItems: InputProps[] = React.useMemo(() => {
    console.log(123);
    return ([
      {
        placeholder: 'Login',
        type: 'text',
        required: true,
        onChange: (e: ChangeEvent<HTMLInputElement>) => {
          setLogin(e.target.value);
          console.log(e.target.value);
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
      text: 'Login',
      onClick: () => {
        console.log(login, password);
      },
    }]);
  }, [login, password]);

  return (
    <>
      <Form inputs={loginPageFormItems}/>
      <MenuItems items={loginPageMenuItem}/>
    </>
  );
};

export default LoginPageForm;
