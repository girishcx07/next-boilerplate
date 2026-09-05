import 'server-only';

import { headers } from 'next/headers';
import { cache } from 'react';

import { Logger } from '@/server/api/common/logger';
import pc from '@/server/api/common/pc';
import { appRouter } from '@/server/api/root';
import { createCallerFactory, createTRPCContext, type TRPCContext } from '@/trpc/init';

/**
 * This wraps the `createTRPCContext` helper and provides the required context for the tRPC API when
 * handling a tRPC call from a React Server Component.
 */
const createContext = cache(async (): Promise<TRPCContext> => {
  const heads = new Headers(await headers());
  heads.set('x-trpc-source', 'rsc');

  return createTRPCContext({ headers: heads });
});

const createCaller = createCallerFactory(appRouter);

export const api = createCaller(() => createContext(), {
  onError: ({ path, error, type }) => {
    Logger.error(pc.red(`❌ tRPC failed on [${type} - ${path ?? '<no-path>'}]:`), error);
  },
});
