import { screen } from '@testing-library/dom';
import { act, fireEvent, render } from '@testing-library/react';
import React from 'react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import AuthService from '@frontend/src/services/authService';
import RegisterPageForm from '@frontend/src/components/registerPageForm/registerPageForm';

jest.mock('@frontend/src/services/authService');

describe('Register page', () => {
  it('should not call AuthService if form is empty', async () => {
    render(<RegisterPageForm/>, { wrapper: BrowserRouter });

    await act(async () => {
      const el = await screen.findByText('Register');
      fireEvent.click(el);
    });

    expect(AuthService)
      .not
      .toHaveBeenCalled();
  });
});
