import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getCategory, type CategorySlug } from "@/lib/forum";
import { deleteThread, deleteReply } from "@/app/forum/actions";
import { augmentQuoteMarkers } from "@/lib/forum-display";
import { MarkdownContent } from "@/components/MarkdownContent";
import { ReplyComposer } from "@/components/ReplyComposer";
import { QuoteButton } from "@/components/QuoteButton";
import { InlineEditThread, InlineEditReply } from "@/components/InlineEdit";
import { DeleteButton } from "@/components/DeleteButton";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string; id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const supabase = await createClient();
  const { data } = await supabase.from("threads").select("title").eq("id", id).single();
  return { title: data ? `${data.title} — Agent World Forum` : "Forum — Agent World" };
}

export default async function ThreadPage({
  params,
}: {
  params: Promise<{ category: string; id: string }>;
}) {
  const { category, id } = await params;
  const cat = getCategory(category);
  if (!cat) notFound();

  const supabase = await createClient();

  const [{ data: thread }, { data: replies }, { data: { user } }] = await Promise.all([
    supabase.from("threads").select("*").eq("id", id).eq("category", cat.slug).single(),
    supabase.from("replies").select("*").eq("thread_id", id).order("created_at", { ascending: true }),
    supabase.auth.getUser(),
  ]);

  if (!thread) notFound();

  // Fetch author display names via profiles
  const userIds = [...new Set([thread.user_id, ...(replies?.map((r) => r.user_id) ?? [])])];
  const { data: profiles } = await supabase
    .from("profiles")
    .select("id, github_url")
    .in("id", userIds);

  const nameMap: Record<string, string> = {};
  userIds.forEach((uid) => {
    const p = profiles?.find((p) => p.id === uid);
    const gh = p?.github_url?.replace("https://github.com/", "");
    nameMap[uid] = gh ? `@${gh}` : `user_${uid.slice(0, 6)}`;
  });

  // Build set of edited reply IDs for quote augmentation
  const editedIds = new Set(
    replies?.filter((r) => r.updated_at !== r.created_at).map((r) => r.id) ?? []
  );

  const replyCount = replies?.length ?? 0;
  const isThreadOwner = user?.id === thread.user_id;
  const threadCreatedAt = new Date(thread.created_at).toLocaleDateString("en-US", {
    year: "numeric", month: "long", day: "numeric",
  });

  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <div className="mb-6">
        <Link href={`/forum/${cat.slug}`} className="text-sm text-aw-muted hover:text-aw-text transition-colors">
          ← {cat.name}
        </Link>
      </div>

      {/* Thread */}
      <div className="border border-aw-border rounded-xl p-6 mb-6">
        <h1 className="text-xl font-bold text-aw-text tracking-tight mb-1">{thread.title}</h1>
        <div className="text-aw-muted text-xs mb-5">
          {nameMap[thread.user_id]} · {threadCreatedAt}
          {thread.updated_at !== thread.created_at && (
            <span className="ml-2 italic">(edited)</span>
          )}
        </div>
        <MarkdownContent body={augmentQuoteMarkers(thread.body, editedIds)} />

        {isThreadOwner && (
          <div className="flex gap-3 mt-5 pt-4 border-t border-aw-border items-center">
            <InlineEditThread
              threadId={thread.id}
              catSlug={cat.slug as CategorySlug}
              title={thread.title}
              body={thread.body}
            />
            <DeleteButton
              action={deleteThread.bind(null, thread.id, cat.slug as CategorySlug)}
              label="Delete thread"
              confirmMessage="Delete this thread? This cannot be undone."
              disabled={replyCount > 0}
              disabledTitle="Remove all replies before deleting this thread"
            />
          </div>
        )}
      </div>

      {/* Replies */}
      {replies && replies.length > 0 && (
        <div className="space-y-4 mb-8">
          {replies.map((reply) => {
            const replyDate = new Date(reply.created_at).toLocaleDateString("en-US", {
              month: "short", day: "numeric", year: "numeric",
            });
            const isReplyOwner = user?.id === reply.user_id;
            const edited = reply.updated_at !== reply.created_at;
            const authorName = nameMap[reply.user_id];

            return (
              <div key={reply.id} id={`reply-${reply.id}`} className="border border-aw-border rounded-xl p-5">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-aw-muted text-xs">
                    {authorName} · {replyDate}
                    {edited && <span className="ml-2 italic">(edited)</span>}
                  </span>
                  {user && (
                    <QuoteButton replyId={reply.id} authorName={authorName} body={reply.body} />
                  )}
                </div>
                <MarkdownContent body={augmentQuoteMarkers(reply.body, editedIds)} />
                {isReplyOwner && (
                  <div className="flex gap-3 mt-4 pt-3 border-t border-aw-border items-center">
                    <InlineEditReply
                      replyId={reply.id}
                      threadId={id}
                      catSlug={cat.slug as CategorySlug}
                      body={reply.body}
                    />
                    <DeleteButton
                      action={deleteReply.bind(null, reply.id, id, cat.slug as CategorySlug)}
                      label="Delete"
                      confirmMessage="Delete this reply? This cannot be undone."
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Reply composer */}
      {user ? (
        <div className="border border-aw-border rounded-xl p-6">
          <h2 className="text-sm font-semibold text-aw-text mb-4">Reply</h2>
          <ReplyComposer threadId={id} category={cat.slug as CategorySlug} />
        </div>
      ) : (
        <div className="border border-aw-border rounded-xl px-6 py-8 text-center">
          <p className="text-aw-muted text-sm mb-4">Sign in to reply.</p>
          <Link
            href="/login"
            className="text-sm font-medium bg-aw-text text-white px-5 py-2.5 rounded-lg hover:bg-aw-accent-hover transition-colors"
          >
            Sign in
          </Link>
        </div>
      )}
    </div>
  );
}
