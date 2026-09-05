import { fetchRequestHandler } from '@trpc/server/adapters/fetch';

import { appRouter } from '@/server/api/root';
import { createTRPCContext } from '@/trpc/init';

/**
 * This wraps the `createTRPCContext` helper and provides the required context for the tRPC API when
 * handling a HTTP request (e.g. when you make requests from Client Components).
 */
const createContext = async (headers: Headers) => {
  return createTRPCContext({ headers });
};

const handler = (req: Request) =>
  fetchRequestHandler({
    endpoint: '/api/trpc',
    req,
    router: appRouter,
    createContext: ({ req }) => createContext(new Headers(req.headers)),
    onError:
      process.env.NODE_ENV === 'development'
        ? ({ path, error }) => {
            console.error(`❌ tRPC failed on ${path ?? '<no-path>'}: ${error.message}`);
          }
        : undefined,
  });

export { handler as GET, handler as POST };
