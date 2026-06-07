STRATEGIA: Perun Core — Roadmapa do pierwszego 50k PLN MRR w 8-10 tygodni
Perun Core to Project-First CRM, który łączy sprzedaż z realizacją projektu w jeden spójny rdzeń. Nie budujemy kolejnego ClickUpa. Budujemy narzędzie, które chroni marżę i daje polskim firmom budowlanym, IT services, produkcji i facility management realną przewagę konkurencyjną.
Klucz do sukcesu:

Reuse 70% kodu z Veles Academy (auth, billing, dashboard, Supabase, i18n).
Skupienie na core value: Deal → Auto Project Board + AI do ryzyk i marży.
Szybka walidacja + Early Bird, żeby mieć pierwsze pieniądze zanim skończymy MVP.


ROADMAPA — 4 FAZY (realistyczna dla Twojego czasu)
Faza 0: Init & Fundament (Tydzień 1)

Utworzenie repo, setup Next.js + Supabase
Rebranding + podstawowy landing page
Schemat bazy + RLS
Stripe + auth (reuse z Academy)

Faza 1: MVP — Core Product (Tygodnie 2-5)

Kontakty + Firmy + Deale Pipeline (kanban)
„Convert Deal to Project” → automatyczny Project Board
Etapy, tolerancje (czas/koszt/zakres), rejestr ryzyk
Real-time dashboard marży (planned vs actual)
Podstawowy AI Co-Pilot (Claude)
Import z Excela + prosty onboarding
Polish + Early Bird landing + Stripe

Faza 2: Product-Market Fit (Tygodnie 6-8)

Zaawansowany AI (sugestie Exception Report, aktualizacja Business Case)
Szablony branżowe (budownictwo, IT, produkcja, FM)
Time tracking + billing
Raporty Project Board
Mobile PWA
Pierwsze 20-30 płatnych klientów

Faza 3: Skalowanie (miesiąc 3-6)

White-label + Enterprise features (SSO, audit log)
Marketplace szablonów
Zaawansowane integracje (InFakt, Comarch, banki)
Content machine + partnerzy
Cel: 50k+ PLN MRR


STRUKTURA DANYCH (Supabase) — Kluczowe tabele
SQL-- Firmy i użytkownicy
tenants (id, name, slug, owner_id, created_at)
tenant_members (tenant_id, user_id, role)

-- Sprzedaż
deals (id, tenant_id, name, value_pln, probability, stage, close_date, project_id)

-- Projekty (serce systemu)
projects (
  id, tenant_id, name, deal_id, 
  status, start_date, end_date,
  budget_pln, actual_cost_pln, margin_pln,
  created_at
)

-- Project Board
project_stages (
  id, project_id, name, order_num,
  tolerance_time_days, tolerance_cost_pln,
  status
)

tolerances (
  id, project_id, type (time|cost|scope|quality),
  planned, current, status, last_updated
)

risks (
  id, project_id, description, probability, impact,
  owner_id, status, mitigation, created_at
)

-- Dokumenty i raporty
project_documents (
  id, project_id, type ('PID'|'ExceptionReport'|'LessonsLog'|'Contract'),
  file_path, version, created_at
)

-- Margin tracking
margin_snapshots (
  id, project_id, planned_margin, actual_margin,
  snapshot_date
)
Dodatkowo: user_progress (reuse z Academy) dla onboardingu.

ZALECANA STRUKTURA REPO
textperun-core/
├── app/
│   ├── (marketing)/          # landing page, waitlist
│   ├── dashboard/            # główny dashboard
│   ├── projects/             # Project Board
│   ├── deals/                # Pipeline
│   └── api/                  # Stripe, AI, etc.
├── components/
│   ├── core/                 # ProjectBoard, ToleranceCard, RiskRegister
│   └── ui/                   # reuse z Academy
├── lib/
│   ├── supabase/             # client + server
│   ├── actions/              # Server Actions
│   └── ai/                   # Claude prompts
├── types/                    # database.ts + Perun types
├── supabase/migrations/      # SQL schemy
└── README.md

GOTOWY README.md (skopiuj i wklej)
Markdown# Perun Core

**Project-First CRM dla firm, które zarabiają na projektach.**

Perun Core automatycznie zamienia zamknięty deal w pełny Project Board (PID, etapy, tolerancje, ryzyka) i chroni marżę w czasie rzeczywistym dzięki AI.

## Tech Stack
- Next.js 16 (App Router)
- Supabase (PostgreSQL + Auth)
- Stripe
- Anthropic Claude (AI Co-Pilot)
- Tailwind + shadcn/ui
- Vercel

## Kluczowe funkcje
- Deal → Auto Project Board
- Real-time margin tracking
- AI wykrywanie ryzyk i Exception Reports
- Tolerancje i zarządzanie zmianami
- Szablony branżowe (budownictwo, IT, produkcja)

## Szybki start

```bash
git clone https://github.com/Camilleus/perun-core.git
cd perun-core
cp .env.example .env.local
npm install
npm run dev
Roadmapa
Faza 0 (Tydzień 1) — Init + baza
Faza 1 (Tygodnie 2-5) — MVP (Pipeline + Project Board + Margin)
Faza 2 (Tygodnie 6-8) — AI + branżowe szablony
Faza 3 — Skalowanie + Enterprise

STRATEGIA BIZNESOWA
Early Bird: 19 zł/użytkownik/mies przez pierwsze 6 miesięcy dla pierwszych 10 firm.
Cel: 10 płatnych klientów do końca Fazy 2.
```