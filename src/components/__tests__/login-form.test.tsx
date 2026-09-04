import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { signIn } from 'next-auth/react';

import { LoginForm } from '@/components/login-form';

jest.mock('next-auth/react', () => ({ signIn: jest.fn() }));

const mockedSignIn = jest.mocked(signIn);

describe('LoginForm', () => {
  it('submits credentials through NextAuth', async () => {
    mockedSignIn.mockResolvedValue(undefined);
    const user = userEvent.setup();

    render(<LoginForm callbackUrl="/dashboard" />);

    await user.type(screen.getByLabelText('Email'), 'person@example.com');
    await user.type(screen.getByLabelText('Password'), 'secret');
    await user.click(screen.getByRole('button', { name: /^Login$/ }));

    expect(mockedSignIn).toHaveBeenCalledWith('credentials', {
      username: 'person@example.com',
      password: 'secret',
      callbackUrl: '/dashboard',
    });
  });
});
