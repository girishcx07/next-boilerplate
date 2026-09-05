import { createTRPCRouter, protectedProcedure } from '../init';

export const authRouter = createTRPCRouter({
  me: protectedProcedure.query(({ ctx }) => ({
    id: ctx.user.id,
    email: ctx.user.email,
    name: ctx.user.name,
  })),
});
