import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { SignupForm } from '@/components/signup-form';
import { authClient } from '@/lib/auth-client';

const replace = jest.fn();
const refresh = jest.fn();

jest.mock('next/navigation', () => ({
  useRouter: () => ({ replace, refresh }),
}));

jest.mock('@/lib/auth-client', () => ({
  authClient: {
    signUp: {
      email: jest.fn(),
    },
  },
}));

const mockedSignUp = jest.mocked(authClient.signUp.email);

describe('SignupForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the signup template fields', () => {
    render(<SignupForm />);

    expect(screen.getByLabelText('First Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Last Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Mobile Number')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByLabelText('Confirm Password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Create Account' })).toBeInTheDocument();
  });

  it('submits the complete profile through Better Auth', async () => {
    mockedSignUp.mockResolvedValue({ data: null, error: null });
    const user = userEvent.setup();

    render(<SignupForm />);

    await user.type(screen.getByLabelText('First Name'), 'Ada');
    await user.type(screen.getByLabelText('Last Name'), 'Lovelace');
    await user.type(screen.getByLabelText('Mobile Number'), '+919876543210');
    await user.type(screen.getByLabelText('Email'), 'ADA@EXAMPLE.COM');
    await user.type(screen.getByLabelText('Password'), 'secret-pass');
    await user.type(screen.getByLabelText('Confirm Password'), 'secret-pass');
    await user.click(screen.getByRole('button', { name: 'Create Account' }));

    expect(mockedSignUp).toHaveBeenCalledWith({
      name: 'Ada Lovelace',
      firstName: 'Ada',
      lastName: 'Lovelace',
      mobileNumber: '+919876543210',
      email: 'ada@example.com',
      password: 'secret-pass',
    });
    expect(replace).toHaveBeenCalledWith('/dashboard');
    expect(refresh).toHaveBeenCalled();
  });
});
