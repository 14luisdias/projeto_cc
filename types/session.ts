import { z } from "zod";

export const taskSchema = z.object({
  id: z.string(),
  title: z.string().min(1),
  completed: z.boolean(),
});

export const sessionSchema = z.object({
  id: z.string(),
  title: z.string().min(1),
  tasks: z.array(taskSchema),
});

export type Task = z.infer<typeof taskSchema>;
export type Session = z.infer<typeof sessionSchema>;
