import { redirect } from 'next/navigation';

import { getAuthSession } from '@/server/auth';

const AuthLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await getAuthSession();

  if (!session) {
    redirect('/login');
  }

  return children;
};

export default AuthLayout;
