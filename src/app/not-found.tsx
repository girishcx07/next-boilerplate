'use client';

import { ArrowRightIcon } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';

const NotFoundPage = () => {
  return (
    <div className="flex min-h-svh items-center justify-center px-4 py-14">
      <main className="flex flex-col gap-3 text-center">
        <h1 className="text-4xl font-semibold"> 404 </h1>
        <h1 className="special mt-4">Page could not be found</h1>
        <p className="mt-4 max-w-sm text-center text-lg">
          Sorry, the page you are looking for does not exist.
        </p>
        <Button render={<Link href="/" />} nativeButton={false}>
          Back to Home
          <ArrowRightIcon data-icon="inline-end" />
        </Button>
      </main>
    </div>
  );
};

export default NotFoundPage;
