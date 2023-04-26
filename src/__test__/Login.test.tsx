import App from '../App';
import Login from '../pages/Login';
import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { it, describe, expect } from 'vitest';

describe('Rendered correctly', () => {
  it('Check if the App render very well', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    screen.debug();
  });

  it('Check Login Page and Form Validation', async () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    screen.getByTestId('welcome-header');
    const usernameInput = screen.getByTestId('username-input');
    const passwordInput = screen.getByTestId('password-input');
    const signinButton = screen.getByTestId('signin-button');

    // test input to be null at first
    expect(usernameInput).toHaveValue('');
    expect(passwordInput).toHaveValue('');

    // check validation when button is clicked
    fireEvent.click(signinButton);

    const errorUsername = await screen.findByText('Username is required.');
    const errorPassword = await screen.findByText('Password is required.');

    expect(errorUsername).toBeInTheDocument();
    expect(errorPassword).toBeInTheDocument();
  });
});
