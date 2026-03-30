import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import Link from "next/link";
import { deleteWorld, addWorldComment, deleteWorldComment } from "@/app/worlds/actions";
import { VoteButton } from "@/components/VoteButton";
import { Avatar, githubAvatar } from "@/components/Avatar";
import { DeleteButton } from "@/components/DeleteButton";
import { InlineEditComment } from "@/components/InlineEdit";
import type { World } from "@/lib/types";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const supabase = await createClient();
  const { data } = await supabase.from("worlds").select("title").eq("id", id).single();
  return { title: data ? `${data.title} — Agent World` : "World — Agent World" };
}

export default async function WorldDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: world } = await supabase
    .from("worlds")
    .select("*")
    .eq("id", id)
    .single();

  if (!world) notFound();

  const [
    { data: { user } },
    { data: profile },
    { data: comments },
    { count: voteCount },
  ] = await Promise.all([
    supabase.auth.getUser(),
    supabase.from("profiles").select("github_url").eq("id", world.user_id).single(),
    supabase.from("world_comments").select("*").eq("world_id", id).order("created_at", { ascending: true }),
    supabase.from("votes").select("*", { count: "exact", head: true }).eq("target_id", id).eq("target_type", "world"),
  ]);

  // Check if current user voted
  let userVoted = false;
  if (user) {
    const { data: myVote } = await supabase
      .from("votes")
      .select("user_id")
      .eq("user_id", user.id)
      .eq("target_id", id)
      .eq("target_type", "world")
      .single();
    userVoted = !!myVote;
  }

  // Fetch commenter profiles
  const commenterIds = [...new Set(comments?.map((c) => c.user_id) ?? [])];
  const { data: commenterProfiles } = commenterIds.length > 0
    ? await supabase.from("profiles").select("id, github_url").in("id", commenterIds)
    : { data: [] };

  const nameMap: Record<string, string> = {};
  const avatarMap: Record<string, string | null> = {};
  commenterIds.forEach((uid) => {
    const p = commenterProfiles?.find((p) => p.id === uid);
    const gh = p?.github_url?.replace("https://github.com/", "");
    nameMap[uid] = gh ? `@${gh}` : `user_${uid.slice(0, 6)}`;
    avatarMap[uid] = githubAvatar(p?.github_url ?? null);
  });

  const isOwner = user?.id === (world as World).user_id;
  const w = world as World;
  const githubUrl = profile?.github_url ?? null;
  const createdAt = new Date(w.created_at).toLocaleDateString("en-US", {
    year: "numeric", month: "long", day: "numeric",
  });

  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <div className="mb-6">
        <Link href="/worlds" className="text-sm text-aw-muted hover:text-aw-text transition-colors">
          ← Worlds
        </Link>
      </div>

      {w.screenshot_url && (
        <div className="border border-aw-border rounded-xl overflow-hidden mb-8">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={w.screenshot_url}
            alt={w.title}
            className="w-full"
            style={{ imageRendering: "pixelated" }}
          />
        </div>
      )}

      <div className="mb-6">
        <h1 className="text-2xl font-bold text-aw-text tracking-tight mb-2">{w.title}</h1>
        {w.description && (
          <p className="text-aw-muted leading-relaxed">{w.description}</p>
        )}
        <div className="flex items-center gap-4 mt-3">
          <span className="text-aw-muted text-xs">Shared {createdAt}</span>
          {githubUrl && (
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-aw-muted hover:text-aw-text transition-colors underline underline-offset-2"
            >
              {githubUrl.replace("https://github.com/", "@")}
            </a>
          )}
        </div>
      </div>

      <div className="flex items-center gap-3 mb-10">
        <VoteButton
          targetId={w.id}
          targetType="world"
          initialCount={voteCount ?? 0}
          initialVoted={userVoted}
          isAuthenticated={!!user}
        />
        {isOwner && (
          <form action={deleteWorld.bind(null, w.id)}>
            <button
              type="submit"
              className="text-sm text-aw-muted border border-aw-border px-4 py-2.5 rounded-lg hover:bg-red-50 hover:text-aw-red hover:border-red-200 transition-colors"
            >
              Delete
            </button>
          </form>
        )}
      </div>

      {/* Comments */}
      <div className="border-t border-aw-border pt-8">
        <h2 className="text-sm font-semibold text-aw-text mb-6">
          {comments && comments.length > 0 ? `${comments.length} comment${comments.length === 1 ? "" : "s"}` : "Comments"}
        </h2>

        {comments && comments.length > 0 && (
          <div className="space-y-5 mb-8">
            {comments.map((comment) => {
              const authorName = nameMap[comment.user_id];
              const isCommentOwner = user?.id === comment.user_id;
              const commentDate = new Date(comment.created_at).toLocaleDateString("en-US", {
                month: "short", day: "numeric", year: "numeric",
              });
              const edited = comment.updated_at !== comment.created_at;

              return (
                <div key={comment.id} className="flex gap-3">
                  <Avatar src={avatarMap[comment.user_id]} name={authorName} size={28} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline gap-2 mb-1">
                      <span className="text-xs font-medium text-aw-text">{authorName}</span>
                      <span className="text-xs text-aw-muted">
                        {commentDate}
                        {edited && <span className="ml-1 italic">(edited)</span>}
                      </span>
                    </div>
                    <p className="text-sm text-aw-text leading-relaxed whitespace-pre-line">{comment.body}</p>
                    {isCommentOwner && (
                      <div className="flex gap-2 mt-2">
                        <InlineEditComment
                          commentId={comment.id}
                          worldId={id}
                          body={comment.body}
                        />
                        <DeleteButton
                          action={deleteWorldComment.bind(null, comment.id, id)}
                          label="Delete"
                          confirmMessage="Delete this comment?"
                        />
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {user ? (
          <form action={addWorldComment.bind(null, id)} className="flex gap-3">
            <Avatar src={null} name="You" size={28} />
            <div className="flex-1">
              <textarea
                name="body"
                required
                rows={2}
                placeholder="Add a comment…"
                className="w-full border border-aw-border rounded-lg px-3 py-2 text-sm text-aw-text bg-white focus:outline-none focus:border-aw-text transition-colors resize-none"
              />
              <button
                type="submit"
                className="mt-2 text-xs font-medium bg-aw-text text-white px-3 py-1.5 rounded-lg hover:bg-aw-accent-hover transition-colors"
              >
                Comment
              </button>
            </div>
          </form>
        ) : (
          <p className="text-sm text-aw-muted">
            <Link href="/login" className="text-aw-text underline underline-offset-2">Sign in</Link> to leave a comment.
          </p>
        )}
      </div>
    </div>
  );
}
