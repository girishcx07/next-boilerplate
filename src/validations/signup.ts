import { z } from 'zod';

const personNameSchema = z
  .string()
  .trim()
  .min(1, 'First and last name are required.')
  .max(100, 'Names must be 100 characters or fewer.');

export const signupProfileSchema = z.object({
  firstName: personNameSchema,
  lastName: personNameSchema,
  mobileNumber: z
    .string()
    .trim()
    .regex(/^\+[1-9]\d{7,14}$/, 'Enter a valid mobile number in international format.'),
});

export const signupFormSchema = signupProfileSchema
  .extend({
    email: z
      .string()
      .trim()
      .email('Enter a valid email address.')
      .transform(email => email.toLowerCase()),
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters.')
      .max(128, 'Password must be 128 characters or fewer.'),
    confirmPassword: z.string(),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'Passwords do not match.',
    path: ['confirmPassword'],
  });
