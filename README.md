# Projeto 1 — Curso Udemy Claude Code

Projeto de estudos do curso de Claude Code, construído com Next.js 16 (App Router).

## 🚀 Tech Stack

- **Next.js 16** (App Router) + **React 19** + **TypeScript**
- **TailwindCSS 4** + **shadcn/ui**
- **React Hook Form** + **Zod** para validação de formulários
- **Supabase** para autenticação e banco de dados

## 📦 Como rodar

```bash
# instalar dependências
npm install

# copiar variáveis de ambiente
cp .env.example .env.local

# rodar o servidor local
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000).

## 🛠️ Scripts

| Comando | Descrição |
| --- | --- |
| `npm run dev` | Sobe o servidor de desenvolvimento (porta 3000) |
| `npm run build` | Gera o build de produção |
| `npm run type-check` | Verifica os tipos TypeScript |
| `npm run lint` | Executa o linter |

## 📁 Estrutura do Projeto

```
app/              # Rotas (App Router), agrupadas por (grupo)/
components/ui/    # Primitivos reutilizáveis (shadcn)
components/       # Componentes de feature
lib/              # Helpers e clients (supabase, stripe, etc.)
types/            # Tipos globais e schemas Zod compartilhados
```

Cada página segue o padrão `_components/`, `_actions/` e `_data-access/` para separar UI, Server Actions e acesso a dados.

## ✅ Convenções

- Server Components por padrão — `'use client'` apenas quando necessário
- Mutações via Server Actions em `_actions/`, nunca chamando o banco direto em Client Components
- Validação de dados sempre com Zod
- Nomes de arquivo em kebab-case, componentes em PascalCase

## 🌱 Variáveis de Ambiente

- `NEXT_PUBLIC_*` apenas para valores seguros no client
- Segredos (DB, API keys) apenas em Server Actions ou Route Handlers
- Copiar `.env.example` para `.env.local` ao clonar o projeto
