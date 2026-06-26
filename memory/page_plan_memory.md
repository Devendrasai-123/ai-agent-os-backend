

# Agent Team Decision

_Updated: 2026-06-25 15:00:45_

Goal: Plan the next version of my AI Agent OS dashboard. It should be clean, not cluttered, and agents must ask before database, API, local model, or deployment decisions.

# Agent Team Decision

## Summary

We're planning **v2 of the AI Agent OS Dashboard** — a clean, uncluttered, dark premium dashboard for Devendra's Personal AI Health Tracker. The current app has: dashboard, feature registry, memory, page builder, UI references, generated pages, and GitHub backup. The next version must enforce the **"ask before acting"** rule for all database, API, local model, and deployment decisions. The design direction is pulled from the UI references: dark navy backgrounds (`#0B0F19`), purple/cyan accents, clean card layouts with 12-16px border-radius, and generous spacing. The medical dashboard reference informs the health tracker's body visualization and vitals cards. The brutalist MONORAMA reference inspires the typography scale contrast and data hierarchy (large numbers, tiny labels).

---

## Questions Before Work

> ⚠️ Per project rules, these must be answered before any agent proceeds with implementation decisions.

| # | Question | Why It Matters |
|---|----------|---------------|
| 1 | **Should we keep SQLite as the only database for v2, or do you want Supabase for any specific feature?** | Storage rule says local-first, but some features (GitHub backup sync, cross-device) may benefit from Supabase. We will NOT switch without your approval. |
| 2 | **Which paid APIs (if any) are approved for v2?** (e.g., OpenAI for AI chat, nutrition APIs, weather for sleep correlation) | No paid API will be integrated without explicit approval. |
| 3 | **Should the AI chat assistant connect to a local LLM (Ollama/LM Studio) or remain a placeholder for now?** | Connecting a local model changes architecture, memory, and resource requirements. We need your go-ahead. |
| 4 | **What is the deployment target for v2?** (local-only, Tailscale, local network, or something else?) | Deployment choice affects security, encryption, and backend decisions. |
| 5 | **Should private health data (body photos, lab reports, medical notes) use the existing local encrypted storage, or do you want a new mechanism?** | Privacy rule says no auto-cloud upload. We need to confirm the local encryption approach before building the 3D body progress and health file storage. |
| 6 | **Which features from the current app (page builder, UI references, generated pages, GitHub backup) should remain in the sidebar vs. be moved to a secondary/advanced section?** | You want clean and uncluttered — we need to know what stays visible and what gets tucked away. |

---

## Agent Assignments

### Product Manager
- **Define v2 feature priority matrix**: Must-have vs. Nice-to-have vs. Deferred
- **Map current features to new dashboard zones**: What's primary (health, gym, sleep, AI chat) vs. secondary (page builder, UI refs, generated pages, GitHub backup)
- **Write user stories** for each dashboard zone with acceptance criteria
- **Define the "ask before acting" UX flow**: How the dashboard prompts Devendra before any database/API/model/deployment action
- **Create feature registry entries** for all v2 features
- **Deliverable**: `v2_prd.md` — PRD with feature priority, user stories, and approval-gate definitions

### UI/UX Designer
- **Design the v2 dashboard layout** using the dark premium style from UI references:
  - Sidebar: Minimal, icon + label, collapsible (220px expanded → 64px collapsed)
  - Main area: KPI cards row → Primary content zone → Secondary zone
  - Color tokens: `#0B0F19` bg, `#1E293B` cards, `#8B5CF6` purple accent, `#06B6D4` cyan accent, `#10B981` success
  - Typography: Inter font, extreme scale contrast (large data numbers 28-32px bold, tiny labels 11-12px)
- **Design the health dashboard home**: Daily vitals cards, gym summary, sleep score, habit streak, finance snapshot, book progress
- **Design the "Approval Gate" modal**: Clean confirmation dialog when any agent/system wants to touch database, API, model, or deployment
- **Design the 3D body progress page** wireframe (placeholder for future 3D)
- **Deliverable**: `v2_ui_design.md` — Layout specs, component tokens, wireframes for all zones

### Frontend Developer
- **Plan the component architecture** for v2 dashboard:
  - Sidebar (collapsible, with active state highlighting)
  - KPI Card (reusable: icon circle + large number + small label + optional menu)
  - Approval Gate Modal (confirmation dialog with action details + approve/deny buttons)
  - Health Vitals Card (heart rate, BP, sleep score, etc.)
  - Feature Registry Panel (list with status badges)
  - Agent Run Dashboard (status cards for each agent)
- **Define the page routing structure** for all dashboard zones
- **Plan the state management approach** (local-first, no external state library without approval)
- **Deliverable**: `v2_frontend_plan.md` — Component tree, routing map, state architecture

### Backend Developer
- **Plan the v2 API layer** for all dashboard features (REST or tRPC — needs Devendra's approval)
- **Design the "Approval Gate" backend hook**: Before any DB write, API call, model load, or deploy action → check if approved → log the decision
- **Plan the local SQLite schema extensions** for health, gym, sleep, habits, finance, books, tasks
- **Design the local encrypted storage interface** for private health files
- **Plan the GitHub backup integration** (existing feature, needs v2 compatibility check)
- **Deliverable**: `v2_backend_plan.md` — API routes, approval gate middleware, SQLite schema, encryption interface

### QA Tester
- **Write test scenarios** for the "ask before acting" approval gate (every trigger type)
- **Write test scenarios** for dashboard load, sidebar collapse/expand, KPI card rendering
- **Write test scenarios** for health data CRUD (local SQLite only)
- **Write test scenarios** for private file storage (local encrypted only, no cloud leak)
- **Write test scenarios** for agent run dashboard (status tracking, output linking)
- **Deliverable**: `v2_qa_test_plan.md` — Test cases, edge cases, privacy leak checks

### Project Reviewer
- **Review all agent outputs** for consistency, rule compliance, and completeness
- **Verify**: No database/API/model/deployment decisions made without Devendra's approval
- **Verify**: Privacy rules enforced (no auto-cloud upload, local encrypted storage for health files)
- **Verify**: App scope is personal-only (no SaaS, no community, no public profiles)
- **Verify**: Dashboard is clean and uncluttered (max 5-7 sidebar items visible, secondary features tucked)
- **Verify**: Blueprint stays under 2500 words (per agent_8_rule)
- **Deliverable**: `v2_final_blueprint.md` — Consolidated plan with gaps, risks, and go/no-go

---

## Feature Registry Items

| ID | Feature Name | Priority | Zone | Status |
|----|-------------|----------|------|--------|
| FR-001 | Daily Health Dashboard | Must-have | Primary | Planned |
| FR-002 | Gym Workout Planner | Must-have | Primary | Planned |
| FR-003 | Sleep & Recovery Tracker | Must-have | Primary | Planned |
| FR-004 | Food & Water Tracker | Must-have | Primary | Planned |
| FR-005 | Finance Tracker | Nice-to-have | Secondary | Planned |
| FR-006 | Book Reading Tracker | Nice-to-have | Secondary | Planned |
| FR-007 | 3D Body Progress Page | Deferred | Primary | Planned (wireframe only) |
| FR-008 | AI Chat Assistant | Must-have | Primary | Placeholder (needs local LLM approval) |
| FR-009 | Feature Registry (v2) | Must-have | System | Upgrade |
| FR-010 | Agent Run Dashboard | Must-have | System | Upgrade |
| FR-011 | Approval Gate System | Must-have | System | New |
| FR-012 | Memory Browser | Must-have | System | Upgrade |
| FR-013 | Page Builder | Nice-to-have | Advanced | Existing |
| FR-014 | UI References | Nice-to-have | Advanced | Existing |
| FR-015 | Generated Pages | Nice-to-have | Advanced | Existing |
| FR-016 | GitHub Backup | Nice-to-have | Advanced | Existing |
| FR-017 | Collapsible Sidebar | Must-have | System | New |
| FR-018 | Dark Premium Theme Tokens | Must-have | System | New |

---

## Risks

| # | Risk | Impact | Mitigation |
|---|------|--------|------------|
| R1 | **Approval Gate adds friction to every action** — could slow down development and daily use | High | Design a "trust session" mode where pre-approved actions skip the gate for a set duration |
| R2 | **Local LLM connection may not work on all machines** — resource constraints, model availability | Medium | Keep AI chat as placeholder until Devendra approves a specific local model + hardware check |
| R3 | **3D body progress page is complex** — Three.js/React Three Fiber adds bundle size and dev time | Medium | Defer to wireframe only in v2; build in v3 after core health features are stable |
| R4 | **SQLite may hit performance limits** with large health datasets over years | Low | Monitor query times; ask Devendra before migrating to Supabase |
| R5 | **Sidebar clutter** — too many features (current 7 + new health features) could overwhelm | High | Strict zone separation: Primary (5 items), System (3 items), Advanced (collapsed section with 4 items) |
| R6 | **Privacy leak via GitHub backup** — private health data could accidentally sync to GitHub | High | GitHub backup must explicitly exclude local encrypted storage paths; add a pre-push check |

---

## Next 5 Actions

| Step | Action | Owner | Depends On |
|------|--------|-------|------------|
| 1 | **Answer the 6 Questions Before Work** | Devendra | Nothing — this is the blocker |
| 2 | **Write v2 PRD** with feature priority and approval gate flow | Product Manager | Step 1 answers |
| 3 | **Design v2 dashboard layout** and approval gate modal | UI/UX Designer | Step 2 PRD |
| 4 | **Plan frontend component architecture** and routing | Frontend Developer | Step 3 design |
| 5 | **Plan backend API + approval gate middleware + SQLite schema** | Backend Developer | Step 2 PRD + Step 1 answers (especially DB/API decisions) |

> **🚨 Blocker**: Steps 2-5 cannot proceed properly until Devendra answers the 6 questions. The approval gate rule applies to our own planning — we will not assume database, API, model, or deployment choices without your explicit say-so.

# Agent Team Decision

_Updated: 2026-06-25 15:25:01_

Goal: Plan this app/project: Personal AI Health Tracker

# Agent Team Decision

## Summary

We're planning the **Personal AI Health Tracker** — a private, local-first, dark premium dashboard app for Devendra to track health, gym, sleep, habits, finance, books, and tasks with AI assistance. The app is **personal-only** (no SaaS, no community, no public profiles). All data stays local on SQLite by default. Every agent must **ask before** choosing a database, using paid APIs, changing the dashboard structure, connecting a local LLM, or uploading private data. The design follows the dark navy + purple/cyan accent style from the UI references, with extreme typography scale contrast (large data numbers, tiny labels) and clean card layouts. A previous planning run exists but this is a fresh, consolidated plan that respects all privacy rules and approval gates.

---

## Questions Before Work

> ⚠️ Per project rules, these must be answered before any agent proceeds with implementation decisions.

| # | Question | Why It Matters |
|---|----------|---------------|
| 1 | **Should we keep SQLite as the only database, or do you want Supabase for any specific feature?** | Storage rule says local-first. We will NOT add Supabase without your approval. |
| 2 | **Which paid APIs (if any) are approved?** (e.g., OpenAI for AI chat, nutrition APIs, weather for sleep correlation) | No paid API will be integrated without explicit approval. |
| 3 | **Should the AI chat assistant connect to a local LLM (Ollama/LM Studio) or remain a placeholder for now?** | Connecting a local model changes architecture, memory, and resource requirements. We need your go-ahead. |
| 4 | **What is the deployment target?** (local-only, Tailscale, local network, or something else?) | Deployment choice affects security, encryption, and backend decisions. |
| 5 | **Should private health data (body photos, lab reports, medical notes) use local encrypted storage only, or do you want a different mechanism?** | Privacy rule says no auto-cloud upload. We need to confirm the local encryption approach before building the 3D body progress and health file storage. |
| 6 | **Which existing features (page builder, UI references, generated pages, GitHub backup) should stay visible in the sidebar vs. be moved to a secondary/advanced section?** | You want clean and uncluttered — we need to know what stays primary and what gets tucked away. |

---

## Agent Assignments

### Product Manager
- **Define feature priority matrix**: Must-have vs. Nice-to-have vs. Deferred for all 10 main features
- **Map features to dashboard zones**: Primary (health, gym, sleep, food, AI chat) vs. Secondary (finance, books) vs. System (feature registry, agent runs, memory) vs. Advanced (page builder, UI refs, GitHub backup)
- **Write user stories** for each dashboard zone with acceptance criteria
- **Define the "Approval Gate" UX flow**: How the app prompts Devendra before any database/API/model/deployment action
- **Create feature registry entries** for all features
- **Deliverable**: `prd.md` — PRD with feature priority, user stories, and approval-gate definitions

### UI/UX Designer
- **Design the dashboard layout** using dark premium style:
  - Sidebar: Minimal, icon + label, collapsible (220px → 64px), max 5-7 visible items
  - Main area: KPI cards row → Primary content zone → Secondary zone
  - Color tokens: `#0B0F19` bg, `#1E293B` cards, `#8B5CF6` purple accent, `#06B6D4` cyan accent, `#10B981` success
  - Typography: Inter font, extreme scale contrast (data numbers 28-32px bold, labels 11-12px)
- **Design the health dashboard home**: Daily vitals cards, gym summary, sleep score, habit streak, finance snapshot, book progress
- **Design the "Approval Gate" modal**: Clean confirmation dialog when any system wants to touch database, API, model, or deployment
- **Design the 3D body progress page** wireframe (placeholder for future Three.js implementation)
- **Deliverable**: `ui_design.md` — Layout specs, component tokens, wireframes for all zones

### Frontend Developer
- **Plan the component architecture**:
  - Sidebar (collapsible, active state highlighting, zone grouping)
  - KPI Card (reusable: icon circle + large number + small label + optional menu)
  - Approval Gate Modal (action details + approve/deny buttons)
  - Health Vitals Card (heart rate, BP, sleep score, water intake)
  - Feature Registry Panel (list with status badges)
  - Agent Run Dashboard (status cards for each agent)
- **Define the page routing structure** for all dashboard zones
- **Plan state management** (local-first, no external state library without approval)
- **Deliverable**: `frontend_plan.md` — Component tree, routing map, state architecture

### Backend Developer
- **Plan the API layer** for all dashboard features (REST or tRPC — needs Devendra's approval)
- **Design the "Approval Gate" backend hook**: Before any DB write, API call, model load, or deploy action → check if approved → log the decision
- **Plan the local SQLite schema extensions** for health, gym, sleep, habits, finance, books, tasks
- **Design the local encrypted storage interface** for private health files (body photos, lab reports, medical notes)
- **Deliverable**: `backend_plan.md` — API routes, approval gate middleware, SQLite schema, encryption interface

### QA Tester
- **Write test scenarios** for the "ask before acting" approval gate (every trigger type: DB, API, model, deploy, private data)
- **Write test scenarios** for dashboard load, sidebar collapse/expand, KPI card rendering
- **Write test scenarios** for health data CRUD (local SQLite only)
- **Write test scenarios** for private file storage (local encrypted only, verify no cloud leak)
- **Write test scenarios** for agent run dashboard (status tracking, output linking)
- **Write privacy leak checks**: verify no auto-upload, no public endpoints, no unencrypted private data
- **Deliverable**: `qa_test_plan.md` — Test cases, edge cases, privacy leak checks

### Project Reviewer
- **Review all agent outputs** for consistency, rule compliance, and completeness
- **Verify**: No database/API/model/deployment decisions made without Devendra's approval
- **Verify**: Privacy rules enforced (no auto-cloud upload, local encrypted storage for health files)
- **Verify**: App scope is personal-only (no SaaS, no community, no public profiles)
- **Verify**: Dashboard is clean and uncluttered (max 5-7 sidebar items visible, secondary features tucked)
- **Verify**: Blueprint stays under 2500 words (per long-term memory rule)
- **Deliverable**: `final_blueprint.md` — Consolidated plan with gaps, risks, and go/no-go

---

## Feature Registry Items

| ID | Feature Name | Priority | Zone | Status |
|----|-------------|----------|------|--------|
| FR-001 | Daily Health Dashboard | Must-have | Primary | Planned |
| FR-002 | Gym Workout Planner | Must-have | Primary | Planned |
| FR-003 | Sleep & Recovery Tracker | Must-have | Primary | Planned |
| FR-004 | Food & Water Tracker | Must-have | Primary | Planned |
| FR-005 | Finance Tracker | Nice-to-have | Secondary | Planned |
| FR-006 | Book Reading Tracker | Nice-to-have | Secondary | Planned |
| FR-007 | 3D Body Progress Page | Deferred | Primary | Wireframe only |
| FR-008 | AI Chat Assistant | Must-have | Primary | Placeholder (needs LLM approval) |
| FR-009 | Feature Registry | Must-have | System | Planned |
| FR-010 | Agent Run Dashboard | Must-have | System | Planned |
| FR-011 | Approval Gate System | Must-have | System | New |
| FR-012 | Memory Browser | Must-have | System | Planned |
| FR-013 | Collapsible Sidebar | Must-have | System | New |
| FR-014 | Dark Premium Theme Tokens | Must-have | System | New |
| FR-015 | Page Builder | Nice-to-have | Advanced | Existing |
| FR-016 | UI References | Nice-to-have | Advanced | Existing |
| FR-017 | Generated Pages | Nice-to-have | Advanced | Existing |
| FR-018 | GitHub Backup | Nice-to-have | Advanced | Existing |

---

## Risks

| # | Risk | Impact | Mitigation |
|---|------|--------|------------|
| R1 | **Approval Gate adds friction** — could slow down daily use and development | High | Design a "trust session" mode where pre-approved actions skip the gate for a set duration |
| R2 | **Local LLM may not work on all machines** — resource constraints, model availability | Medium | Keep AI chat as placeholder until Devendra approves a specific local model + hardware check |
| R3 | **3D body progress page is complex** — Three.js adds bundle size and dev time | Medium | Defer to wireframe only in v1; build after core health features are stable |
| R4 | **SQLite may hit performance limits** with large health datasets over years | Low | Monitor query times; ask Devendra before migrating to any other database |
| R5 | **Sidebar clutter** — too many features could overwhelm the clean design goal | High | Strict zone separation: Primary (5 items), System (3 items), Advanced (collapsed section with 4 items) |
| R6 | **Privacy leak via GitHub backup** — private health data could accidentally sync | High | GitHub backup must explicitly exclude local encrypted storage paths; add a pre-push check |
| R7 | **Scope creep** — 10+ features in a personal app could delay delivery | High | Strict priority: build Must-have features first, Nice-to-have second, Deferred last |

---

## Next 5 Actions

| Step | Action | Owner | Depends On |
|------|--------|-------|------------|
| 1 | **Answer the 6 Questions Before Work** | Devendra | Nothing — this is the blocker |
| 2 | **Write PRD** with feature priority, user stories, and approval gate flow | Product Manager | Step 1 answers |
| 3 | **Design dashboard layout** and approval gate modal | UI/UX Designer | Step 2 PRD |
| 4 | **Plan frontend component architecture** and routing | Frontend Developer | Step 3 design |
| 5 | **Plan backend API + approval gate middleware + SQLite schema** | Backend Developer | Step 2 PRD + Step 1 answers (especially DB/API decisions) |

> **🚨 Blocker**: Steps 2–5 cannot proceed properly until Devendra answers the 6 questions. The approval gate rule applies to our own planning — we will not assume database, API, model, or deployment choices without your explicit say-so.

# Agent Team Decision

_Updated: 2026-06-26 10:20:04_

Goal: Plan this app/project: Personal AI Health Tracker

# Agent Team Decision

## Summary

The Personal AI Health Tracker is a private, local-first application with 10 core features spanning health, lifestyle, and system management. The app will be built on the existing AI Agent OS infrastructure (Next.js + FastAPI + SQLite + Markdown memory). The primary design philosophy is **dark premium dashboard with clean card layout, purple/cyan accents, and strict privacy controls**. 

All agent work is governed by the **Approval Gate Rule**: no database selection, paid API usage, local LLM connection, deployment, or private data handling happens without Devendra's explicit permission. The build will follow a strict priority order: Must-have health features first, then secondary lifestyle trackers, then system tools, with 3D body progress deferred to a wireframe placeholder.

---

## Questions Before Work

**🚨 These must be answered before development can proceed properly:**

| # | Question | Why We Need It | Default If Skipped |
|---|----------|---------------|-------------------|
| Q1 | **Which database for health data?** SQLite is current default. Should we stay with SQLite only, or do you want Supabase for any structured data later? | Determines schema design, migration path, and encryption layer | SQLite only, local-first |
| Q2 | **Which AI API for the health chat assistant?** Your current NVIDIA NIM key works for general chat. Do you want to use it for health insights too, or wait for a local LLM? | Determines if AI chat is functional or placeholder in v1 | NVIDIA NIM (existing key) for v1 |
| Q3 | **Should the dashboard home page replace the current `/dashboard`, or should the health tracker live at a separate route like `/health`?** | Current dashboard has agent OS controls. Health tracker is a different context | New route `/health` as the health tracker home |
| Q4 | **For the 3D body progress page, should we install Three.js now or just create a wireframe placeholder card?** | Three.js adds ~600KB to bundle and significant dev time | Wireframe placeholder only in v1 |
| Q5 | **Do you want body photos, lab reports, and medical notes stored locally with encryption, or just skip file storage for now?** | Determines if we build the encrypted local storage interface in v1 | Skip file storage in v1, text data only |
| Q6 | **Which sidebar items should stay visible vs. collapsed?** Current sidebar has 11 items. With health features added, it could grow to 18+. | Clean/uncluttered rule is at risk | Primary (5) + System (3) visible, Advanced (4+) collapsed |

---

## Agent Assignments

### Product Manager

**Deliverable**: `prd.md` — Product Requirements Document

| Task | Details |
|------|---------|
| Define feature priority matrix | Classify all 10 features: Must-have (health dashboard, gym, sleep, food/water, AI chat, feature registry, agent runs), Nice-to-have (finance, books), Deferred (3D body page) |
| Map features to dashboard zones | **Primary Zone**: Health dashboard, Gym, Sleep, Food/Water, AI Chat. **Secondary Zone**: Finance, Books. **System Zone**: Feature Registry, Agent Runs, Memory. **Advanced Zone** (collapsed): Page Builder, UI Refs, Generated Pages, GitHub Backup |
| Write user stories | One user story per feature with acceptance criteria. Example: "As Devendra, I want to log my gym workout so I can track progressive overload over time" |
| Define Approval Gate UX flow | When any agent or system action touches DB/API/model/deploy/private data → show modal with: action description, risk level, approve/deny buttons, "trust for 30 min" option |
| Create feature registry entries | All 18 features (10 new + 8 existing) entered with priority, zone, status, owner agent |
| Define data ownership rules | Which data stays in SQLite, which stays in markdown, which needs encryption — mapped per feature |

---

### UI/UX Designer

**Deliverable**: `ui_design.md` — Layout Specs, Component Tokens, Wireframes

| Task | Details |
|------|---------|
| Design dashboard layout | Dark premium: `#0B0F19` bg, `#1E293B` cards, `#8B5CF6` purple accent, `#06B6D4` cyan accent, `#10B981` success green |
| Design sidebar structure | Collapsible (220px → 64px). Grouped: 🏠 Primary (5), ⚙️ System (3), 🔧 Advanced (collapsed, 4+). Max 8 items visible when expanded |
| Design health dashboard home | Top row: 4 KPI cards (sleep score, calories, water, heart rate). Middle: gym today + habit streaks. Bottom: finance snapshot + book progress |
| Design Approval Gate modal | Dark overlay, card with: action icon, description text, risk badge (low/medium/high), Approve button (purple), Deny button (gray), "Trust for 30 min" toggle |
| Design gym workout page | Exercise list with sets/reps/weight, rest timer, history chart, progressive overload indicator |
| Design sleep tracker page | Sleep/wake time inputs, sleep quality score, recovery readiness indicator, weekly trend chart |
| Design food/water page | Meal log cards, water intake visual (filling bottle/circle), macro breakdown pie chart |
| Design 3D body progress wireframe | Placeholder card with "Coming Soon" label, silhouette outline, measurement input fields (chest, waist, arms, legs) |
| Typography system | Inter font. Data numbers: 28-32px bold. Labels: 11-12px uppercase tracking-wide. Headings: 18-20px semibold |
| Spacing system | 16px card gap, 20px card padding, 16-20px border-radius, 24px page padding |

---

### Frontend Developer

**Deliverable**: `frontend_plan.md` — Component Tree, Routing Map, State Architecture

| Task | Details |
|------|---------|
| Plan component architecture | Reusable components: `KPICard`, `ApprovalModal`, `Sidebar` (existing, extend), `ExerciseRow`, `SleepChart`, `WaterFillCircle`, `MealCard`, `FinanceSummary`, `BookProgressCard`, `AgentStatusCard` |
| Define page routing | `/health` (dashboard home), `/health/gym`, `/health/sleep`, `/health/food`, `/health/finance`, `/health/books`, `/health/body` (placeholder), `/health/ai-chat`, `/system/features`, `/system/agents`, `/system/memory` |
| Plan state management | Local component state + SQLite fetch on mount. No external state library (ask before adding). Use React context for sidebar collapse state and approval gate state only |
| Plan the Approval Gate component | Global modal component. Listens to a context event. Shows action details. Returns approve/deny/trust-30min. Logs decision to backend |
| Plan mobile responsive breakpoints | Sidebar auto-collapses on <768px. Cards stack vertically. KPI row becomes 2x2 grid then 1x4 stack |
| Files that need changes | `app/layout.tsx` (add health routes), `components/Sidebar.tsx` (add zone grouping), new: `app/health/page.tsx`, `app/health/gym/page.tsx`, `app/health/sleep/page.tsx`, `app/health/food/page.tsx`, `app/health/finance/page.tsx`, `app/health/books/page.tsx`, `app/health/body/page.tsx`, `components/ApprovalModal.tsx`, `components/KPICard.tsx` |

---

### Backend Developer

**Deliverable**: `backend_plan.md` — API Routes, Approval Gate Middleware, SQLite Schema, Encryption Interface

| Task | Details |
|------|---------|
| Plan API routes for health features | `GET/POST /health/gym/workouts`, `GET/POST /health/sleep/logs`, `GET/POST /health/food/meals`, `GET/POST /health/food/water`, `GET/POST /health/finance/transactions`, `GET/POST /health/books/entries`, `GET /health/dashboard/summary` |
| Design Approval Gate middleware | Decorator/middleware on sensitive routes. Checks: is action pre-approved? If not → return 403 with action details. If approved → proceed + log decision. Trust session: store approved actions with 30-min TTL in SQLite |
| Plan SQLite schema extensions | New tables: `gym_workouts`, `gym_exercises`, `sleep_logs`, `food_meals`, `food_water`, `finance_transactions`, `finance_categories`, `books`, `approval_decisions`, `agent_runs`. All with `created_at`, `updated_at` timestamps |
| Design local encrypted storage interface | Abstract interface for future file encryption. Methods: `store_encrypted(user_id, file_path, data)`, `retrieve_encrypted(user_id, file_path)`, `delete_encrypted(user_id, file_path)`. Implementation deferred to v2 but interface defined now |
| Plan dashboard summary endpoint | `GET /health/dashboard/summary` → returns today's sleep score, calories, water intake, gym status, finance snapshot, book progress — all from SQLite |
| Files that need changes | `main.py` (add health routers), new: `routers/health_gym.py`, `routers/health_sleep.py`, `routers/health_food.py`, `routers/health_finance.py`, `routers/health_books.py`, `middleware/approval_gate.py`, `models/health_models.py`, `database/health_schema.py` |
| **⚠️ Will not create any database or API without Devendra's approval** | |

---

### QA Tester

**Deliverable**: `qa_test_plan.md` — Test Cases, Edge Cases, Privacy Leak Checks

| Task | Details |
|------|---------|
| Approval Gate test scenarios | Test every trigger: DB write (unapproved → 403, approved → 200), API call (unapproved → blocked), model load (unapproved → blocked), deploy action (unapproved → blocked), private data access (unapproved → blocked). Test trust session: approved action skips gate for 30 min, then re-blocks |
| Dashboard load tests | Sidebar collapse/expand, KPI card rendering with null data, mobile responsive breakpoints, dark theme token consistency |
| Health data CRUD tests | Create/read/update/delete for gym, sleep, food, water, finance, books. Test with SQLite. Test with missing fields. Test with invalid data types |
| Privacy leak checks | Verify: no auto-upload to cloud, no public API endpoints, no unencrypted private data in transit, GitHub backup excludes local encrypted paths, no health data in URL parameters, no health data in console logs |
| Agent run dashboard tests | Status tracking (pending/running/completed/failed), output file linking, error state display |
| Edge cases | Empty database on first load, concurrent writes, date boundary (midnight) for daily summary, negative values for finance, future dates for sleep logs |

---

### Project Reviewer

**Deliverable**: `final_blueprint.md` — Consolidated Plan, Gaps, Risks, Go/No-Go

| Task | Details |
|------|---------|
| Review all agent outputs | Check consistency across PRD, UI design, frontend plan, backend plan, QA plan |
| Verify rule compliance | No DB/API/model/deploy decisions without approval ✅, Privacy rules enforced ✅, App scope is personal-only ✅, Dashboard is clean and uncluttered ✅ |
| Verify feature completeness | All 10 Agent Brief features covered + 8 existing features accounted for |
| Identify gaps | Missing: notification system design, data export/backup strategy, error boundary components, loading states design |
| Verify blueprint word count | Must stay under 2500 words per long-term memory rule |
| Go/No-Go assessment | List blockers that prevent starting development. Current blocker: 6 unanswered questions |
| Risk assessment | Validate all 7 identified risks, add any missed risks |

---

## Feature Registry Items

| ID | Feature Name | Priority | Zone | Status | Owner Agent |
|----|-------------|----------|------|--------|-------------|
| FR-001 | Daily Health Dashboard | Must-have | Primary | Planned | Product Manager |
| FR-002 | Gym Workout Planner | Must-have | Primary | Planned | Frontend Developer |
| FR-003 | Sleep & Recovery Tracker | Must-have | Primary | Planned | Frontend Developer |
| FR-004 | Food & Water Tracker | Must-have | Primary | Planned | Frontend Developer |
| FR-005 | Finance Tracker | Nice-to-have | Secondary | Planned | Frontend Developer |
| FR-006 | Book Reading Tracker | Nice-to-have | Secondary | Planned | Frontend Developer |
| FR-007 | 3D Body Progress Page | Deferred | Primary | Wireframe only | UI/UX Designer |
| FR-008 | AI Chat Assistant | Must-have | Primary | Placeholder (needs LLM approval) | Backend Developer |
| FR-009 | Feature Registry | Must-have | System | Existing | Product Manager |
| FR-010 | Agent Run Dashboard | Must-have | System | Existing | Backend Developer |
| FR-011 | Approval Gate System | Must-have | System | New | Backend Developer |
| FR-012 | Memory Browser | Must-have | System | Existing | Frontend Developer |
| FR-013 | Collapsible Sidebar | Must-have | System | Existing (needs zone update) | Frontend Developer |
| FR-014 | Dark Premium Theme Tokens | Must-have | System | New | UI/UX Designer |
| FR-015 | Page Builder | Nice-to-have | Advanced | Existing | Frontend Developer |
| FR-016 | UI References | Nice-to-have | Advanced | Existing | UI/UX Designer |
| FR-017 | Generated Pages | Nice-to-have | Advanced | Existing | Frontend Developer |
| FR-018 | GitHub Backup | Nice-to-have | Advanced | Existing | Project Reviewer |

---

## Risks

| # | Risk | Impact | Mitigation |
|---|------|--------|------------|
| R1 | **Approval Gate adds friction** — could slow daily use and development | High | Design "trust session" mode: pre-approved actions skip gate for 30 minutes |
| R2 | **Local LLM may not work on all machines** — resource constraints, model availability | Medium | Keep AI chat as placeholder until Devendra approves a specific local model + hardware check |
| R3 | **3D body progress page is complex** — Three.js adds ~600KB bundle and significant dev time | Medium | Defer to wireframe only in v1; build after core health features are stable |
| R4 | **SQLite may hit performance limits** with large health datasets over years | Low | Monitor query times; ask Devendra before migrating to any other database |
| R5 | **Sidebar clutter** — 18+ features could overwhelm the clean design goal | High | Strict zone separation: Primary (5 visible), System (3 visible), Advanced (collapsed section with 4+ items) |
| R6 | **Privacy leak via GitHub backup** — private health data could accidentally sync | High | GitHub backup must explicitly exclude local encrypted storage paths; add pre-push check hook |
| R7 | **Scope creep** — 10+ features in a personal app could delay delivery | High | Strict build order: Must-have first → Nice-to-have second → Deferred last. No feature starts until previous one is tested |
| R8 | **New health routes may conflict with existing agent OS routes** | Medium | Health features live under `/health/*` namespace. Agent OS stays under existing routes. No overlap |

---

## Next 5 Actions

| Step | Action | Owner | Depends On | Blocked? |
|------|--------|-------|------------|----------|
| 1 | **Answer the 6 Questions Before Work** | Devendra | Nothing | 🚨 YES — this is the blocker |
| 2 | **Write PRD** with feature priority, user stories, approval gate flow, and data ownership rules | Product Manager | Step 1 answers | Yes |
| 3 | **Design dashboard layout**, sidebar zones, KPI cards, and approval gate modal | UI/UX Designer | Step 2 PRD | Yes |
| 4 | **Plan frontend component architecture**, routing map, and state management | Frontend Developer | Step 3 design | Yes |
| 5 | **Plan backend API routes**, approval gate middleware, and SQLite schema extensions | Backend Developer | Step 2 PRD + Step 1 DB/API answers | Yes |

> **🚨 BLOCKER**: Steps 2–5 cannot proceed properly until Devendra answers the 6 questions. The approval gate rule applies to our own planning — we will not assume database, API, model, or deployment choices without your explicit permission.

# Agent Team Decision

_Updated: 2026-06-26 10:20:53_

Goal: Plan this app/project: Personal AI Health Tracker

# Agent Team Decision

## Summary

The Personal AI Health Tracker is a private, local-first application with 10 core features spanning health tracking, life management, and AI assistance. The app will be built on the existing AI Agent OS foundation (Next.js + FastAPI + SQLite) with a dark premium dashboard UI. All features are personal-only with zero public/community elements. An **Approval Gate system** must be built into the architecture — every database choice, API call, local model connection, deployment, or private data access requires Devendra's explicit permission before proceeding. The build will follow a strict priority order: Must-have health features first, then secondary life trackers, then system tools, then deferred items like 3D body progress.

---

## Questions Before Work

> 🚨 **These must be answered before agents can proceed with detailed planning.**

| # | Question | Why We Need It | Default If Skipped |
|---|----------|---------------|-------------------|
| Q1 | **Which database for health data?** SQLite is current. Should we extend SQLite with new tables, or do you want Supabase for any structured data? | Privacy rule: health data must stay local. We need your call before creating any new tables. | Extend existing SQLite with new health tables |
| Q2 | **Which AI API for the chat assistant?** NVIDIA NIM is current. Should the health AI chat use the same NVIDIA NIM key, or do you want a different/local model? | Paid API rule: we must confirm before using any paid endpoint for health chat. | Use existing NVIDIA NIM key |
| Q3 | **Dashboard structure: which features are primary sidebar items?** Proposed: Health Dashboard, Gym, Sleep, Food/Water as primary. Finance, Books as secondary (collapsed section). Feature Registry, Agent Runs, Memory as system section. Page Builder, UI Refs, Generated, GitHub Backup as advanced (hidden by default). | You said "not cluttered" — we need to confirm what stays visible vs. tucked away. | Use the proposed 3-zone sidebar layout |
| Q4 | **Local LLM connection for private health analysis?** Should the AI chat be able to analyze body photos, lab reports, and medical notes locally (no cloud), or is text-only chat sufficient for v1? | Connecting a local model is a decision we must ask about per your rules. | Text-only AI chat for v1; local model analysis deferred |
| Q5 | **Private data storage for body photos and medical reports?** Should we create a local encrypted folder (e.g., `~/.health-tracker/private/`) for body photos, lab PDFs, and medical notes? Or do you not need file storage in v1? | Privacy rule: body photos and medical data need explicit permission and local-only storage. | No file storage in v1; add encrypted local storage later |
| Q6 | **Finance tracker scope?** Simple income/expense tracking with categories, or more advanced (budgets, investments, recurring bills)? | Scope control: prevents feature creep in a nice-to-have feature. | Simple income/expense with categories only |

---

## Agent Assignments

### Product Manager

**Deliverable**: `prd.md` — Product Requirements Document

| Task | Details |
|------|---------|
| Define feature priority matrix | Must-have: Daily Health Dashboard, Gym Planner, Sleep Tracker, Food/Water Tracker, AI Chat, Feature Registry, Agent Run Dashboard, Approval Gate. Nice-to-have: Finance Tracker, Book Tracker. Deferred: 3D Body Progress Page. |
| Map features to dashboard zones | Primary zone (sidebar top): Health, Gym, Sleep, Food/Water, AI Chat. Secondary zone (sidebar mid): Finance, Books. System zone (sidebar bottom): Features, Agent Runs, Memory. Advanced zone (collapsed): Page Builder, UI Refs, Generated, GitHub Backup. |
| Write user stories | One user story per feature with acceptance criteria. Example: "As Devendra, I want to log my gym workout so I can track my progress over time. AC: Can add exercises, sets, reps, weight. Can view past workouts. Data stays in local SQLite." |
| Define Approval Gate UX flow | When any agent or system action touches DB/API/model/deploy/private-data → show modal with: action type, what will happen, approve/deny buttons, "trust for 30 min" option. Log all decisions. |
| Create feature registry entries | All 18 features (10 new + 8 existing) must have registry entries with ID, name, priority, zone, status, owner agent. |
| Define data ownership rules | Which data is local-only (health, body, medical), which can use Supabase if approved later (finance, books, tasks), which is markdown-only (memory, briefs). |

### UI/UX Designer

**Deliverable**: `ui_design.md` — Layout Specs, Component Tokens, Wireframes

| Task | Details |
|------|---------|
| Design dashboard home layout | Top row: 4 KPI cards (sleep score, calories, water, workout status). Middle: today's schedule + AI chat mini-panel. Bottom: habit streaks + finance snapshot + book progress. All in clean card grid. |
| Design sidebar with zone grouping | Collapsible (220px → 64px icons). Zone headers with subtle dividers. Active item: purple left border + purple text. Hover: cyan glow. Max 5-7 visible items before scroll. |
| Define color tokens | Background: `#0B0F19`. Cards: `#1E293B`. Purple accent: `#8B5CF6`. Cyan accent: `#06B6D4`. Success: `#10B981`. Warning: `#F59E0B`. Danger: `#EF4444`. Text primary: `#F1F5F9`. Text muted: `#64748B`. |
| Define typography scale | Data numbers: 28-32px bold (Inter). Section labels: 11-12px uppercase tracking-wide. Body: 14px regular. Card titles: 16px semibold. |
| Design Approval Gate modal | Dark overlay. Card with: action icon, action type badge (DB/API/MODEL/DEPLOY/DATA), description, approve button (green), deny button (red), "trust for 30 min" toggle (cyan). |
| Design health feature wireframes | Gym: exercise list + add set form + calendar view. Sleep: bar chart + sleep score ring. Food: meal log + water glasses + calorie bar. |
| Design 3D body progress placeholder | Wireframe only: placeholder card with "3D Body Progress — Coming Soon" + silhouette icon. Mark as deferred. |
| Design mobile responsive breakpoints | Sidebar becomes bottom tab bar on mobile (max 5 items). Cards stack vertically. KPI row becomes 2x2 grid. |

### Frontend Developer

**Deliverable**: `frontend_plan.md` — Component Tree, Routing Map, State Architecture

| Task | Details |
|------|---------|
| Plan component architecture | Core: `Sidebar`, `KPICard`, `ApprovalGateModal`, `FeatureRegistryPanel`, `AgentRunCard`. Health: `WorkoutLogger`, `SleepChart`, `FoodLog`, `WaterTracker`, `HabitStreak`. Secondary: `FinanceSnapshot`, `BookProgressCard`. |
| Define page routing | `/` → Health Dashboard. `/gym` → Gym Planner. `/sleep` → Sleep Tracker. `/food` → Food & Water. `/finance` → Finance. `/books` → Book Tracker. `/body` → 3D Body (placeholder). `/chat` → AI Chat. `/features` → Feature Registry. `/agents` → Agent Run Dashboard. Existing pages remain. |
| Plan state management | Local-first: React context + useState for UI state. SQLite via FastAPI for persistent data. No external state library (Redux, Zustand) without approval. |
| Plan Approval Gate integration | Wrap all API calls in `withApprovalGate(actionType, description, callback)`. Show modal if action not pre-approved. Log decision to local storage. |
| Plan sidebar refactor | Group items by zone. Add zone headers. Collapsible state persisted to localStorage. Active route highlighting. Mobile bottom tab bar. |
| Identify files to change | `app/layout.tsx` (sidebar), `app/page.tsx` (dashboard), `components/Sidebar.tsx`, new: `components/ApprovalGate.tsx`, `components/KPICard.tsx`, new pages for each feature. |

### Backend Developer

**Deliverable**: `backend_plan.md` — API Routes, Approval Gate Middleware, SQLite Schema, Encryption Interface

| Task | Details |
|------|---------|
| Plan API routes for health features | `GET/POST /health/vitals`, `GET/POST /gym/workouts`, `GET/POST /sleep/logs`, `GET/POST /food/meals`, `GET/POST /food/water`, `GET/POST /finance/transactions`, `GET/POST /books/entries`, `GET /dashboard/summary`. All REST, no GraphQL without approval. |
| Design Approval Gate middleware | FastAPI middleware: intercepts requests tagged with `requires_approval`. Checks local approval log. If not approved → returns 403 with action details. If approved → proceeds. Approval stored in SQLite `approval_log` table. |
| Plan SQLite schema extensions | New tables: `vitals` (date, heart_rate, bp_systolic, bp_diastolic, weight, notes), `workouts` (date, exercise, sets, reps, weight, duration), `sleep_logs` (date, bedtime, wake_time, quality, duration), `meals` (date, meal_type, food_name, calories, protein, carbs, fat), `water_intake` (date, glasses), `finance_transactions` (date, type, category, amount, description), `books` (title, author, total_pages, current_page, status), `approval_log` (timestamp, action_type, description, approved, trust_until). |
| Design local encrypted storage interface | Abstract interface for future implementation: `save_private_file(user_id, file_type, file_bytes) → file_id`, `get_private_file(file_id) → file_bytes`, `delete_private_file(file_id)`. Placeholder only — no implementation without approval. |
| Plan dashboard summary endpoint | `GET /dashboard/summary` returns: today's vitals, last workout, last sleep log, today's food/water, week finance total, current book progress. Single call for dashboard load. |
| Identify files to change | `main.py` (add routes, middleware), `database.py` (extend schema), new: `routers/health.py`, `routers/gym.py`, `routers/sleep.py`, `routers/food.py`, `routers/finance.py`, `routers/books.py`, `middleware/approval_gate.py`. |

### QA Tester

**Deliverable**: `qa_test_plan.md` — Test Cases, Edge Cases, Privacy Leak Checks

| Task | Details |
|------|---------|
| Approval Gate test scenarios | Test every trigger type: DB write (unapproved → blocked), API call (unapproved → blocked), model load (unapproved → blocked), deploy action (unapproved → blocked), private data access (unapproved → blocked). Test "trust for 30 min" expiry. Test approval log persistence. |
| Dashboard load tests | Test `/dashboard/summary` with no data (empty state), with partial data, with full data. Test KPI card rendering with zero values. Test sidebar collapse/expand state persistence. |
| Health data CRUD tests | Create workout → read → update → delete. Verify data in SQLite. Verify no cloud calls. Verify approval gate triggers on first write. |
| Privacy leak checks | Verify: no auto-upload to any cloud endpoint. Verify: no health data in GitHub-tracked files. Verify: no unencrypted private data in API responses. Verify: no public endpoints without auth. Verify: finance data stays local. |
| Mobile responsive tests | Test sidebar → bottom tab bar at 768px breakpoint. Test card stacking. Test KPI grid 4-col → 2-col. Test modal sizing on mobile. |
| Edge cases | Empty database on first run. Corrupt SQLite file. Missing NVIDIA API key for AI chat. Two approval requests at same time. Very large meal log (100+ entries). Negative finance amounts. Future dates in sleep log. |

### Project Reviewer

**Deliverable**: `final_blueprint.md` — Consolidated Plan, Gaps, Risks, Go/No-Go

| Task | Details |
|------|---------|
| Review all agent outputs | Check PRD, UI design, frontend plan, backend plan, QA plan for consistency. Cross-reference with Project Brain rules. |
| Verify rule compliance | No database chosen without Devendra's approval. No paid APIs used without approval. No dashboard structure changed without approval. No local LLM connected without approval. No private data uploaded without approval. |
| Verify privacy enforcement | Health data local-only. Medical reports not auto-uploaded. Body photos need explicit permission. No Supabase/cloud for private data without asking. |
| Verify scope | Personal-only. No SaaS. No community. No public profiles. No multi-user. |
| Verify UI cleanliness | Max 5-7 sidebar items visible. No clutter. Dark premium theme. Purple/cyan accents. Collapsible sidebar. |
| Verify blueprint length | Final blueprint must stay under 2500 words (per long-term memory rule). |
| Identify gaps and risks | Flag any missing decisions, blocked work, or dependencies that could delay the build. |
| Produce go/no-go recommendation | Clear statement: ready to build, or need more answers first. |

---

## Feature Registry Items

| ID | Feature Name | Priority | Zone | Status | Owner Agent |
|----|-------------|----------|------|--------|-------------|
| FR-001 | Daily Health Dashboard | Must-have | Primary | Planned | Product Manager |
| FR-002 | Gym Workout Planner | Must-have | Primary | Planned | Frontend Developer |
| FR-003 | Sleep & Recovery Tracker | Must-have | Primary | Planned | Frontend Developer |
| FR-004 | Food & Water Tracker | Must-have | Primary | Planned | Frontend Developer |
| FR-005 | Finance Tracker | Nice-to-have | Secondary | Planned | Frontend Developer |
| FR-006 | Book Reading Tracker | Nice-to-have | Secondary | Planned | Frontend Developer |
| FR-007 | 3D Body Progress Page | Deferred | Primary | Wireframe only | UI/UX Designer |
| FR-008 | AI Chat Assistant | Must-have | Primary | Placeholder | Frontend Developer |
| FR-009 | Feature Registry | Must-have | System | Existing | Product Manager |
| FR-010 | Agent Run Dashboard | Must-have | System | Planned | Frontend Developer |
| FR-011 | Approval Gate System | Must-have | System | New | Backend Developer |
| FR-012 | Memory Browser | Must-have | System | Existing | Frontend Developer |
| FR-013 | Collapsible Sidebar | Must-have | System | Existing (needs refactor) | Frontend Developer |
| FR-014 | Dark Premium Theme Tokens | Must-have | System | New | UI/UX Designer |
| FR-015 | Page Builder | Nice-to-have | Advanced | Existing | Frontend Developer |
| FR-016 | UI References | Nice-to-have | Advanced | Existing | UI/UX Designer |
| FR-017 | Generated Pages | Nice-to-have | Advanced | Existing | Frontend Developer |
| FR-018 | GitHub Backup | Nice-to-have | Advanced | Existing | Project Reviewer |
| FR-019 | Dashboard Summary API | Must-have | System | New | Backend Developer |
| FR-020 | Private Encrypted Storage | Deferred | System | Interface only | Backend Developer |

---

## Risks

| # | Risk | Impact | Mitigation |
|---|------|--------|------------|
| R1 | **Approval Gate adds friction** — could slow daily use and development speed | High | Design "trust session" mode: approve once, skip gate for 30 minutes for same action type |
| R2 | **Local LLM may not work on all machines** — resource constraints, model availability | Medium | Keep AI chat as placeholder until Devendra approves a specific local model + hardware check |
| R3 | **3D body progress page is complex** — Three.js adds bundle size and significant dev time | Medium | Defer to wireframe only in v1; build after core health features are stable and approved |
| R4 | **SQLite may hit performance limits** with large health datasets over years | Low | Monitor query times; ask Devendra before migrating to any other database |
| R5 | **Sidebar clutter** — 10+ features could overwhelm the clean design goal | High | Strict zone separation: Primary (5 items), Secondary (2 items), System (3 items), Advanced (collapsed, 4 items) |
| R6 | **Privacy leak via GitHub backup** — private health data could accidentally sync to repo | High | GitHub backup must explicitly exclude local encrypted storage paths and SQLite health tables; add pre-push check hook |
| R7 | **Scope creep** — 10+ features in a personal app could delay delivery significantly | High | Strict build order: Must-have first → Nice-to-have second → Deferred last. No feature starts until previous tier is complete |
| R8 | **NVIDIA NIM API key may not work for health-specific AI prompts** — current key might have rate limits or model restrictions | Medium | Test `/agents/decide` with NVIDIA key first (already in blocked work). If it fails, ask Devendra before switching APIs |
| R9 | **Mobile responsiveness may break card layouts** — many KPI cards and charts on small screens | Medium | Design mobile-first for health cards; use 2-col grid on mobile instead of 4-col; test early |

---

## Next 5 Actions

| Step | Action | Owner | Depends On | Estimated Time |
|------|--------|-------|------------|----------------|
| 1 | **Answer the 6 Questions Before Work** | Devendra | Nothing — this is the blocker | 10 min |
| 2 | **Write PRD** with feature priority, user stories, approval gate flow, and data ownership rules | Product Manager | Step 1 answers | 1 session |
| 3 | **Design dashboard layout** with zone grouping, color tokens, typography, and approval gate modal wireframe | UI/UX Designer | Step 2 PRD | 1 session |
| 4 | **Plan frontend component architecture** with routing map, sidebar refactor, and state management | Frontend Developer | Step 3 design | 1 session |
| 5 | **Plan backend API + approval gate middleware + SQLite schema extensions** | Backend Developer | Step 2 PRD + Step 1 answers (especially Q1 database and Q2 API decisions) | 1 session |

> **🚨 Blocker**: Steps 2–5 cannot proceed properly until Devendra answers the 6 questions. The approval gate rule applies to our own planning — we will not assume database, API, model, or deployment choices without your explicit say-so.

# Agent Team Decision

_Updated: 2026-06-26 10:21:36_

Goal: Plan this app/project: Personal AI Health Tracker

# Agent Team Decision

## Summary

The Personal AI Health Tracker is a private, local-first application with 10 core features spanning health, fitness, sleep, nutrition, finance, reading, 3D visualization, AI assistance, feature management, and agent monitoring. The app will be built on the existing AI Agent OS infrastructure (Next.js + FastAPI + SQLite), extending the current sidebar, dashboard, and backend routes. All health data stays local. No cloud, no public access, no community features. An **Approval Gate** system will enforce the "ask before" rule at the code level — every sensitive action (database changes, API calls, model connections, deployments, private data access) must be explicitly approved by Devendra before proceeding. The build follows a strict priority order: Must-have → Nice-to-have → Deferred. Development is currently **blocked** on 6 questions that need Devendra's answers before any database, API, model, or deployment decisions can be finalized.

---

## Questions Before Work

🚨 **These must be answered before Steps 2–5 of development can proceed.**

| # | Question | Why We Need It | Default If Skipped |
|---|----------|----------------|-------------------|
| Q1 | **Which database should we use for health data?** SQLite (local-only) is the current default. Should we keep SQLite, or do you want Supabase for any structured data? | Determines schema design, migration strategy, and privacy architecture | SQLite local-only |
| Q2 | **Can we use the existing NVIDIA NIM API for the AI Chat Assistant, or do you want a local LLM instead?** | Determines AI backend architecture, cost, latency, and privacy level | Keep as placeholder until approved |
| Q3 | **Do you approve the proposed dashboard layout change?** We want to reorganize the sidebar into 3 zones: Primary (5 health pages), System (3 agent OS pages), Advanced (collapsed: 4+ tools). Current dashboard becomes the Daily Health Dashboard. | Changes the main entry point of your app | No change until approved |
| Q4 | **Should we add a notification/reminders system for habits, water, sleep, and gym?** This would need a background scheduler. | Affects backend architecture and daily workflow | Skip for v1 |
| Q5 | **Do you want data export/backup for health data?** CSV/JSON export of gym logs, sleep data, food logs, finance records. | Affects backend routes and privacy handling | Skip for v1 |
| Q6 | **For the 3D Body Progress Page, do you want to store body photos locally?** This is the most sensitive private data. We need explicit permission before designing any storage for body images. | Privacy-critical decision | Wireframe only, no photo storage in v1 |

---

## Agent Assignments

### Product Manager

**Deliverable**: PRD with feature priorities, user stories, approval gate flow, and data ownership rules

| Task | Details |
|------|---------|
| Write full PRD | Feature priority matrix (Must-have / Nice-to-have / Deferred), user stories for each of the 10 features, acceptance criteria |
| Define Approval Gate flow | Document the 5 trigger categories: (1) Database write/migrate, (2) External API call, (3) Local model load, (4) Deployment action, (5) Private data access. Flow: Agent requests → Gate checks approval store → If approved within 30-min trust session → proceed → If not → return 403 with action details → Devendra approves → action proceeds |
| Define data ownership rules | Each data type tagged: `local-encrypted` (body photos, medical reports), `local-standard` (gym logs, sleep, food, water, finance, books), `cloud-optional` (none by default) |
| Map feature dependencies | FR-001 (Dashboard) depends on FR-002, FR-003, FR-004 data. FR-008 (AI Chat) depends on Q2 answer. FR-007 (3D Body) depends on Q6 answer |
| Create build order | Phase 1: Dashboard + Gym + Sleep + Food/Water. Phase 2: Finance + Books + AI Chat. Phase 3: 3D Body + Agent Dashboard improvements |
| **⚠️ Will not finalize PRD until Q1–Q6 are answered** | |

### UI/UX Designer

**Deliverable**: Dashboard layout design, sidebar zone system, KPI card specs, approval gate modal, theme tokens

| Task | Details |
|------|---------|
| Design sidebar zone system | **Primary Zone** (always visible): Dashboard, Gym, Sleep, Food, AI Chat. **System Zone** (visible): Features, Project Brain, Agent Brief. **Advanced Zone** (collapsed by default): Page Builder, UI References, Generated Pages, Long Memory, Short Memory, Agent Workspace |
| Design Daily Health Dashboard | Top row: 4 KPI cards (Sleep Score, Calories Today, Water Intake, Gym Status). Middle row: Today's Schedule (left 60%), Quick Log buttons (right 40%). Bottom row: Finance Snapshot (left), Book Progress (right). All in dark premium cards with purple/cyan accents |
| Define dark premium theme tokens | Background: `#0A0A0F` (page), `#12121A` (card), `#1A1A25` (card-hover). Accent: `#8B5CF6` (purple-primary), `#06B6D4` (cyan-secondary), `#A78BFA` (purple-light). Text: `#F5F5F5` (primary), `#9CA3AF` (muted), `#6B7280` (dim). Border: `#1F1F2E`. Success: `#10B981`, Warning: `#F59E0B`, Error: `#EF4444` |
| Design Approval Gate modal | Triggered when agent hits a gate. Shows: Action type, What will happen, Data affected, Approve/Deny buttons, "Trust for 30 min" checkbox. Dark modal with yellow warning accent |
| Design KPI card component | 120×80px minimum, icon top-left, value center (24px bold), label bottom (11px uppercase muted), accent line left border (2px purple or cyan) |
| Design mobile responsive breakpoints | Sidebar collapses to hamburger below 768px. Cards stack vertically. KPI cards become 2×2 grid on tablet, 1-column on mobile |
| **⚠️ Will not change dashboard structure until Q3 is approved** | |

### Frontend Developer

**Deliverable**: Component architecture, routing map, page structure, state management plan

| Task | Details |
|------|---------|
| Plan new routes | `/health/dashboard` (main entry), `/health/gym`, `/health/sleep`, `/health/food`, `/health/finance`, `/health/books`, `/health/body` (deferred), `/health/ai-chat` (placeholder). Existing routes stay unchanged |
| Plan component tree | `App` → `Sidebar` (zone system) → `HealthLayout` → `DashboardPage` → `KPICard`, `ScheduleBlock`, `QuickLogBar`, `FinanceSnapshot`, `BookProgressCard`. Shared: `ApprovalGateModal`, `DataCard`, `LogForm`, `ChartWidget` |
| Plan state management | React Context for theme + approval state. Local component state for form inputs. No global state library needed for personal app. Fetch from FastAPI on mount, optimistic updates for quick logs |
| Plan sidebar update | Add zone labels with collapsible Advanced section. Active item highlighted with purple accent. Health items get subtle health icon. System items get gear icon. Advanced items get wrench icon |
| Plan quick log components | Water: +1 glass button with counter. Food: mini form (meal type, calories, notes). Sleep: start/end time with quality slider. Gym: workout template selector + sets/reps form |
| **⚠️ Will not create pages or routes until Q1–Q3 are answered** | |

### Backend Developer

**Deliverable**: API route plan, approval gate middleware, SQLite schema extensions, dashboard summary endpoint

| Task | Details |
|------|---------|
| Plan health API routes | `POST /health/gym/workouts`, `GET /health/gym/workouts`, `POST /health/sleep/logs`, `GET /health/sleep/logs`, `POST /health/food/meals`, `GET /health/food/meals`, `POST /health/food/water`, `GET /health/food/water`, `POST /health/finance/transactions`, `GET /health/finance/transactions`, `POST /health/books/entries`, `GET /health/books/entries`, `GET /health/dashboard/summary` |
| Design Approval Gate middleware | Decorator/middleware on sensitive routes. Checks: is action pre-approved? If not → return 403 with action details. If approved → proceed + log decision. Trust session: store approved actions with 30-min TTL in SQLite |
| Plan SQLite schema extensions | New tables: `gym_workouts`, `gym_exercises`, `sleep_logs`, `food_meals`, `food_water`, `finance_transactions`, `finance_categories`, `books`, `approval_decisions`, `agent_runs`. All with `created_at`, `updated_at` timestamps |
| Design local encrypted storage interface | Abstract interface for future file encryption. Methods: `store_encrypted(user_id, file_path, data)`, `retrieve_encrypted(user_id, file_path)`, `delete_encrypted(user_id, file_path)`. Implementation deferred to v2 but interface defined now |
| Plan dashboard summary endpoint | `GET /health/dashboard/summary` → returns today's sleep score, calories, water intake, gym status, finance snapshot, book progress — all from SQLite |
| Files that need changes | `main.py` (add health routers), new: `routers/health_gym.py`, `routers/health_sleep.py`, `routers/health_food.py`, `routers/health_finance.py`, `routers/health_books.py`, `middleware/approval_gate.py`, `models/health_models.py`, `database/health_schema.py` |
| **⚠️ Will not create any database or API without Devendra's approval** | |

### QA Tester

**Deliverable**: Test cases, edge cases, privacy leak checks, approval gate scenarios

| Task | Details |
|------|---------|
| Approval Gate test scenarios | Test every trigger: DB write (unapproved → 403, approved → 200), API call (unapproved → blocked), model load (unapproved → blocked), deploy action (unapproved → blocked), private data access (unapproved → blocked). Test trust session: approved action skips gate for 30 min, then re-blocks |
| Dashboard load tests | Sidebar collapse/expand, KPI card rendering with null data, mobile responsive breakpoints, dark theme token consistency |
| Health data CRUD tests | Create/read/update/delete for gym, sleep, food, water, finance, books. Test with SQLite. Test with missing fields. Test with invalid data types |
| Privacy leak checks | Verify: no auto-upload to cloud, no public API endpoints, no unencrypted private data in transit, GitHub backup excludes local encrypted paths, no health data in URL parameters, no health data in console logs |
| Agent run dashboard tests | Status tracking (pending/running/completed/failed), output file linking, error state display |
| Edge cases | Empty database on first load, concurrent writes, date boundary (midnight) for daily summary, negative values for finance, future dates for sleep logs |

### Project Reviewer

**Deliverable**: Final blueprint — consolidated plan, gaps, risks, go/no-go assessment

| Task | Details |
|------|---------|
| Review all agent outputs | Check consistency across PRD, UI design, frontend plan, backend plan, QA plan |
| Verify rule compliance | No DB/API/model/deploy decisions without approval ✅, Privacy rules enforced ✅, App scope is personal-only ✅, Dashboard is clean and uncluttered ✅ |
| Verify feature completeness | All 10 Agent Brief features covered + 8 existing features accounted for |
| Identify gaps | Missing: notification system design (Q4), data export/backup strategy (Q5), error boundary components, loading states design |
| Verify blueprint word count | Must stay under 2500 words per long-term memory rule |
| Go/No-Go assessment | Current status: **NO-GO** — 6 unanswered questions block development. All planning is ready, but execution requires Devendra's decisions |
| Risk assessment | 8 risks identified (see Risks section below) |

---

## Feature Registry Items

| ID | Feature Name | Priority | Zone | Status | Owner Agent |
|----|-------------|----------|------|--------|-------------|
| FR-001 | Daily Health Dashboard | Must-have | Primary | Planned | Product Manager |
| FR-002 | Gym Workout Planner | Must-have | Primary | Planned | Frontend Developer |
| FR-003 | Sleep & Recovery Tracker | Must-have | Primary | Planned | Frontend Developer |
| FR-004 | Food & Water Tracker | Must-have | Primary | Planned | Frontend Developer |
| FR-005 | Finance Tracker | Nice-to-have | Secondary | Planned | Frontend Developer |
| FR-006 | Book Reading Tracker | Nice-to-have | Secondary | Planned | Frontend Developer |
| FR-007 | 3D Body Progress Page | Deferred | Primary | Wireframe only | UI/UX Designer |
| FR-008 | AI Chat Assistant | Must-have | Primary | Placeholder (needs LLM approval) | Backend Developer |
| FR-009 | Feature Registry | Must-have | System | Existing | Product Manager |
| FR-010 | Agent Run Dashboard | Must-have | System | Existing | Backend Developer |
| FR-011 | Approval Gate System | Must-have | System | New | Backend Developer |
| FR-012 | Memory Browser | Must-have | System | Existing | Frontend Developer |
| FR-013 | Collapsible Sidebar | Must-have | System | Existing (needs zone update) | Frontend Developer |
| FR-014 | Dark Premium Theme Tokens | Must-have | System | New | UI/UX Designer |
| FR-015 | Page Builder | Nice-to-have | Advanced | Existing | Frontend Developer |
| FR-016 | UI References | Nice-to-have | Advanced | Existing | UI/UX Designer |
| FR-017 | Generated Pages | Nice-to-have | Advanced | Existing | Frontend Developer |
| FR-018 | GitHub Backup | Nice-to-have | Advanced | Existing | Project Reviewer |

---

## Risks

| # | Risk | Impact | Mitigation |
|---|------|--------|------------|
| R1 | **Approval Gate adds friction** — could slow daily use and development | High | Design "trust session" mode: pre-approved actions skip gate for 30 minutes |
| R2 | **Local LLM may not work on all machines** — resource constraints, model availability | Medium | Keep AI chat as placeholder until Devendra approves a specific local model + hardware check |
| R3 | **3D body progress page is complex** — Three.js adds ~600KB bundle and significant dev time | Medium | Defer to wireframe only in v1; build after core health features are stable |
| R4 | **SQLite may hit performance limits** with large health datasets over years | Low | Monitor query times; ask Devendra before migrating to any other database |
| R5 | **Sidebar clutter** — 18+ features could overwhelm the clean design goal | High | Strict zone separation: Primary (5 visible), System (3 visible), Advanced (collapsed section with 4+ items) |
| R6 | **Privacy leak via GitHub backup** — private health data could accidentally sync | High | GitHub backup must explicitly exclude local encrypted storage paths; add pre-push check hook |
| R7 | **Scope creep** — 10+ features in a personal app could delay delivery | High | Strict build order: Must-have first → Nice-to-have second → Deferred last. No feature starts until previous one is tested |
| R8 | **New health routes may conflict with existing agent OS routes** | Medium | Health features live under `/health/*` namespace. Agent OS stays under existing routes. No overlap |

---

## Next 5 Actions

| Step | Action | Owner | Depends On | Blocked? |
|------|--------|-------|------------|----------|
| 1 | **Answer the 6 Questions Before Work** | Devendra | Nothing | 🚨 YES — this is the blocker |
| 2 | **Write PRD** with feature priority, user stories, approval gate flow, and data ownership rules | Product Manager | Step 1 answers | Yes |
| 3 | **Design dashboard layout**, sidebar zones, KPI cards, and approval gate modal | UI/UX Designer | Step 2 PRD | Yes |
| 4 | **Plan frontend component architecture**, routing map, and state management | Frontend Developer | Step 3 design | Yes |
| 5 | **Plan backend API routes**, approval gate middleware, and SQLite schema extensions | Backend Developer | Step 2 PRD + Step 1 DB/API answers | Yes |

> **🚨 BLOCKER**: Steps 2–5 cannot proceed properly until Devendra answers the 6 questions. The approval gate rule applies to our own planning — we will not assume database, API, model, or deployment choices without your explicit permission.
