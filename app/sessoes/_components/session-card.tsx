import { CheckCircle2 } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { isSessionComplete } from "@/lib/session-status";
import { cn } from "@/lib/utils";
import type { Session } from "@/types/session";
import { TaskCheckbox } from "./task-checkbox";

type SessionCardProps = {
  session: Session;
};

export function SessionCard({ session }: SessionCardProps) {
  const isComplete = isSessionComplete(session.tasks);

  return (
    <div
      className={cn(
        "rounded-lg border p-4 transition-colors duration-300",
        isComplete
          ? "bg-green-50 border-green-300 dark:bg-green-950/40 dark:border-green-800"
          : "bg-card border-border"
      )}
    >
      <div className="mb-3 flex items-center justify-between gap-2">
        <h2 className="font-semibold">{session.title}</h2>
        {isComplete && (
          <Badge variant="success">
            <CheckCircle2 />
            Completo
          </Badge>
        )}
      </div>

      <div className="flex flex-col gap-2">
        {session.tasks.map((task) => (
          <TaskCheckbox key={task.id} sessionId={session.id} task={task} />
        ))}
      </div>
    </div>
  );
}
