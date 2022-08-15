import { render } from '@testing-library/react';
import React from 'react';
import '@testing-library/jest-dom';
import LoginPageForm from '@frontend/src/components/loginPageForm/loginPageForm';
import { BrowserRouter } from 'react-router-dom';

describe('login page should render', () => {
  it('renders page without crashing', () => {
    render(<LoginPageForm/>, { wrapper: BrowserRouter });
  });
});
