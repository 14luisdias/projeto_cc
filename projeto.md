# Projeto: Sessões de Estudo

> Registro do estado atual do projeto, construído ao longo das últimas sessões de trabalho com o Claude Code.

## Visão geral

MVP de um app de acompanhamento de sessões de estudo. O usuário vê uma lista
de sessões (ex.: módulos de um curso), cada uma com uma lista de tasks
marcáveis via checkbox. Quando todas as tasks de uma sessão são concluídas,
o card daquela sessão muda de cor (fundo verde suave) para indicar
conclusão, com transição animada e reversão automática caso alguma task
seja desmarcada depois.

Este é o **primeiro subsistema de produto** do repositório — antes só
existiam a configuração de skills do Claude Code e os arquivos
`CLAUDE.md`/`README.md` descrevendo a stack pretendida. Não havia `app/`,
`components/`, `package.json` nem nenhum modelo de domínio implementado.

## Stack

- **Next.js 16** (App Router) + **React 19** + **TypeScript**
- **TailwindCSS 4** + **shadcn/ui** (estilo `new-york`, ícones `lucide`)
- **Zod** para validação de schemas/inputs
- **Jest** para testes unitários
- Persistência: **mock em memória** (sem banco de dados nesta fase)

## Como rodar

```bash
npm install
npm run dev          # http://localhost:3000 (redireciona para /sessoes)
npm run type-check
npm run lint
npm run test -- <NomeDoArquivo>   # um teste por vez, não o suite completo
```

## Estrutura implementada

```
app/
├── page.tsx                              # redireciona para /sessoes (única feature do MVP)
└── sessoes/
    ├── page.tsx                          # Server Component — busca sessões, renderiza a lista
    ├── _components/
    │   ├── session-card.tsx              # Server Component — calcula isComplete, aplica cor/badge
    │   └── task-checkbox.tsx             # Client Component — dispara a Server Action via useTransition
    ├── _actions/
    │   ├── toggle-task.ts                # Server Action — valida com Zod, alterna task, revalidatePath
    │   └── toggle-task.test.ts
    └── _data-access/
        └── get-sessions.ts               # store mockado em módulo + getSessions() + toggleTaskCompletion()

components/ui/          # primitivos shadcn: badge, checkbox, label
types/session.ts         # schemas Zod + tipos Session/Task compartilhados
lib/
├── session-status.ts         # isSessionComplete(tasks) — função pura testável
└── session-status.test.ts
```

Segue à risca o padrão de página definido em `.claude/rules/rules-global.md`:
`page.tsx` (Server) + `_components/` + `_actions/` + `_data-access/`.

## Modelo de domínio

```typescript
// types/session.ts
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
```

Regra de "sessão completa" (`lib/session-status.ts`):

```typescript
export function isSessionComplete(tasks: Task[]): boolean {
  return tasks.length > 0 && tasks.every((task) => task.completed);
}
```

- Sessão sem tasks **não** conta como completa.
- Estado `isComplete` é sempre derivado on-the-fly, nunca salvo como flag.

## Fluxo de dados

1. `GET /sessoes` → `page.tsx` (Server) chama `getSessions()`.
2. Renderiza um `<SessionCard>` por sessão, cada task vira um `<TaskCheckbox>`.
3. Clique no checkbox → `TaskCheckbox` (Client) chama `toggleTaskAction(sessionId, taskId)`.
4. A Server Action valida os IDs com Zod, atualiza o array mockado em módulo
   e chama `revalidatePath("/sessoes")`.
5. Next.js re-renderiza a árvore a partir de `page.tsx`; `SessionCard`
   recalcula `isComplete` e o React reconcilia o mesmo elemento DOM, então
   `transition-colors duration-300` anima a troca de cor normalmente.

## Estilo da cor de "completo"

- Normal: `bg-card` / `border-border` (tokens padrão do shadcn).
- Completo: `bg-green-50 dark:bg-green-950/40` + `border-green-300 dark:border-green-800`.
- `transition-colors duration-300` sempre aplicado, para o fade suave.
- Badge "Completo" (ícone `CheckCircle2` + texto) ao lado do título quando
  completo — indicador extra para não depender só da cor (acessibilidade,
  WCAG).

## Tratamento de erros

- `toggleTaskAction` retorna sempre `{ success: boolean; message?: string }`.
- IDs inválidos são barrados por validação Zod antes de tocar o data-access.
- `sessionId`/`taskId` inexistentes retornam `success: false` sem lançar
  exceção.
- `TaskCheckbox` desabilita o checkbox durante o `useTransition` (evita
  duplo clique) e loga erro simples se a action falhar.

## Testes

Cobertura atual (rodados um arquivo por vez, conforme convenção do projeto):

- `lib/session-status.test.ts` — `isSessionComplete`: lista vazia, parcial e
  completa.
- `app/sessoes/_actions/toggle-task.test.ts` — `toggleTaskAction`: alterna
  com sucesso e revalida, retorna erro sem revalidar quando não encontrado,
  retorna erro de validação para IDs vazios sem tocar o data-access.
- Sem testes end-to-end neste MVP.

## Fora de escopo (por enquanto)

- Autenticação e Supabase (README já cita Supabase como stack alvo, mas
  ainda não está implementado).
- CRUD completo de sessões/tasks — dados partem de um mock fixo em
  `_data-access/get-sessions.ts`.
- Persistência entre reinícios do servidor (dado vive em memória do
  processo Node).

## Decisões registradas

Spec completo da feature de cor de sessão completa:
`docs/superpowers/specs/2026-08-17-cor-sessao-completa-design.md`.

## Próximos passos sugeridos

- Persistência real (Supabase/Drizzle) substituindo o mock em memória.
- CRUD de sessões e tasks (criar/editar/excluir).
- Autenticação de usuário (sessões por usuário).
- Testes end-to-end do fluxo de marcar/desmarcar task.
