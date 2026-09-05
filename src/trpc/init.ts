import { initTRPC, TRPCError } from '@trpc/server';
import superjson from 'superjson';
import { ZodError } from 'zod';

import { type AuthSession, getAuthSession } from '@/server/auth';
import { db } from '@/server/db';

export type CreateTRPCContextOptions = {
  headers: Headers;
};

/**
 * Context is created once for each tRPC request. It is the shared place for
 * request-scoped values such as the current Better Auth session and database.
 */
export const createTRPCContext = async ({ headers }: CreateTRPCContextOptions) => {
  const session = await getAuthSession(headers);

  return {
    db,
    headers,
    session,
  };
};

export type Context = Awaited<ReturnType<typeof createTRPCContext>>;
export type TRPCContext = Context;

const t = initTRPC.context<Context>().create({
  transformer: superjson,
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError: error.cause instanceof ZodError ? error.cause.flatten() : null,
      },
    };
  },
});

export const createTRPCRouter = t.router;
export const createCallerFactory = t.createCallerFactory;

export const baseProcedure = t.procedure;
// Kept as a descriptive compatibility name for existing public procedures.
export const publicProcedure = baseProcedure;

type ProtectedProcedureContext = Context & {
  session: AuthSession;
  user: AuthSession['user'];
};

const enforceUserIsAuthenticated = t.middleware(async opts => {
  const { session } = opts.ctx;

  if (!session) {
    throw new TRPCError({
      code: 'UNAUTHORIZED',
      message: 'You must be logged in to perform this action',
    });
  }

  return opts.next({
    ctx: {
      ...opts.ctx,
      session,
      user: session.user,
    } satisfies ProtectedProcedureContext,
  });
});

export const protectedProcedure = baseProcedure.use(enforceUserIsAuthenticated);
