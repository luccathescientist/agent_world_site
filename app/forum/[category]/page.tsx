import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getCategory } from "@/lib/forum";
import { Pagination } from "@/components/Pagination";
import { NewBadge, ForumVisitUpdater } from "@/components/NewBadge";

const PAGE_SIZE = 20;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await params;
  const cat = getCategory(category);
  return { title: cat ? `${cat.name} — Forum — Agent World` : "Forum — Agent World" };
}

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: Promise<{ category: string }>;
  searchParams: Promise<{ page?: string }>;
}) {
  const [{ category }, { page: pageParam }] = await Promise.all([params, searchParams]);
  const cat = getCategory(category);
  if (!cat) notFound();

  const page = Math.max(1, parseInt(pageParam ?? "1", 10) || 1);
  const from = (page - 1) * PAGE_SIZE;
  const to = from + PAGE_SIZE - 1;

  const supabase = await createClient();
  const [
    { data: { user } },
    { data: threads, count },
  ] = await Promise.all([
    supabase.auth.getUser(),
    supabase
      .from("threads")
      .select("id, title, body, created_at, last_reply_at, user_id", { count: "exact" })
      .eq("category", cat.slug)
      .order("last_reply_at", { ascending: false })
      .range(from, to),
  ]);

  const total = count ?? 0;

  // Fetch reply counts and last reply ID for this page's threads
  const threadIds = threads?.map((t) => t.id) ?? [];
  const { data: replyRows } = threadIds.length
    ? await supabase
        .from("replies")
        .select("id, thread_id, created_at")
        .in("thread_id", threadIds)
        .order("created_at", { ascending: true })
    : { data: [] };

  const countMap: Record<string, number> = {};
  const lastReplyIdMap: Record<string, string> = {};
  replyRows?.forEach(({ id, thread_id }) => {
    countMap[thread_id] = (countMap[thread_id] ?? 0) + 1;
    lastReplyIdMap[thread_id] = id; // last one wins since ordered asc
  });

  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <div className="mb-6">
        <Link href="/forum" className="text-sm text-aw-muted hover:text-aw-text transition-colors">
          ← Forum
        </Link>
      </div>

      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-aw-text tracking-tight">{cat.name}</h1>
          <p className="text-aw-muted text-sm mt-1">{cat.description}</p>
        </div>
        {user ? (
          <Link
            href={`/forum/${cat.slug}/new`}
            className="text-sm font-medium bg-aw-text text-aw-bg px-4 py-2.5 rounded-lg hover:bg-aw-accent-hover transition-colors shrink-0 ml-4"
          >
            New thread
          </Link>
        ) : (
          <Link
            href="/login"
            className="text-sm text-aw-muted border border-aw-border px-4 py-2.5 rounded-lg hover:bg-aw-surface transition-colors shrink-0 ml-4"
          >
            Sign in to post
          </Link>
        )}
      </div>

      {!threads?.length ? (
        <div className="border border-aw-border rounded-xl px-6 py-12 text-center">
          <p className="text-aw-muted text-sm">No threads yet. Be the first to post.</p>
        </div>
      ) : (
        <>
          <div className="divide-y divide-aw-border border border-aw-border rounded-xl overflow-hidden">
            {threads.map((thread) => {
              const date = new Date(thread.created_at).toLocaleDateString("en-US", {
                month: "short", day: "numeric", year: "numeric",
              });
              const replies = countMap[thread.id] ?? 0;
              const lastReplyId = lastReplyIdMap[thread.id];
              const preview = thread.body.replace(/\[\]\(aw-ref:[0-9a-f-]+\)/g, "").replace(/[#*`>_~\[\]!]/g, "").trim().slice(0, 120);

              return (
                <div key={thread.id} className="px-5 py-4 flex items-start justify-between hover:bg-aw-surface transition-colors group">
                  <Link href={`/forum/${cat.slug}/${thread.id}`} className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-aw-text text-sm font-medium group-hover:underline underline-offset-2 truncate">
                        {thread.title}
                      </span>
                      <NewBadge lastReplyAt={thread.last_reply_at} />
                    </div>
                    <div className="text-aw-muted text-xs mt-0.5 truncate">{preview}</div>
                    <div className="text-aw-muted text-xs mt-1">{date}</div>
                  </Link>
                  <div className="ml-6 shrink-0 text-right">
                    <div className="text-aw-text text-sm font-medium">{replies}</div>
                    <div className="text-aw-muted text-xs">{replies === 1 ? "reply" : "replies"}</div>
                    {lastReplyId && (
                      <Link
                        href={`/forum/${cat.slug}/${thread.id}#reply-${lastReplyId}`}
                        className="text-aw-muted text-xs hover:text-aw-text transition-colors underline underline-offset-2 block mt-0.5"
                        onClick={(e) => e.stopPropagation()}
                      >
                        last →
                      </Link>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
          <Pagination
            page={page}
            total={total}
            pageSize={PAGE_SIZE}
            basePath={`/forum/${cat.slug}`}
          />
          <ForumVisitUpdater />
        </>
      )}
    </div>
  );
}
