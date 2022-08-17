import { screen } from '@testing-library/dom';
import { act, fireEvent, render } from '@testing-library/react';
import React from 'react';
import '@testing-library/jest-dom';
import LoginPageForm from '@frontend/src/components/loginPageForm/loginPageForm';
import { BrowserRouter } from 'react-router-dom';
import AuthService from '@frontend/src/services/authService';

jest.mock('@frontend/src/services/authService');

describe('Login page', () => {
  it('should not call AuthService if form is empty', async () => {
    render(<LoginPageForm/>, { wrapper: BrowserRouter });

    await act(async () => {
      const el = await screen.findByText('Login');
      fireEvent.click(el);
    });

    expect(AuthService).not.toHaveBeenCalled();
  });
});
