import { getAuthSession } from '@/server/auth';

import { HelloClient } from './HelloClient';

const Hello = async () => {
  const session = await getAuthSession();

  return (
    <>
      <p>👋 Hello {session?.user.name || session?.user.email || ''}</p>
      <pre>
        <HelloClient />
      </pre>
    </>
  );
};

export { Hello };
