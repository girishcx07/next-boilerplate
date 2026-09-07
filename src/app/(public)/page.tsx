import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { getAuthSession } from '@/server/auth';

export async function generateMetadata() {
  return {
    title: 'Next.js 16 Boilerplate',
    description: 'Next.js 16 boilerplate with React 19 and Tailwind CSS 4',
  };
}

const Index = async () => {
  const session = await getAuthSession();

  if (session) {
    return (
      <section className="flex flex-col gap-4">
        <div>
          <p className="text-sm text-muted-foreground">Your profile</p>
          <h1 className="text-3xl font-bold">Welcome back, {session.user.name}</h1>
          <p className="mt-2 text-muted-foreground">{session.user.email}</p>
        </div>
        <div>
          <Button render={<Link href="/dashboard" />} nativeButton={false}>
            Open dashboard
          </Button>
        </div>
      </section>
    );
  }

  return <p>Welcome to our Home page</p>;
};
export default Index;
