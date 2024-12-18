import { z } from "zod";
import { PriorityEnum } from "./types";
export const createTaskSchema = z.object({
  title: z.string().trim().min(2, "Required"),
  description: z.optional(z.string().trim().min(1)),
  image: z.string().optional(),
  status: z.nativeEnum(PriorityEnum , {required_error:"Please select a status"}),
  tags: z.string().array().min(0),
  dueDate: z.coerce.date(),
  assignee: z.string(),
});

export type createTaskSchemaType = z.infer<typeof createTaskSchema>;

export const updateTaskSchema = z.object({
  title: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }).optional(),
  description: z.optional(z.string().min(1)),
  image: z.string().optional(),
  status: z.nativeEnum(PriorityEnum , {required_error:"Please select a status"}),
  tags: z.string().array().min(0),
  dueDate: z.coerce.date(),
  assignee: z.optional(z.string()),
});

export const createProjectSchema = z.object({
  name: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  description: z.optional(z.string().min(0)),
  priority: z.enum(["low", "medium", "high"]),
  tags: z.string().array().min(0),
  targetDate: z.date(),
  status: z.string(),
});