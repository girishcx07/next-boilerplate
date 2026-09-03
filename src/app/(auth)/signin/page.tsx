import Image from 'next/image';
import Link from 'next/link';

import { SignInForm } from './_components/SignInForm';

export async function generateMetadata() {
  return {
    title: 'Sign In',
    description: 'Sign in to your account',
  };
}

const SignInPage = async (props: {
  searchParams: Promise<{ callbackUrl: string | undefined }>;
}) => {
  const { callbackUrl } = await props.searchParams;
  return (
    <div className="shadow-xl">
      <div className="my-6 flex min-h-full min-w-120 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <Image
            className="mx-auto h-10 w-auto"
            src="/apple-touch-icon.png"
            alt="Your Company"
            width={40}
            height={40}
          />
          <h2 className="mt-10 text-center text-2xl leading-9 font-bold tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <SignInForm callbackUrl={callbackUrl} />
        </div>

        <p className="mt-6 text-center">
          <Link href="/" className="text-blue-700 hover:underline">
            Go to Home
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignInPage;
