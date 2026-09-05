'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { type FormEvent, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Field, FieldDescription, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { authClient } from '@/lib/auth-client';
import { cn } from '@/lib/utils';

export const LoginForm = ({
  className,
  callbackUrl = '/dashboard',
  ...props
}: React.ComponentProps<'form'> & { callbackUrl?: string }) => {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage(null);
    setIsPending(true);
    const formData = new FormData(event.currentTarget);
    const destination =
      callbackUrl.startsWith('/') && !callbackUrl.startsWith('//') ? callbackUrl : '/dashboard';

    try {
      const { error } = await authClient.signIn.email({
        email: String(formData.get('email') ?? ''),
        password: String(formData.get('password') ?? ''),
      });

      if (error) {
        setErrorMessage(error.message ?? 'Unable to sign in.');
        return;
      }

      router.replace(destination);
      router.refresh();
    } catch {
      setErrorMessage('Unable to sign in. Please try again.');
    } finally {
      setIsPending(false);
    }
  };

  return (
    <form className={cn('flex flex-col gap-6', className)} onSubmit={handleSubmit} {...props}>
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">Login to your account</h1>
          <p className="text-sm text-balance text-muted-foreground">
            Enter your email below to login to your account
          </p>
        </div>
        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input id="email" name="email" type="email" placeholder="m@example.com" required />
        </Field>
        <Field>
          <FieldLabel htmlFor="password">Password</FieldLabel>
          <Input
            id="password"
            name="password"
            type="password"
            minLength={8}
            maxLength={128}
            required
          />
        </Field>
        <Field>
          <Button type="submit" disabled={isPending}>
            {isPending ? 'Logging in…' : 'Login'}
          </Button>
          {errorMessage ? (
            <p role="alert" className="text-sm text-destructive">
              {errorMessage}
            </p>
          ) : null}
        </Field>
        <Field>
          <FieldDescription className="text-center">
            Don&apos;t have an account?{' '}
            <Link href="/signup" className="underline underline-offset-4">
              Sign up
            </Link>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  );
};
