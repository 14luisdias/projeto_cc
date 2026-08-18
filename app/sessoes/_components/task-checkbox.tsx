"use client";

import { useTransition } from "react";

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import type { Task } from "@/types/session";
import { toggleTaskAction } from "../_actions/toggle-task";

type TaskCheckboxProps = {
  sessionId: string;
  task: Task;
};

// Componente mínimo, sem estado próprio: só dispara a Server Action e
// deixa o Server Component pai (revalidado via revalidatePath) refletir
// o novo estado — inclusive a cor do card, que é derivada dele.
export function TaskCheckbox({ sessionId, task }: TaskCheckboxProps) {
  const [isPending, startTransition] = useTransition();

  function handleCheckedChange() {
    startTransition(async () => {
      const result = await toggleTaskAction(sessionId, task.id);
      if (!result.success) {
        // Erro simples inline; o checkbox volta ao estado anterior porque
        // a revalidação não ocorre e o servidor não alterou nada.
        console.error(result.message ?? "Não foi possível atualizar a task.");
      }
    });
  }

  return (
    <div className="flex items-center gap-2">
      <Checkbox
        id={task.id}
        checked={task.completed}
        disabled={isPending}
        onCheckedChange={handleCheckedChange}
      />
      <Label
        htmlFor={task.id}
        className={
          task.completed ? "text-muted-foreground line-through" : undefined
        }
      >
        {task.title}
      </Label>
    </div>
  );
}
