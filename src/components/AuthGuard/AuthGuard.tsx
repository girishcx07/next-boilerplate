'use client';

import { ArrowPathIcon } from '@heroicons/react/24/solid';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';

type Props = {
  children: React.ReactNode;
};

export const AuthGuard: React.FC<Props> = ({ children }) => {
  const session = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (session.status === 'unauthenticated') {
      const query = searchParams.toString();
      const callbackUrl = query ? `${pathname}?${query}` : pathname;

      router.replace(`/login?callbackUrl=${encodeURIComponent(callbackUrl)}`);
    }
  }, [session.status, pathname, router, searchParams]);

  if (session.status !== 'authenticated') {
    return (
      <div className="flex h-screen items-center justify-center">
        <ArrowPathIcon className="size-6 animate-spin" />
      </div>
    );
  }

  return children;
};
