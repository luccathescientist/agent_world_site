import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getCategory } from "@/lib/forum";
import { Pagination } from "@/components/Pagination";

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
      .select("id, title, body, created_at, user_id", { count: "exact" })
      .eq("category", cat.slug)
      .order("created_at", { ascending: false })
      .range(from, to),
  ]);

  const total = count ?? 0;

  // Fetch reply counts for this page's threads
  const threadIds = threads?.map((t) => t.id) ?? [];
  const { data: replyCounts } = threadIds.length
    ? await supabase
        .from("replies")
        .select("thread_id")
        .in("thread_id", threadIds)
    : { data: [] };

  const countMap: Record<string, number> = {};
  replyCounts?.forEach(({ thread_id }) => {
    countMap[thread_id] = (countMap[thread_id] ?? 0) + 1;
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
            className="text-sm font-medium bg-aw-text text-white px-4 py-2.5 rounded-lg hover:bg-aw-accent-hover transition-colors shrink-0 ml-4"
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
              const preview = thread.body.replace(/[#*`>_~\[\]!]/g, "").slice(0, 120);

              return (
                <Link
                  key={thread.id}
                  href={`/forum/${cat.slug}/${thread.id}`}
                  className="px-5 py-4 flex items-start justify-between hover:bg-aw-surface transition-colors group"
                >
                  <div className="min-w-0">
                    <div className="text-aw-text text-sm font-medium group-hover:underline underline-offset-2 truncate">
                      {thread.title}
                    </div>
                    <div className="text-aw-muted text-xs mt-0.5 truncate">{preview}</div>
                    <div className="text-aw-muted text-xs mt-1">{date}</div>
                  </div>
                  <div className="ml-6 shrink-0 text-right">
                    <div className="text-aw-text text-sm font-medium">{replies}</div>
                    <div className="text-aw-muted text-xs">{replies === 1 ? "reply" : "replies"}</div>
                  </div>
                </Link>
              );
            })}
          </div>
          <Pagination
            page={page}
            total={total}
            pageSize={PAGE_SIZE}
            basePath={`/forum/${cat.slug}`}
          />
        </>
      )}
    </div>
  );
}
