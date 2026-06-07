Markdown
# PERUN CORE - AI AGENT MASTER CONTEXT & ARCHITECTURE

## 🤖 SYSTEM INSTRUCTIONS FOR AI CODING AGENTS
**ROLE:** You are an expert Full-Stack TypeScript Developer, Next.js Architect, and Supabase Database Administrator. 
**OBJECTIVE:** Your goal is to build "Perun Core", a Project-First CRM SaaS.
**STRICT RULES:**
1. **Tech Stack:** Next.js 16 (App Router), React Server Components (RSC) by default, Server Actions for mutations, Tailwind CSS, shadcn/ui for components, Supabase (PostgreSQL + Auth), Lucide Icons.
2. **Type Safety:** Strict TypeScript. Always define interfaces/types for database rows and API responses. Use Zod for form/input validation.
3. **Data Security:** Multi-tenancy is mandatory. EVERY query must be filtered by `tenant_id`. Row Level Security (RLS) must be enabled on ALL tables.
4. **Code Reuse:** Assume authentication, basic routing, and standard UI components (buttons, inputs, modals) are ported from a previous project ("Veles Academy"). Do not reinvent the wheel.
5. **Business Logic:** The core value is tracking "Planned Budget vs Actual Cost" (Margin Protection). Do not overcomplicate features outside of this MVP scope.

---

## 🏗️ 1. PROJECT DEFINITION & BUSINESS LOGIC
**Product:** Perun Core
**Type:** B2B SaaS (Project-First CRM)
**Core Flow:** 1. User creates a `Deal` in the CRM pipeline.
2. When `Deal` is won, user clicks "Convert to Project".
3. System automatically creates a `Project` linked to that Deal, carrying over the `Planned Budget`.
4. User tracks `Actual Cost` across `Project Stages` to monitor Margin in real-time.

---

## 📂 2. DIRECTORY STRUCTURE
Maintain this strict Next.js App Router structure:

```text
perun-core/
├── app/
│   ├── (auth)/               # Login, Register, Callback
│   ├── (dashboard)/
│   │   ├── layout.tsx        # Dashboard shell (Sidebar, Header)
│   │   ├── pipeline/         # Deal Kanban Board
│   │   ├── projects/         # Project list and active projects
│   │   │   └── [id]/         # Project Detail View (Board + Margin)
│   │   └── settings/         # Tenant & User settings
│   ├── api/                  # Webhooks (Stripe) and external integrations
│   ├── globals.css
│   └── layout.tsx            # Root layout (Providers, Fonts)
├── components/
│   ├── core/                 # Business logic components (Kanban, MarginBar)
│   ├── ui/                   # shadcn/ui generic components (Button, Input, Dialog)
│   └── layout/               # Sidebar, Topbar
├── lib/
│   ├── supabase/             # Supabase clients (server, client, admin)
│   ├── actions/              # Next.js Server Actions (deal.actions.ts, project.actions.ts)
│   ├── utils.ts              # Tailwind merge (cn), formatting utils
│   └── validations.ts        # Zod schemas
├── types/
│   ├── database.types.ts     # Supabase generated types
│   └── index.ts              # Custom mapped interfaces
└── supabase/
    ├── migrations/           # SQL migration files
    └── seed.sql              # Initial dummy data
🗄️ 3. DATABASE SCHEMA (SUPABASE POSTGRESQL)
The MVP is the "Naked Core" for Margin Tracking. All tables must include tenant_id.

3.1 Core Multi-Tenancy
SQL
-- TENANTS (Workspaces)
CREATE TABLE tenants (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  stripe_customer_id TEXT,
  subscription_status TEXT DEFAULT 'trialing',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- PROFILES (Users mapped to Tenants)
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE,
  full_name TEXT,
  role TEXT DEFAULT 'member', -- 'owner', 'admin', 'member'
  created_at TIMESTAMPTZ DEFAULT NOW()
);
3.2 CRM (Pipeline)
SQL
-- DEALS (Sales Pipeline)
CREATE TABLE deals (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  client_name TEXT,
  value_planned_pln NUMERIC(10, 2) DEFAULT 0.00,
  stage TEXT DEFAULT 'lead', -- 'lead', 'negotiation', 'won', 'lost'
  expected_close_date DATE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
3.3 Project Execution (The Core)
SQL
-- PROJECTS (Created from Won Deals)
CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE NOT NULL,
  deal_id UUID REFERENCES deals(id) ON DELETE SET NULL, -- Link to origin
  name TEXT NOT NULL,
  status TEXT DEFAULT 'active', -- 'active', 'on_hold', 'completed'
  budget_planned_pln NUMERIC(10, 2) NOT NULL,
  cost_actual_pln NUMERIC(10, 2) DEFAULT 0.00,
  start_date DATE,
  end_date DATE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- PROJECT STAGES (Board Columns / Milestones)
CREATE TABLE project_stages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  order_index INTEGER NOT NULL,
  budget_allocated_pln NUMERIC(10, 2) DEFAULT 0.00,
  cost_actual_pln NUMERIC(10, 2) DEFAULT 0.00,
  status TEXT DEFAULT 'pending', -- 'pending', 'in_progress', 'done'
  created_at TIMESTAMPTZ DEFAULT NOW()
);
3.4 Row Level Security (RLS) Policy Example (Mandatory)
SQL
-- Example for DEALS table
ALTER TABLE deals ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view deals in their tenant" 
ON deals FOR SELECT 
USING (tenant_id = (SELECT tenant_id FROM profiles WHERE id = auth.uid()));

CREATE POLICY "Users can insert deals in their tenant" 
ON deals FOR INSERT 
WITH CHECK (tenant_id = (SELECT tenant_id FROM profiles WHERE id = auth.uid()));
🗺️ 4. EXECUTION ROADMAP (MVP ONLY)
Agents must follow this sequential order for development.

Phase 0: Foundation & Auth
[ ] Initialize Next.js project with Tailwind and shadcn/ui.

[ ] Setup Supabase client configurations (lib/supabase/server.ts, client.ts).

[ ] Execute SQL migrations for tenants and profiles with RLS.

[ ] Implement Authentication flow (Login/Register) utilizing Supabase Auth.

[ ] Create basic Dashboard Layout with Sidebar navigation.

Phase 1: The Pipeline (CRM)
[ ] Execute SQL migrations for deals table + RLS.

[ ] Create Server Actions for Deals (createDeal, updateDealStage).

[ ] Build /pipeline page: Implement a Kanban board UI for Deal stages.

[ ] Implement "Won" action: Create a modal to finalize value_planned_pln before converting.

Phase 2: Convert Deal to Project (The Magic Moment)
[ ] Execute SQL migrations for projects and project_stages + RLS.

[ ] Create Server Action convertDealToProject:

Takes deal_id.

Creates a project row copying the value_planned_pln to budget_planned_pln.

Generates default project_stages (e.g., "Preparation", "Execution", "Closing").

[ ] Wire this action to the Kanban board "Convert" button.

Phase 3: Project Board & Margin Dashboard
[ ] Build /projects page: Data table listing all projects with their overall health (Budget vs Cost).

[ ] Build /projects/[id] page:

Header: Dynamic Margin Bar (Visualizing budget_planned_pln minus cost_actual_pln).

Body: Stage Kanban/List. Allow users to update cost_actual_pln per stage.

[ ] Create Server Action to update stage costs, which uses a database trigger or recalculates the total cost_actual_pln on the parent Project.

Phase 4: Alerty (UI Only MVP)
[ ] Implement UI logic in /projects/[id]: If cost_actual_pln > budget_planned_pln * 0.9, render a warning Banner component ("Warning: Approaching Budget Limit").

🛠️ 5. CODING CONVENTIONS FOR AI
Server Actions First: All database mutations must happen via Server Actions in lib/actions/. Do not write API routes for database CRUD.

Error Handling: Server Actions must return objects in the format: { success: boolean, data?: any, error?: string }.

Fetching Data: Use React Server Components (RSC) to fetch data directly from Supabase server client. Pass data down to Client Components as props.

Styling: Use standard Tailwind utility classes. For complex conditional classes, use the provided cn() utility (clsx + tailwind-merge).

No Placeholders: Do not write // TODO: implement logic. Write the actual logic. If you lack context, ask the human user.


### STRATEGIA UŻYCIA (Jak pracować z tym plikiem)

Kiedy otwierasz narzędzie typu Cursor, v0.dev lub GitHub Copilot Workspace, wgrywasz ten plik i piszesz prompt startowy:
> *"Zbuduj architekturę aplikacji zgodnie z załączonym plikiem README.md. Jesteśmy w Fazie 0 i Fazie 1. Przeczytaj sekcję DATABASE SCHEMA i wygeneruj dla mnie pliki SQL z pełnym RLS, a następnie stwórz Server Actions do obsługi Deals."*

Dzięki temu, że agent AI czyta ten plik:
1. Nie wymyśli własnej struktury bazy (wie o `tenants` i `tenant_id`).
2. Zrozumie, że to Server Actions, a nie stare API routes.
3. Skupi się na przepływie pieniędzy (Budget vs Cost), ignorując pisanie kodu do wysyłania emaili marketingowych czy innych śmieci.

To jest Twój kod genetyczny dla MVP Perun Core. Zaczynamy kodować?