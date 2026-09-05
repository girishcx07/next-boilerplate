'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { authClient } from '@/lib/auth-client';

const LogoutPage = () => {
  const router = useRouter();

  useEffect(() => {
    void authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.replace('/login');
          router.refresh();
        },
      },
    });
  }, [router]);

  return <p className="p-6 text-sm text-muted-foreground">Logging out…</p>;
};

export default LogoutPage;
