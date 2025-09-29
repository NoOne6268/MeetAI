import { db } from '@/db';
import { agents, meetings } from '@/db/schema';
import { auth } from '@/lib/auth';
import { polarClient } from '@/lib/polar';
import { MAX_FREE_AGENTS, MAX_FREE_MEETINGS } from '@/premium/constants';
import { initTRPC, TRPCError } from '@trpc/server';
import { count, eq } from 'drizzle-orm';
import { headers } from 'next/headers';
import { cache } from 'react';
import { en } from 'zod/v4/locales';
export const createTRPCContext = cache(async () => {
  /**
   * @see: https://trpc.io/docs/server/context
   */
  return { userId: 'user_123' };
});
// Avoid exporting the entire t-object
// since it's not very descriptive.
// For instance, the use of a t variable
// is common in i18n libraries.
const t = initTRPC.create({
  /**
   * @see https://trpc.io/docs/server/data-transformers
   */
  // transformer: superjson,
});
// Base router and procedure helpers
export const createTRPCRouter = t.router;

export const createCallerFactory = t.createCallerFactory;

export const baseProcedure = t.procedure;

export const protectedProcedure = t.procedure.use(async ({ ctx, next }) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    throw new TRPCError({ code: 'UNAUTHORIZED', message: 'You must be logged in to access this resource.' });
  }

  return next({ ctx: { ...ctx, auth: session } });
});

export const premiumProcedure = (entity: 'agent' | 'meeting') => protectedProcedure.use(async ({ ctx, next }) => {
  const customer = await polarClient.customers.getStateExternal({
    externalId: ctx.auth.user.id,
  });

  const [userMeetings] = await db
    .select({
      count: count(meetings.id),
    })
    .from(meetings)
    .where(eq(meetings.userId, ctx.auth.user.id));

  const [userAgents] = await db
    .select({
      count: count(agents.id),
    })
    .from(agents)
    .where(eq(agents.userId, ctx.auth.user.id));

  const isPremium = customer.activeSubscriptions.length > 0;
  const isFreeAgentLimitReached = userAgents.count >= MAX_FREE_AGENTS;
  const isFreeMeetingLimitReached = userMeetings.count >= MAX_FREE_MEETINGS;

  const shouldThrowMeetingError = entity === 'meeting' && !isPremium && isFreeMeetingLimitReached;

  const shouldThrowAgentError = entity === 'agent' && !isPremium && isFreeAgentLimitReached;

  if (shouldThrowMeetingError) {
    throw new TRPCError({ code: 'FORBIDDEN', message: `You have reached the free meeting limit of ${MAX_FREE_MEETINGS}. Please upgrade to a premium plan to create more meetings.` });
  }

  if (shouldThrowAgentError) {
    throw new TRPCError({ code: 'FORBIDDEN', message: `You have reached the free agent limit of ${MAX_FREE_AGENTS}. Please upgrade to a premium plan to create more agents.` });
  }

  return next({ ctx: { ...ctx, customer } });
});