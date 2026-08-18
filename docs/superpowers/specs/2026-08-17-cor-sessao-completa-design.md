# Cor de fundo em sessões com todas as tasks concluídas

**Data:** 2026-08-17
**Status:** Aprovado para plano de implementação

## Contexto

Este é o primeiro subsistema de produto do repositório: até agora só existiam
a configuração de skills do Claude Code e o `CLAUDE.md`/`README.md`
descrevendo a stack pretendida (Next.js 16 App Router, React 19,
TypeScript, TailwindCSS 4, shadcn/ui). Não havia `app/`, `components/`,
`package.json` nem qualquer modelo de "sessão" ou "task" implementado.

O pedido original: quando o usuário marcar todas as tasks de uma sessão de
estudo, o fundo do card daquela sessão deve mudar de cor para indicar
conclusão.

Como a feature depende de sessões e tasks existirem, este spec cobre o MVP
mínimo necessário para sustentá-la — não o produto completo (sem
autenticação, sem Supabase, sem múltiplas páginas).

## Objetivo

- Modelar Sessão (de estudo) e Task no domínio do app.
- Exibir uma lista de sessões, cada uma com suas tasks marcáveis via
  checkbox.
- Quando todas as tasks de uma sessão estão marcadas, o card daquela sessão
  muda o fundo para uma cor de "completo" (verde suave), com transição
  suave. Se qualquer task for desmarcada depois, o card volta ao normal
  automaticamente.

## Fora de escopo

- Autenticação e Supabase (fica para uma iteração futura).
- Criar/editar/excluir sessões ou tasks (CRUD completo) — este MVP parte de
  dados mockados fixos.
- Persistência entre reinícios do servidor (dado vive em memória do
  processo Node).
- Testes end-to-end.

## Decisões de domínio

| Decisão | Escolha |
|---|---|
| O que é uma "sessão" | Sessão de estudo/curso (ex.: um módulo/aula), com uma lista de tasks (passos/exercícios) |
| Persistência | Mock em memória, sem banco — array em módulo dentro do `_data-access` |
| Layout | Lista vertical de cards, um por sessão |
| Reversibilidade da cor | Automática: a cor é sempre derivada do estado atual das tasks, sem flag salva |
| Cor de "completo" | Verde suave (`bg-green-50` / `dark:bg-green-950/40`, borda verde) |
| Transição | Suave (`transition-colors duration-300`), não instantânea |
| Sessão sem tasks | Não conta como completa (não fica verde) |
| Indicador extra | Badge/ícone de "Completo" ao lado do título, além da cor (acessibilidade — WCAG recomenda não depender só de cor para indicar estado) |

## Arquitetura

Segue o padrão de página do projeto (`page.tsx` + `_components/` +
`_actions/` + `_data-access/`, documentado em
`.claude/rules/rules-global.md`), na rota `app/sessoes/`:

```
app/sessoes/
├── page.tsx                          # Server Component — busca sessões, renderiza a lista
├── _components/
│   ├── session-card.tsx              # Server Component — card de uma sessão; calcula isComplete e aplica estilo
│   └── task-checkbox.tsx             # Client Component — só o checkbox; dispara a Server Action
├── _actions/
│   └── toggle-task.ts                # Server Action — valida input (Zod), marca/desmarca task, revalidatePath
└── _data-access/
    └── get-sessions.ts               # Store mockado em módulo + getSessions() + toggleTaskCompletion()

types/
└── session.ts                        # Schemas Zod + tipos Session/Task compartilhados

lib/
└── session-status.ts                 # isSessionComplete(tasks) — função pura, testável isoladamente
```

### Modelo de dados (`types/session.ts`)

```typescript
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
```

### Componentes

- **`page.tsx`** (Server): chama `getSessions()`, renderiza `<SessionCard>`
  para cada sessão.
- **`SessionCard`** (Server): recebe uma `Session`, calcula
  `isSessionComplete(session.tasks)`, aplica a classe condicional e
  renderiza o título + badge (se completo) + lista de `<TaskCheckbox>`.
- **`TaskCheckbox`** (Client, `'use client'`): componente mínimo, sem
  estado próprio — recebe `sessionId`, `task` e dispara
  `toggleTaskAction` via `useTransition` ao clicar; desabilita o checkbox
  enquanto a action está pendente.

### Função pura de derivação de estado

Extraída para `lib/session-status.ts`, separada do componente para ser
testável isoladamente sem precisar renderizar React:

```typescript
export function isSessionComplete(tasks: Task[]): boolean {
  return tasks.length > 0 && tasks.every((task) => task.completed);
}
```

## Fluxo de dados

1. Usuário acessa `/sessoes`.
2. `page.tsx` (Server Component) chama `getSessions()` do `_data-access`.
3. Renderiza um `<SessionCard>` por sessão.
4. Dentro do card, cada task vira um `<TaskCheckbox>`.
5. Usuário clica no checkbox → `TaskCheckbox` chama
   `toggleTaskAction(sessionId, taskId)`.
6. A Server Action valida os IDs com Zod, atualiza o array mockado em
   módulo, chama `revalidatePath('/sessoes')`.
7. Next.js re-renderiza a árvore a partir de `page.tsx` com os dados
   atualizados.
8. `SessionCard` recalcula `isComplete` e aplica a classe correspondente —
   o React reconcilia o mesmo elemento DOM, então `transition-colors`
   anima a troca normalmente.

## Estilo da cor

- `isComplete` calculado inline no `SessionCard`, sem estado guardado em
  lugar nenhum (nem no client, nem em flag persistida).
- Classe condicional:
  - Normal: `bg-card` (token padrão do shadcn)
  - Completo: `bg-green-50 dark:bg-green-950/40 border-green-300 dark:border-green-800`
- `transition-colors duration-300` sempre aplicado ao card, para o fade
  suave.
- Badge/ícone de "Completo" (ex.: ícone de check + texto) renderizado ao
  lado do título quando `isComplete`, para não depender só da cor.

## Tratamento de erros

- `toggleTaskAction` retorna um tipo consistente:
  ```typescript
  export type ToggleTaskResult = {
    success: boolean;
    message?: string;
  };
  ```
- Validação Zod dos IDs recebidos antes de tentar atualizar o store.
- `sessionId`/`taskId` inexistentes retornam `success: false` sem lançar
  exceção nem quebrar a UI.
- `TaskCheckbox` usa `useTransition`: desabilita o checkbox durante o
  request (evita duplo clique) e mostra um estado de erro simples inline
  se a action retornar `success: false`.

## Testes

Conforme convenção do projeto (rodar um teste por vez, não o suite
completo):

- `isSessionComplete(tasks)`: caso vazio (`[]` → `false`), parcial (uma
  task incompleta → `false`), completo (todas completas → `true`).
- `toggleTaskAction`: marca uma task, desmarca uma task, chamada com
  `sessionId`/`taskId` inválido (retorna `success: false` sem exceção).
- Sem testes end-to-end neste MVP.

## Dados mockados iniciais

`_data-access/get-sessions.ts` inicializa o store com 2-3 sessões de
exemplo, pelo menos uma já totalmente marcada (para validar visualmente o
estado "completo" assim que a página carrega) e outra parcialmente
marcada.
