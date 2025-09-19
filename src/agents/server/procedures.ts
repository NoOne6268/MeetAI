import { db } from "@/db";
import { agents } from "@/db/schema";
import { eq } from "drizzle-orm";
import { createTRPCRouter, protectedProcedure } from "@/trpc/init";
import { agentsInsertSchema } from "../schemas";
import { z } from "zod";

export const agentsRouter = createTRPCRouter({
    getOne: protectedProcedure.input(z.object({ id: z.string() })).query(async ({ input }) => {
        const [existingAgent] = await db
            .select()
            .from(agents)
            .where(eq(agents.id, input.id));

        return existingAgent;
    }),

    // TODO: getMany to protectedProcedure
    getMany: protectedProcedure.query(async (opts) => {
        const data = await db.select().from(agents);

        return data;
    }),

    create: protectedProcedure.input(agentsInsertSchema)
        .mutation(async ({ input, ctx }) => {
            const [createAgent] = await db.insert(agents).values({
                name: input.name,
                instructions: input.instructions,
                user_id: ctx.auth.user.id
            }).returning();

            return createAgent;
        }
        ),

});