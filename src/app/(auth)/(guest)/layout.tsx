import { redirect } from 'next/navigation';

import { getAuthSession } from '@/server/auth';

const GuestLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await getAuthSession();

  if (session) {
    redirect('/dashboard');
  }

  return children;
};

export default GuestLayout;
