import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { getCategory } from "@/lib/forum";

export const metadata: Metadata = {
  title: "Search — Forum — Agent World",
};

export default async function ForumSearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const query = q?.trim() ?? "";

  const supabase = await createClient();

  const [threadResults, replyResults] = query.length >= 2
    ? await Promise.all([
        supabase
          .from("threads")
          .select("id, category, title, body, created_at")
          .or(`title.ilike.%${query}%,body.ilike.%${query}%`)
          .order("last_reply_at", { ascending: false })
          .limit(15),
        supabase
          .from("replies")
          .select("id, body, created_at, thread_id, threads(id, title, category)")
          .ilike("body", `%${query}%`)
          .order("created_at", { ascending: false })
          .limit(15),
      ])
    : [{ data: null }, { data: null }];

  const threads = threadResults.data;
  const replies = replyResults.data;
  const hasResults = (threads?.length ?? 0) + (replies?.length ?? 0) > 0;

  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <div className="mb-6">
        <Link href="/forum" className="text-sm text-aw-muted hover:text-aw-text transition-colors">
          ← Forum
        </Link>
      </div>

      <h1 className="text-2xl font-bold text-aw-text tracking-tight mb-8">Search</h1>

      <form method="GET" className="mb-10">
        <div className="flex gap-3">
          <input
            name="q"
            type="search"
            defaultValue={query}
            placeholder="Search threads and replies…"
            autoFocus
            className="flex-1 border border-aw-border rounded-lg px-3 py-2.5 text-sm text-aw-text bg-aw-bg placeholder:text-aw-muted focus:outline-none focus:border-aw-text transition-colors"
          />
          <button
            type="submit"
            className="text-sm font-medium bg-aw-text text-aw-bg px-4 py-2.5 rounded-lg hover:bg-aw-accent-hover transition-colors shrink-0"
          >
            Search
          </button>
        </div>
      </form>

      {!query && (
        <p className="text-aw-muted text-sm">Enter a search term above.</p>
      )}

      {query.length === 1 && (
        <p className="text-aw-muted text-sm">Enter at least 2 characters.</p>
      )}

      {query.length >= 2 && !hasResults && (
        <p className="text-aw-muted text-sm">No results for <strong>{query}</strong>.</p>
      )}

      {/* Thread results */}
      {threads && threads.length > 0 && (
        <div className="mb-10">
          <h2 className="text-xs font-semibold text-aw-muted uppercase tracking-widest mb-3">
            Threads ({threads.length})
          </h2>
          <div className="divide-y divide-aw-border border border-aw-border rounded-xl overflow-hidden">
            {threads.map((t) => {
              const cat = getCategory(t.category);
              const preview = t.body
                .replace(/\[\]\(aw-ref:[0-9a-f-]+\)/g, "")
                .replace(/[#*`>_~\[\]!]/g, "")
                .trim()
                .slice(0, 120);
              return (
                <Link
                  key={t.id}
                  href={`/forum/${t.category}/${t.id}`}
                  className="px-5 py-4 flex flex-col gap-1 hover:bg-aw-surface transition-colors group"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-aw-text text-sm font-medium group-hover:underline underline-offset-2">
                      {t.title}
                    </span>
                    {cat && (
                      <span className="text-aw-muted text-xs border border-aw-border px-1.5 py-0.5 rounded">
                        {cat.name}
                      </span>
                    )}
                  </div>
                  <span className="text-aw-muted text-xs truncate">{preview}</span>
                </Link>
              );
            })}
          </div>
        </div>
      )}

      {/* Reply results */}
      {replies && replies.length > 0 && (
        <div>
          <h2 className="text-xs font-semibold text-aw-muted uppercase tracking-widest mb-3">
            Replies ({replies.length})
          </h2>
          <div className="divide-y divide-aw-border border border-aw-border rounded-xl overflow-hidden">
            {replies.map((r) => {
              const thread = Array.isArray(r.threads) ? r.threads[0] : r.threads;
              if (!thread) return null;
              const cat = getCategory(thread.category);
              const preview = r.body
                .replace(/\[\]\(aw-ref:[0-9a-f-]+\)/g, "")
                .replace(/[#*`>_~\[\]!]/g, "")
                .trim()
                .slice(0, 120);
              return (
                <Link
                  key={r.id}
                  href={`/forum/${thread.category}/${thread.id}#reply-${r.id}`}
                  className="px-5 py-4 flex flex-col gap-1 hover:bg-aw-surface transition-colors group"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-aw-muted text-xs">in</span>
                    <span className="text-aw-text text-sm font-medium group-hover:underline underline-offset-2">
                      {thread.title}
                    </span>
                    {cat && (
                      <span className="text-aw-muted text-xs border border-aw-border px-1.5 py-0.5 rounded">
                        {cat.name}
                      </span>
                    )}
                  </div>
                  <span className="text-aw-muted text-xs truncate italic">{preview}</span>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
