import { render, screen } from '@testing-library/react';

import { SignupForm } from '@/components/signup-form';

describe('SignupForm', () => {
  it('renders the signup template fields', () => {
    render(<SignupForm />);

    expect(screen.getByLabelText('Full Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByLabelText('Confirm Password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Create Account' })).toBeInTheDocument();
  });
});
