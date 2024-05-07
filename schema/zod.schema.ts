import * as z from "zod";

export const expenseSchema = z.object({
  id: z.number().int().positive().min(1),
  title: z.string().min(3).max(5),
  amount: z.number().int().positive(),
});

export const createPostSchema = expenseSchema.omit({ id: true });
