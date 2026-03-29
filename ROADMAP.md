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

- Upload a `game_state.json` + screenshot to share a world
- World cards with author, description, and preview image
- `/worlds` browse page with basic filtering
- Individual world detail page
- Optional: lightweight in-browser preview using the PixiJS renderer

---

### Site 0.5.0 — Community: asset library

Goal: sprite and config sharing.

- Upload sprite atlases, tilesets, and config snippets
- Asset cards with type badge (sprite / tilemap / config)
- Version tag ("requires Agent World 0.4.0+")
- Download button

---

### Site 0.6.0 — Forum

Goal: threaded discussion for the community.

- Forum categories: General, Show & Tell, Sprites & Assets, Feature Requests,
  Installation Help
- Thread list and thread detail pages
- Reply composer (authenticated)
- Basic moderation: flag / hide posts

---

### Site 0.7.0 — Enrichment

Goal: quality-of-life for community content.

- Voting / starring for worlds and assets
- User reputation or activity badges
- Notifications (replies, new content in followed threads)
- RSS feed for changelog

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
