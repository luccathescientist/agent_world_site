# Version Log

This file is the running historical index for the Agent World site.

Purpose:

- map site releases to concrete git commits
- summarize what each commit changed
- preserve context for future development sessions
- make it easier to resume work without reconstructing history from `git log`

Conventions:

- each release section tracks the commits that belong to that milestone
- each commit entry uses a single sentence
- summaries stay high-signal and approximate rather than exhaustive
- if work exists in the working tree but is not yet committed, record it under
  `In Progress` for the active release

---

## Release 0.1.0: Static scaffold

Status: `complete`

Goal: get the correct structure, palette, and navigation live as a deployable baseline.

### Committed

#### `21866da` — Scaffold Phase 1 static marketing site

Next.js 14 App Router + Tailwind with Agent World retro palette; landing page,
install guide, changelog, and community stubs; `public/install.sh` for the curl
one-liner.

#### `1f764d4` — Update tsconfig with ES2017 target from Next.js build

Applied the `target: ES2017` recommendation from the Next.js build output.

### Shipped state for 0.1.0

- Next.js 15 project scaffolded with TypeScript and Tailwind
- Agent World color palette (`aw-bg`, `aw-gold`, `aw-surface`, etc.) in Tailwind theme
- Landing page: hero with install command, feature grid, roadmap teaser, community CTA
- `/install` — step-by-step install guide with curl one-liner
- `/changelog` — all 7 core milestones rendered from `lib/changelog.ts`
- `/worlds` and `/forum` — coming-soon stubs
- `public/install.sh` — functional install script
- `ROADMAP.md`, `VERSION_LOG.md`, `QUESTIONS.md` added
- Remote set to `git@github-lucca:luccathescientist/agent_world_site.git`

---

## Release 0.2.0: Content and media

Status: `in progress`

Expected focus:

- real screenshots or GIF of the Agent World renderer in the hero
- polished landing page copy
- OpenGraph / social meta tags
- real domain wired to install command

### Committed

#### `dc76286` — Add real screenshots and GIF, OG tags, boya.dev domain

Captured world canvas screenshot and 13s animated GIF via Playwright; replaced
hero placeholder with optimized GIF; added OpenGraph/Twitter card meta tags;
updated install command URLs to boya.dev.

---

## Release 0.3.0: Auth foundation

Status: `planned`

Expected focus:

- Supabase project setup
- Google OAuth sign-in
- user profile page
- session management in nav

Commits:

- none yet

---

## Release 0.4.0: Worlds showcase

Status: `planned`

Commits:

- none yet

---

## Release 0.5.0: Asset library

Status: `planned`

Commits:

- none yet

---

## Release 0.6.0: Forum

Status: `planned`

Commits:

- none yet

---

## Release 0.7.0: Enrichment

Status: `planned`

Commits:

- none yet
