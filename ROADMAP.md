# Agent World Site — Product Roadmap

This file tracks the product vision, phased feature plan, and open design questions
for the Agent World marketing and community website.

---

## Vision

A public home for Agent World that serves three purposes:

1. **Marketing** — explain what Agent World is, show it in action, and make it easy
   to install
2. **Distribution** — host the one-line installer and link to the core GitHub repo
3. **Community** — let users share worlds, sprites, and configs; discuss the project;
   and follow its development

The site is deliberately separate from the core `agent_world` repo. It is a hosted
service, not an installable tool.

---

## Release Plan

### Site 0.1.0 — Static scaffold ✓ complete

Goal: get something public-facing live with the correct structure and palette.

- Next.js 14 App Router + Tailwind CSS with Agent World retro palette
- Landing page: hero, install command, feature grid, roadmap teaser, community CTA
- `/install` — step-by-step install guide + curl one-liner
- `/changelog` — milestone history sourced from `lib/changelog.ts`
- `/worlds` — coming-soon stub
- `/forum` — coming-soon stub with category list
- `public/install.sh` — the hosted install script

---

### Site 0.2.0 — Content and media

Goal: make the landing page compelling with real visuals and copy.

- Replace world preview placeholder with screenshot or animated GIF of the renderer
- Add an "About" or "How it works" section with more detail
- Polish landing page copy
- Add OpenGraph / social meta tags for link previews
- Point install command at the real domain once DNS is live

---

### Site 0.3.0 — Auth foundation

Goal: lay the infrastructure for community features.

- Supabase project setup (auth, database, storage)
- Google OAuth sign-in flow
- User profile page (`/profile`)
- Basic session management (sign in / sign out in nav)

---

### Site 0.4.0 — Community: worlds showcase

Goal: let users share their Agent World setups.

- Upload a screenshot + title/description to share a world
- World cards with author, description, and preview image
- `/worlds` browse page
- Individual world detail page with delete for owner

Note: `game_state.json` upload is deferred. A proper world export will eventually
need to bundle the tilemap, room mapping, sprite atlases, and chat bubble config
so other users can fully render and animate the world. This requires an export
command in the core `agent_world` tool first.

---

### Site 0.5.0 — Forum ✓ complete

Goal: threaded discussion for the community.

- Five categories: General, Show & Tell, Sprites & Assets, Feature Requests, Tech Talk
- Thread list and thread detail pages with flat replies
- Markdown editor with write/preview toggle, image upload, GFM rendering
- Quote button (pre-fills composer with attributed blockquote; tracks edits)
- Inline edit and delete for own threads/replies; confirmation dialogs
- Delete thread blocked if replies exist (server + UI guard)
- Pagination for thread lists and worlds browse page

---

### Site 0.5.1 — Forum polish (Tier 1)

Goal: UI quality-of-life pass on the forum and nav.

- **Avatar thumbnails** — derive from GitHub URL (`github_url.png?size=40`); letter fallback for Google-only users
- **User dropdown menu** — click username in nav → dropdown with Profile and Sign out
- **Profile: activity** — threads and replies sections on `/profile` with jump links (`#reply-UUID`)
- **Sort threads by last activity** — float threads with recent replies to top of list
- **Markdown quick reference** — collapsible syntax cheatsheet in the editor
- **Favicon + nav logo** — icon in `/public` and graphic next to "Agent World" in the titlebar

---

### Site 0.5.2 — Forum search and polish (Tier 2)

Goal: discoverability and developer experience in the forum.

- **Full-text search** — Supabase `tsvector` across threads + replies; `/forum/search?q=` page
- **Code syntax highlighting** — `rehype-highlight` for code blocks (important for Tech Talk)
- **Jump to latest reply** — link on thread list rows to scroll to the last reply
- **"New" badge** — mark threads with activity since your last visit (localStorage or `last_seen` table)

---

### Site 0.6.0 — Community: asset library

Goal: sprite and config sharing. Deferred until the core `agent_world` tool has
a defined plugin/sharing format for bundling visual assets (tilesets, sprite
atlases, room configs). In the meantime, users can link their GitHub repos from
their profile.

- Link to or upload sprite atlases, tilesets, and config snippets
- Asset cards with type badge (sprite / tilemap / config)
- Version tag ("requires Agent World 0.4.0+")
- Download or GitHub link button

---

### Site 0.7.0 — Enrichment

Goal: quality-of-life for community content.

- **Voting / starring** for worlds and forum threads
- **Reply notifications** — email when someone replies to your thread (needs email provider e.g. Resend)
- **Thread tags** — cross-category tagging (e.g. `#pixi`, `#tilemap`); requires tags table
- **Thread pinning / locking** — requires mod/admin role concept
- **User reputation or activity badges**
- **RSS feed** for changelog

---

## Open Questions

See `QUESTIONS.md` for the current list of unresolved product decisions.

---

## Tech Stack

| Layer | Choice |
|-------|--------|
| Framework | Next.js 15 (App Router) |
| Styling | Tailwind CSS |
| Auth + DB + Storage | Supabase |
| Hosting | Vercel |
| Install script | `public/install.sh` served at `/install.sh` |
