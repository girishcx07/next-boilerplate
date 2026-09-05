import { signupFormSchema, signupProfileSchema } from '@/validations/signup';

describe('signup validation', () => {
  it('normalizes a valid signup', () => {
    const signup = signupFormSchema.parse({
      firstName: ' Ada ',
      lastName: ' Lovelace ',
      mobileNumber: ' +919876543210 ',
      email: ' ADA@EXAMPLE.COM ',
      password: 'secret-pass',
      confirmPassword: 'secret-pass',
    });

    expect(signup).toMatchObject({
      firstName: 'Ada',
      lastName: 'Lovelace',
      mobileNumber: '+919876543210',
      email: 'ada@example.com',
    });
  });

  it('rejects a mobile number that is not in E.164 format', () => {
    const profile = signupProfileSchema.safeParse({
      firstName: 'Ada',
      lastName: 'Lovelace',
      mobileNumber: '9876543210',
    });

    expect(profile.success).toBe(false);
  });
});
