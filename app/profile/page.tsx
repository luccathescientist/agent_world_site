import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { updateProfile } from "@/app/profile/actions";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Avatar, githubAvatar } from "@/components/Avatar";

export const metadata: Metadata = {
  title: "Profile — Agent World",
};

export default async function ProfilePage({
  searchParams,
}: {
  searchParams: Promise<{ saved?: string }>;
}) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { saved } = await searchParams;

  const [{ data: profile }, { data: userThreads }, { data: userReplies }] = await Promise.all([
    supabase.from("profiles").select("github_url").eq("id", user.id).single(),
    supabase
      .from("threads")
      .select("id, category, title, created_at")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .limit(10),
    supabase
      .from("replies")
      .select("id, body, created_at, thread_id, threads(id, title, category)")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .limit(10),
  ]);

  const name = user.user_metadata?.name ?? user.user_metadata?.user_name ?? "—";
  const email = user.email ?? "—";
  const provider = user.app_metadata?.provider as string | undefined;
  const joinedAt = new Date(user.created_at).toLocaleDateString("en-US", {
    year: "numeric", month: "long", day: "numeric",
  });

  const avatarSrc =
    githubAvatar(profile?.github_url) ??
    (user.user_metadata?.avatar_url as string | undefined) ??
    null;

  return (
    <div className="max-w-2xl mx-auto px-6 py-16">
      <div className="mb-10">
        <div className="text-aw-muted text-xs uppercase tracking-widest mb-3 font-medium">Account</div>
        <h1 className="text-3xl font-bold text-aw-text tracking-tight">Profile</h1>
      </div>

      {saved && (
        <div className="border border-green-200 bg-green-50 text-aw-green text-sm rounded-lg px-4 py-3 mb-6">
          Profile saved.
        </div>
      )}

      {/* Identity */}
      <div className="border border-aw-border rounded-xl p-8 mb-6">
        <div className="flex items-center gap-5 mb-8">
          <Avatar src={avatarSrc} name={name} size={56} />
          <div>
            <div className="text-aw-text font-semibold text-lg">{name}</div>
            <div className="text-aw-muted text-sm">{email}</div>
          </div>
        </div>

        <div className="divide-y divide-aw-border">
          <div className="py-3 flex justify-between text-sm">
            <span className="text-aw-muted">Signed in with</span>
            <span className="text-aw-text capitalize">{provider ?? "—"}</span>
          </div>
          <div className="py-3 flex justify-between text-sm">
            <span className="text-aw-muted">Member since</span>
            <span className="text-aw-text">{joinedAt}</span>
          </div>
        </div>
      </div>

      {/* GitHub link */}
      <div className="border border-aw-border rounded-xl p-8 mb-6">
        <h2 className="text-aw-text font-semibold mb-1">GitHub</h2>
        <p className="text-aw-muted text-sm mb-5">
          Link your GitHub profile so others can find your assets and repos.
          {provider === "github" && (
            <span className="text-aw-green"> Auto-filled from your GitHub sign-in.</span>
          )}
        </p>
        <form action={updateProfile} className="flex gap-3">
          <input
            name="github_url"
            type="url"
            defaultValue={profile?.github_url ?? ""}
            placeholder="https://github.com/yourusername"
            className="flex-1 border border-aw-border rounded-lg px-3 py-2.5 text-sm text-aw-text bg-white placeholder:text-aw-muted focus:outline-none focus:border-aw-text transition-colors"
          />
          <button
            type="submit"
            className="text-sm font-medium bg-aw-text text-white px-4 py-2.5 rounded-lg hover:bg-aw-accent-hover transition-colors flex-shrink-0"
          >
            Save
          </button>
        </form>
      </div>

      {/* Forum activity — threads */}
      <div className="border border-aw-border rounded-xl p-8 mb-6">
        <h2 className="text-aw-text font-semibold mb-4">Your threads</h2>
        {!userThreads?.length ? (
          <p className="text-aw-muted text-sm">No threads yet.</p>
        ) : (
          <div className="divide-y divide-aw-border">
            {userThreads.map((t) => (
              <Link
                key={t.id}
                href={`/forum/${t.category}/${t.id}`}
                className="py-3 flex items-start justify-between gap-4 hover:bg-aw-surface -mx-2 px-2 rounded transition-colors group"
              >
                <span className="text-aw-text text-sm group-hover:underline underline-offset-2 truncate">{t.title}</span>
                <span className="text-aw-muted text-xs shrink-0">
                  {new Date(t.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                </span>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Forum activity — replies */}
      <div className="border border-aw-border rounded-xl p-8 mb-6">
        <h2 className="text-aw-text font-semibold mb-4">Your replies</h2>
        {!userReplies?.length ? (
          <p className="text-aw-muted text-sm">No replies yet.</p>
        ) : (
          <div className="divide-y divide-aw-border">
            {userReplies.map((r) => {
              const thread = Array.isArray(r.threads) ? r.threads[0] : r.threads;
              if (!thread) return null;
              const preview = r.body
                .replace(/\[\]\(aw-ref:[0-9a-f-]+\)/g, "")
                .replace(/[#*`>_~\[\]!]/g, "")
                .trim()
                .slice(0, 80);
              return (
                <Link
                  key={r.id}
                  href={`/forum/${thread.category}/${thread.id}#reply-${r.id}`}
                  className="py-3 flex flex-col gap-0.5 hover:bg-aw-surface -mx-2 px-2 rounded transition-colors group"
                >
                  <span className="text-aw-muted text-xs">
                    in <span className="text-aw-text group-hover:underline underline-offset-2">{thread.title}</span>
                  </span>
                  <span className="text-aw-muted text-xs truncate italic">{preview}</span>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
