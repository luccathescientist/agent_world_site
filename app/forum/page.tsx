import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { CATEGORIES } from "@/lib/forum";

export const metadata: Metadata = {
  title: "Forum — Agent World",
};

export default async function ForumPage() {
  const supabase = await createClient();

  // Get thread counts and last activity per category
  const { data: stats } = await supabase
    .from("threads")
    .select("category, created_at");

  const categoryStats = Object.fromEntries(
    CATEGORIES.map((cat) => {
      const threads = stats?.filter((t) => t.category === cat.slug) ?? [];
      const last = [...threads].sort((a, b) =>
        b.created_at.localeCompare(a.created_at)
      )[0];
      return [cat.slug, { count: threads.length, lastAt: last?.created_at ?? null }];
    })
  );

  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <div className="mb-10">
        <div className="text-aw-muted text-xs uppercase tracking-widest mb-3 font-medium">Community</div>
        <h1 className="text-3xl font-bold text-aw-text mb-4 tracking-tight">Forum</h1>
        <p className="text-aw-muted leading-relaxed">
          Ask questions, share your setup, and talk about what you&apos;re building.
        </p>
      </div>

      <div className="divide-y divide-aw-border border border-aw-border rounded-xl overflow-hidden">
        {CATEGORIES.map((cat) => {
          const s = categoryStats[cat.slug];
          const lastAt = s.lastAt
            ? new Date(s.lastAt).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              })
            : null;

          return (
            <Link
              key={cat.slug}
              href={`/forum/${cat.slug}`}
              className="px-5 py-4 flex items-center justify-between hover:bg-aw-surface transition-colors group"
            >
              <div>
                <div className="text-aw-text text-sm font-medium group-hover:underline underline-offset-2">
                  {cat.name}
                </div>
                <div className="text-aw-muted text-xs mt-0.5">{cat.description}</div>
              </div>
              <div className="text-right ml-6 shrink-0">
                <div className="text-aw-text text-sm font-medium">{s.count}</div>
                <div className="text-aw-muted text-xs">
                  {lastAt ? `last ${lastAt}` : "no posts yet"}
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
