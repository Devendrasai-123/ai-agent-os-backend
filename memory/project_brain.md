# Project Brain Memory

_Updated: 2026-06-26 16:54:32_

## App Mission
Build a private local-first AI Agent OS that helps Devendra plan, design, code, test, and manage his personal apps. The first major app is a Personal AI Health Tracker.

## User Rules
- Personal-only app
- No public SaaS
- No community features
- No public profiles
- Keep UI clean and not cluttered
- Ask before risky decisions

## Agent Rules
- Product Manager breaks ideas into features
- UI/UX Designer creates clean premium UI rules
- Frontend Developer builds pages and components
- Backend Developer builds safe APIs
- QA Tester checks errors and broken flows
- Reviewer checks final quality
- Agents must ask before database, APIs, local model, deployment, or private data connections

## Privacy Rules
- Private health files must stay local
- Medical reports must not upload to cloud automatically
- Body photos and personal data need explicit permission
- Ask before using Supabase, cloud APIs, or external storage

## UI Design Rules
- Dark premium dashboard
- Purple/cyan accent
- Clean card layout
- Collapsible sidebar like ChatGPT
- No giant empty spaces
- Pages must be mobile responsive
- Future 3D cute panda agent avatars

## Current Tech Stack
- Frontend: Next.js app router
- Styling: Tailwind CSS
- Backend: FastAPI
- Memory: Markdown files + SQLite
- AI API: NVIDIA NIM OpenAI-compatible API
- Local-first storage for private data

## Current Pages
- / dashboard
- /agent-brief
- /project-brain
- /features
- /page-builder
- /ui-references
- /generated
- /chat
- /long-memory
- /short-memory
- /agent-workspace-safe-test

## Current Backend Routes
- GET /health
- GET /features
- POST /features
- PUT /features/{feature_id}
- DELETE /features/{feature_id}
- GET /memory/long-term
- GET /memory/short-term
- POST /memory/write
- POST /agent-brief/save
- GET /project-brain
- POST /project-brain
- POST /agents/decide
- POST /control/start
- POST /control/stop
- POST /control/resume
- POST /control/archive
- POST /control/scan-memory

## Feature Roadmap
- Clean dashboard control center
- Feature Registry management
- Agent Brief save flow
- Project Brain memory
- Ask Agent Team planning
- Decision Reports page
- Backup and rollback before installing generated pages
- Better page generator validation
- 3D agent avatar UI later

## Completed Work
- GitHub repos created
- Frontend pushed
- Backend pushed
- Sidebar cleaned
- Sidebar collapsible
- Dashboard page improved
- Feature Registry backend working
- Agent Brief page created
- Long and short memory pages created

## Blocked Work
- Need confirm /agents/decide works with NVIDIA key
- Need decision reports visible in frontend
- Need project brain connected to all agent prompts
- Need backup/rollback before installing generated pages

## Next Actions
- Save Project Brain
- Test /project-brain backend route
- Test Ask Agent Team
- Show saved decision reports
- Add Project Brain to agent memory context
- Commit frontend and backend changes to GitHub
