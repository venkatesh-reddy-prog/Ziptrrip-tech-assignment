import { z } from "zod";

const priority = z.enum(["low", "medium", "high"]);

export const createTodoSchema = z.object({
  title: z.string().trim().min(1).max(200),
  description: z.string().max(2000).optional().default(""),
  priority: priority.optional().default("medium"),
  dueDate: z.string().date().nullable().optional().default(null)
});

export const updateTodoSchema = z.object({
  title: z.string().trim().min(1).max(200).optional(),
  description: z.string().max(2000).optional(),
  completed: z.boolean().optional(),
  priority: priority.optional(),
  dueDate: z.string().date().nullable().optional()
}).refine((data) => Object.keys(data).length > 0, {
  message: "At least one field is required"
});
