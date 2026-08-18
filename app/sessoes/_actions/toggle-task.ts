"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";

import { toggleTaskCompletion } from "../_data-access/get-sessions";

const toggleTaskInputSchema = z.object({
  sessionId: z.string().min(1),
  taskId: z.string().min(1),
});

export type ToggleTaskResult = {
  success: boolean;
  message?: string;
};

export async function toggleTaskAction(
  sessionId: string,
  taskId: string
): Promise<ToggleTaskResult> {
  const validation = toggleTaskInputSchema.safeParse({ sessionId, taskId });

  if (!validation.success) {
    return { success: false, message: "Dados inválidos para atualizar a task." };
  }

  const { found } = await toggleTaskCompletion(
    validation.data.sessionId,
    validation.data.taskId
  );

  if (!found) {
    return { success: false, message: "Sessão ou task não encontrada." };
  }

  revalidatePath("/sessoes");
  return { success: true };
}
