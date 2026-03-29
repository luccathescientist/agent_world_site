# Open Product Questions

These are unresolved design and product decisions that should be answered before
or during the relevant release. Answered questions get moved to `ROADMAP.md` or
the relevant implementation notes.

---

## Domain and deployment

1. **What domain will the site live on?** The install command and OpenGraph URLs
   need a real domain. (`agentworld.dev`, `agentworld.io`, something else?)

2. **Where is the site deployed?** Vercel is assumed — is that correct, or do you
   prefer another host?

---

## Landing page and content

3. **Do you have screenshots or a GIF of Agent World running?** The hero has a
   placeholder. A real visual is the single highest-impact content addition.

4. **What is the relationship between Agent World and OpenClaw publicly?**
   Should the landing page explain OpenClaw as a prerequisite, or treat it as
   an implementation detail?

5. **Is there a logo or wordmark for Agent World?** The nav currently uses
   `◆ Agent World` as a text mark.

---

## Community and auth

6. **Google-only sign-in, or other providers too?** (GitHub auth would be natural
   for a developer tool.)

7. **Is account creation open to anyone, or invite-only at launch?**

8. **What file types and size limits should apply to uploaded worlds and assets?**
   (e.g. `game_state.json` only, or also sprite PNGs, zip archives?)

---

## Forum

9. **Build the forum in-house or embed an existing solution?** Options include:
   - Custom (built with Supabase + Next.js) — full control, more work
   - GitHub Discussions — zero infra, already where developers are
   - Discourse embed — powerful, but heavy to self-host

10. **How much moderation tooling is needed at launch?** (flag/hide posts, or
    something more structured?)

---

## Install flow

11. **Should the install script support a specific install path or version pinning?**
    (e.g. `AGENT_WORLD_VERSION=0.1.0 curl ... | sh`)

12. **Will there be a Homebrew formula or pip package eventually?** This affects
    how the install page presents the options.

---

## Relationship to core repo

13. **Should the changelog on the site pull live from GitHub** (via the API at
    build time) or stay as a manually maintained `lib/changelog.ts`?

14. **Is there a separate GitHub org planned for Agent World**, or does everything
    stay under `luccathescientist`?
