import React from 'react';
import Form from '../form/form';
import { InputProps } from '../input/input';
import MenuItems, { MenuItem } from '../menu-buttons/menu-items';

const LoginPageForm = () => {
  const loginPageFormItems: InputProps[] = React.useMemo(() => {
    return ([
      {
        placeholder: 'Login',
        type: 'text',
        required: true,
      },
      {
        placeholder: 'Password',
        type: 'password',
        required: true,
      },
    ]);
  }, []);

  const loginPageMenuItem: MenuItem[] = React.useMemo(() => {
    return ([{
      text: 'Login',
      action: () => {
      },
    }]);
  }, []);

  return (
    <>
      <Form inputs={loginPageFormItems}/>
      <MenuItems items={loginPageMenuItem}/>
    </>
  );
};

export default LoginPageForm;
