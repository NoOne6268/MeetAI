import { z } from "zod";

export const meetingsInsertSchema = z.object({
    name: z.string().min(1, { message: "Name is required" }).max(100, { message: "Name must be less than 100 characters" }),
    agentId: z.string().min(1, { message: "Agent ID is required" })
});

export const meetingsUpdateSchema = meetingsInsertSchema.extend({
    id: z.string().min(1, { message: "ID is required" }),
});