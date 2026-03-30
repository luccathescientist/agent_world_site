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

## Release 0.8.0: Messaging, email notifications, and analytics

Status: `in progress`

Goal: admin email notifications on key events, Google Analytics tracking, and a private messaging system between users.

### In Progress

- Google Analytics 4 via `NEXT_PUBLIC_GA_MEASUREMENT_ID` env var; script injected in root layout with `afterInteractive` strategy
- Resend email notifications to admin (luccathescientist@gmail.com) on new user sign-up, forum thread creation, forum replies, and new world posts; gated on `RESEND_API_KEY` env var
- Private messaging: `direct_messages` table, `/messages` inbox, `/messages/[userId]` conversation view, unread badge in Nav, auth protection in middleware

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

#### `0be4093` — Switch domain from boya.dev to agent-world.dev

Updated install command URLs, OG metadata, and install script to agent-world.dev.

#### `ba1303d` — Redesign to clean white/black theme; add high-res GIF

Replaced dark retro palette with clean light theme; removed mono font; modernized
all page layouts; replaced low-res GIF with native 960x688 canvas capture.

#### `2e26c81` — Replace GIF with native 960x688 canvas capture

Pinned canvas to viewport origin via CSS before recording; screenshot and GIF
are now pixel-perfect at 960x688 with no browser scaling artifacts.

### Shipped state for 0.2.0

- Clean white/black modern theme with system sans-serif font
- Native 960x688 animated GIF and screenshot captured from live canvas
- OpenGraph and Twitter card meta tags
- Domain set to agent-world.dev throughout
- Install script live at agent-world.dev/install.sh

---

## Release 0.3.0: Auth foundation

Status: `complete`

Goal: lay the infrastructure for community features with Google OAuth.

### Committed

#### `3a20140` — Scaffold auth foundation with Supabase + Google OAuth

Added Supabase browser/server clients, middleware for session refresh, OAuth
callback route, signInWithGoogle/signOut server actions, Sign in button in nav,
and /profile page showing avatar, name, email, and join date.

#### `1fb5572` — Add error detail to auth callback redirect for debugging

Improved callback error logging to surface the exact Supabase error reason in the URL.

#### `eb6e338` — Update .env.local.example with Supabase project URL

Documented the Supabase project URL in the env example file.

#### `357a332` — Add GitHub OAuth, /login page, and profile GitHub URL

Added GitHub as a second OAuth provider; /login page with GitHub + Google buttons;
profile page with editable github_url; world detail shows author's GitHub handle;
github_url auto-populated for GitHub sign-ins via DB trigger.

### Shipped state for 0.3.0

- Supabase project connected (nxrjilwzyzblnqyyelsn.supabase.co)
- Google and GitHub OAuth working end-to-end on agent-world.dev
- /login page with both providers (GitHub primary)
- Nav "Sign in" links to /login
- /profile page with avatar, name, provider, join date, editable github_url
- profiles table with auto-trigger for GitHub username on sign-up
- World detail shows author's @github handle
- Middleware guards /profile and refreshes sessions

---

## Release 0.4.0: Worlds showcase

Status: `complete`

### Committed

#### `cb48350` — Add worlds showcase (0.4.0)

Screenshot upload to Supabase Storage, worlds browse page with card grid,
world detail page with author info; server actions for create and delete.

#### `02c2d06` — Remove game_state.json upload from worlds; note future export plan

Worlds form accepts screenshot only; game_state column deferred until core tool has an export command.

#### `2c2e0fd` — Request read:user scope for GitHub OAuth to get username and avatar

GitHub sign-ins now populate username and avatar (previously only email).

#### `04bfcff` — Fix worlds detail 404 by splitting profiles join into separate query

No FK exists between worlds and profiles; split into two queries to load the author's github_url.

### Shipped state for 0.4.0

- Screenshot upload to Supabase Storage bucket `world-screenshots`
- Browse page (`/worlds`) with card grid showing title, description, screenshot, author
- Detail page (`/worlds/[id]`) with full screenshot, author GitHub handle, delete for owner
- `worlds` table with title, description, screenshot_url, user_id, game_state (unused)
- Middleware guards `/worlds/new` (requires auth)

---

## Release 0.5.0: Forum

Status: `complete`

### Committed

#### `3403647` — Add forum (0.5.0): threaded discussions with markdown and quoting

Category index, thread list, new thread form, thread detail with flat replies;
markdown editor with write/preview toggle; quote button pre-fills reply composer;
inline edit/delete for own content; RLS-protected threads + replies tables.

### Shipped state for 0.5.0

- `/forum` — category index (General, Show & Tell, Sprites & Assets, Feature Requests, Tech Talk) with thread counts
- `/forum/[category]` — thread list with reply counts and previews
- `/forum/[category]/new` — new thread form (auth required)
- `/forum/[category]/[id]` — thread detail: flat replies, markdown rendering, quote, inline edit, delete
- Markdown editor with write/preview toggle; GFM (tables, strikethrough) via remark-gfm
- Quote button pre-fills composer with attributed blockquote (`> @user wrote:`)
- Author display: GitHub handle if set, else short user ID
- `threads` + `replies` tables in Supabase with full RLS

---

## Release 0.5.1: Forum polish

Status: `complete`

### Committed

#### `2815332` — Forum polish (0.5.1): avatars, user dropdown, profile activity, sort, cheatsheet, favicon

### Shipped state for 0.5.1

- Favicon: pixel-art character SVG (`app/icon.svg`)
- Nav: pixel character logo next to wordmark; `UserMenu` client dropdown (avatar + name → Profile / Sign out)
- `Avatar` component: derives from `github_url.png?size=80`; letter fallback for non-GitHub users
- Thread detail: avatar thumbnails next to author names and reply authors
- Profile page: "Your threads" and "Your replies" sections with jump links to `#reply-UUID`; avatar from GitHub or auth metadata
- MarkdownEditor: collapsible Markdown reference cheatsheet (uses `<details>`)
- Forum category page: sorted by `last_reply_at` (threads with recent replies float to top); `last_reply_at` column + trigger added to DB

---

## Release 0.5.2: Forum search and polish

Status: `complete`

### Committed

#### `b52c982` — Forum search and polish (0.5.2): search, syntax highlighting, jump-to-last, new badge

### Shipped state for 0.5.2

- `/forum/search`: searches thread titles/bodies and reply bodies; category labels on results
- Forum index: search bar redirects to `/forum/search`
- Code syntax highlighting via `rehype-highlight` + highlight.js GitHub theme
- Thread list: "New" badge on threads with activity since last visit (localStorage per browser)
- Thread list: "last →" jump link scrolls to the most recent reply anchor
- DB: `pg_trgm` GIN indexes on `threads.title`, `threads.body`, `replies.body` for fast `ilike` search

---

## Release 0.6.0: Asset library

Status: `planned` (deferred — requires plugin/sharing format in core tool)

Commits:

- none yet

---

## Release 0.7.0: Enrichment

Status: `in progress`

### In Progress

- Voting (★/☆) on worlds and forum threads via `votes` table; `VoteButton` client component with optimistic updates
- World comments: `world_comments` table; add/edit/delete with inline edit and avatar display on world detail page
- Vote counts shown on world cards in the browse grid

### Committed

- none yet
