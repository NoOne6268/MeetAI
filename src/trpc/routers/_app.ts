import { meetingsRouter } from '@/meetings/server/procedures';
import { createTRPCRouter } from '../init';
import { agentsRouter } from '@/agents/server/procedures';
import { premiumRouter } from '@/premium/server/procedures';
export const appRouter = createTRPCRouter({
    agents: agentsRouter,
    meetings: meetingsRouter,
    premium: premiumRouter,
});
// export type definition of API
export type AppRouter = typeof appRouter;