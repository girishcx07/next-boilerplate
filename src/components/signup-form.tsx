'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Field, FieldDescription, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { authClient } from '@/lib/auth-client';
import { cn } from '@/lib/utils';
import { signupFormSchema } from '@/validations/signup';

export const SignupForm = ({ className, ...props }: React.ComponentProps<'form'>) => {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage(null);

    const formData = new FormData(event.currentTarget);
    const signup = signupFormSchema.safeParse({
      firstName: formData.get('firstName'),
      lastName: formData.get('lastName'),
      mobileNumber: formData.get('mobileNumber'),
      email: formData.get('email'),
      password: formData.get('password'),
      confirmPassword: formData.get('confirmPassword'),
    });

    if (!signup.success) {
      setErrorMessage(signup.error.issues[0]?.message ?? 'Please check your details.');
      return;
    }

    setIsPending(true);

    try {
      const { firstName, lastName, mobileNumber, email, password } = signup.data;
      const { error } = await authClient.signUp.email({
        name: `${firstName} ${lastName}`,
        firstName,
        lastName,
        mobileNumber,
        email,
        password,
      });

      if (error) {
        setErrorMessage(error.message ?? 'Unable to create your account.');
        return;
      }

      router.replace('/dashboard');
      router.refresh();
    } catch {
      setErrorMessage('Unable to create your account. Please try again.');
    } finally {
      setIsPending(false);
    }
  };

  return (
    <form className={cn('flex flex-col gap-6', className)} onSubmit={handleSubmit} {...props}>
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">Create your account</h1>
          <p className="text-sm text-balance text-muted-foreground">
            Fill in the form below to create your account
          </p>
        </div>
        <Field>
          <FieldLabel htmlFor="first-name">First Name</FieldLabel>
          <Input
            id="first-name"
            name="firstName"
            type="text"
            autoComplete="given-name"
            maxLength={100}
            placeholder="John"
            required
            className="bg-background"
          />
        </Field>
        <Field>
          <FieldLabel htmlFor="last-name">Last Name</FieldLabel>
          <Input
            id="last-name"
            name="lastName"
            type="text"
            autoComplete="family-name"
            maxLength={100}
            placeholder="Doe"
            required
            className="bg-background"
          />
        </Field>
        <Field>
          <FieldLabel htmlFor="mobile-number">Mobile Number</FieldLabel>
          <Input
            id="mobile-number"
            name="mobileNumber"
            type="tel"
            autoComplete="tel"
            inputMode="tel"
            maxLength={16}
            pattern="\+[1-9][0-9]{7,14}"
            placeholder="+919876543210"
            required
            className="bg-background"
          />
          <FieldDescription>Use international format, including the country code.</FieldDescription>
        </Field>
        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="m@example.com"
            required
            className="bg-background"
          />
          <FieldDescription>
            We&apos;ll use this to contact you. We will not share your email with anyone else.
          </FieldDescription>
        </Field>
        <Field>
          <FieldLabel htmlFor="password">Password</FieldLabel>
          <Input
            id="password"
            name="password"
            type="password"
            autoComplete="new-password"
            minLength={8}
            maxLength={128}
            required
            className="bg-background"
          />
          <FieldDescription>Must be at least 8 characters long.</FieldDescription>
        </Field>
        <Field>
          <FieldLabel htmlFor="confirm-password">Confirm Password</FieldLabel>
          <Input
            id="confirm-password"
            name="confirmPassword"
            type="password"
            autoComplete="new-password"
            minLength={8}
            maxLength={128}
            required
            className="bg-background"
          />
          <FieldDescription>Please confirm your password.</FieldDescription>
        </Field>
        <Field>
          <Button type="submit" disabled={isPending}>
            {isPending ? 'Creating Account…' : 'Create Account'}
          </Button>
          {errorMessage ? (
            <p role="alert" className="text-sm text-destructive">
              {errorMessage}
            </p>
          ) : null}
        </Field>
        <Field>
          <FieldDescription className="px-6 text-center">
            Already have an account? <Link href="/login">Sign in</Link>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  );
};
