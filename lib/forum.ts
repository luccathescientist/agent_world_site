export const CATEGORIES = [
  {
    slug: "general",
    name: "General",
    description: "Discussion about Agent World",
  },
  {
    slug: "show-and-tell",
    name: "Show & Tell",
    description: "Share your office layouts and setups",
  },
  {
    slug: "sprites-and-assets",
    name: "Sprites & Assets",
    description: "Custom sprites, tilesets, and configs",
  },
  {
    slug: "feature-requests",
    name: "Feature Requests",
    description: "Ideas for what to build next",
  },
  {
    slug: "tech-talk",
    name: "Tech Talk",
    description: "Troubleshooting, setup questions, and implementation deep-dives",
  },
] as const;

export type CategorySlug = (typeof CATEGORIES)[number]["slug"];

export function getCategory(slug: string) {
  return CATEGORIES.find((c) => c.slug === slug) ?? null;
}

export interface Thread {
  id: string;
  user_id: string;
  category: CategorySlug;
  title: string;
  body: string;
  created_at: string;
  updated_at: string;
  author_name?: string;
  author_avatar?: string;
  reply_count?: number;
  last_reply_at?: string;
}

export interface Reply {
  id: string;
  thread_id: string;
  user_id: string;
  body: string;
  created_at: string;
  updated_at: string;
  author_name?: string;
  author_avatar?: string;
}
