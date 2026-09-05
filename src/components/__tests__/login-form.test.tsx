import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { LoginForm } from '@/components/login-form';
import { authClient } from '@/lib/auth-client';

const replace = jest.fn();
const refresh = jest.fn();

jest.mock('next/navigation', () => ({
  useRouter: () => ({ replace, refresh }),
}));

jest.mock('@/lib/auth-client', () => ({
  authClient: {
    signIn: {
      email: jest.fn(),
    },
  },
}));

const mockedSignIn = jest.mocked(authClient.signIn.email);

describe('LoginForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('submits credentials through Better Auth', async () => {
    mockedSignIn.mockResolvedValue({ data: null, error: null });
    const user = userEvent.setup();

    render(<LoginForm callbackUrl="/dashboard" />);

    await user.type(screen.getByLabelText('Email'), 'person@example.com');
    await user.type(screen.getByLabelText('Password'), 'secret-pass');
    await user.click(screen.getByRole('button', { name: /^Login$/ }));

    expect(mockedSignIn).toHaveBeenCalledWith({
      email: 'person@example.com',
      password: 'secret-pass',
    });
    expect(replace).toHaveBeenCalledWith('/dashboard');
    expect(refresh).toHaveBeenCalled();
  });
});
