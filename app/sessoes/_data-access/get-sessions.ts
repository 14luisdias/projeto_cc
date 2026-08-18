import "server-only";

import type { Session } from "@/types/session";

// Store mockado em memória do processo — reinicia junto com o servidor.
// Substituir por uma tabela real (Supabase/Drizzle) numa iteração futura.
const sessions: Session[] = [
  {
    id: "sessao-1",
    title: "Fundamentos do Next.js App Router",
    tasks: [
      { id: "task-1-1", title: "Entender Server Components", completed: true },
      { id: "task-1-2", title: "Configurar rotas com App Router", completed: true },
      { id: "task-1-3", title: "Criar a primeira Server Action", completed: true },
    ],
  },
  {
    id: "sessao-2",
    title: "Validação de formulários com Zod",
    tasks: [
      { id: "task-2-1", title: "Definir um schema Zod", completed: true },
      { id: "task-2-2", title: "Integrar com React Hook Form", completed: false },
      { id: "task-2-3", title: "Exibir erros de validação na UI", completed: false },
    ],
  },
  {
    id: "sessao-3",
    title: "Estilização com TailwindCSS e shadcn/ui",
    tasks: [
      { id: "task-3-1", title: "Instalar e configurar o Tailwind", completed: false },
      { id: "task-3-2", title: "Adicionar componentes do shadcn/ui", completed: false },
    ],
  },
];

export async function getSessions(): Promise<Session[]> {
  return sessions;
}

export async function toggleTaskCompletion(
  sessionId: string,
  taskId: string
): Promise<{ found: boolean }> {
  const session = sessions.find((s) => s.id === sessionId);
  const task = session?.tasks.find((t) => t.id === taskId);

  if (!session || !task) {
    return { found: false };
  }

  task.completed = !task.completed;
  return { found: true };
}
