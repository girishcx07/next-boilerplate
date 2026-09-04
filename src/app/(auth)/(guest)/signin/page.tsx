import { redirect } from 'next/navigation';

export async function generateMetadata() {
  return {
    title: 'Sign In',
    description: 'Sign in to your account',
  };
}

const SignInPage = async ({ searchParams }: PageProps<'/signin'>) => {
  const { callbackUrl } = await searchParams;
  const destination = new URL('/login', 'http://localhost');

  if (typeof callbackUrl === 'string') {
    destination.searchParams.set('callbackUrl', callbackUrl);
  }

  redirect(`${destination.pathname}${destination.search}`);
};

export default SignInPage;
