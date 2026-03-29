# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Install
npm install

# Local dev (port 3000)
npm run dev

# Local dev (port 3002, for running alongside other services)
npm run dev:3002

# Production build (run before pushing to verify)
npm run build
```

No test runner. Verify changes by running `npm run build` and checking the live Vercel deployment.

## Architecture

Next.js 15 App Router, fully server-rendered. All pages are dynamic (no static generation) because they check Supabase auth state on every request.

### Auth flow

- `lib/supabase/client.ts` — browser-side Supabase client
- `lib/supabase/server.ts` — server-side client (reads/writes session cookies)
- `middleware.ts` — runs on every request; refreshes the session cookie and guards `/profile` and `/worlds/new`
- `app/auth/actions.ts` — `signInWithGoogle` and `signOut` server actions
- `app/auth/callback/route.ts` — OAuth redirect handler; exchanges code for session

Sign-in supports Google and GitHub OAuth. `/login` page offers both. The Supabase project is `nxrjilwzyzblnqyyelsn.supabase.co`.

### Data

Supabase PostgreSQL. Current tables:

| Table | Purpose |
|-------|---------|
| `worlds` | Community-shared world screenshots (title, description, screenshot_url, user_id) |
| `profiles` | Extends auth.users — stores `github_url`; auto-created by DB trigger on sign-up |

`game_state` column exists on `worlds` but is not used yet — deferred until the core `agent_world` tool has a proper export command.

Supabase Storage bucket `world-screenshots` holds uploaded screenshots (public read, authenticated write).

### Key patterns

- **Server actions** for all mutations (`app/worlds/actions.ts`, `app/auth/actions.ts`) — no API routes except the OAuth callback
- **Server components** fetch data directly via the server Supabase client — no client-side data fetching
- **`Nav` is a server component** — reads auth state on the server; do not make it a client component
- **Supabase anon key** uses the legacy JWT format (`eyJ...`), not the newer `sb_publishable_` format — the SSR library requires the JWT

## Environment variables

```
NEXT_PUBLIC_SUPABASE_URL=https://nxrjilwzyzblnqyyelsn.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<legacy JWT anon key>
```

Both must also be set in Vercel. See `.env.local.example`.

## Deployment

Vercel, auto-deploys on push to `main`. Domain: `agent-world.dev`.

## Planning files

- `ROADMAP.md` — phased feature plan (0.1.0–0.7.0) and open design decisions
- `VERSION_LOG.md` — commit history by release; **update this when committing**
- `QUESTIONS.md` — unresolved product decisions

Always update `VERSION_LOG.md` when making commits. Check `QUESTIONS.md` before starting a new phase.

## Current release state

- **0.1.0** ✓ Static scaffold
- **0.2.0** ✓ Content, media, agent-world.dev domain
- **0.3.0** ✓ Google OAuth + profiles
- **0.4.0** ✓ Worlds showcase (screenshot upload, browse, detail)
- **0.5.0** Forum ✓
- **0.5.1** Forum polish ✓
- **0.5.2** Forum search & polish ✓
- **0.6.0** Asset library (deferred — needs plugin format in core tool)
- **0.7.0** Enrichment
