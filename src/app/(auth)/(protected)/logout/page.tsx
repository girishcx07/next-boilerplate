'use client';

import { signOut } from 'next-auth/react';
import { useEffect } from 'react';

const LogoutPage = () => {
  useEffect(() => {
    void signOut({ callbackUrl: '/login' });
  }, []);

  return <p className="p-6 text-sm text-muted-foreground">Logging out…</p>;
};

export default LogoutPage;
