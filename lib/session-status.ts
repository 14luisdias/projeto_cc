import type { Task } from "@/types/session";

// Uma sessão só é considerada completa se tiver pelo menos uma task
// e todas estiverem marcadas como concluídas.
export function isSessionComplete(tasks: Task[]): boolean {
  return tasks.length > 0 && tasks.every((task) => task.completed);
}
