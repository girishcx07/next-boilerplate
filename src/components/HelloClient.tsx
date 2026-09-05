'use client';

import { authClient } from '@/lib/auth-client';

export const HelloClient = () => {
  const session = authClient.useSession();
  return JSON.stringify(session, null, 2);
};
