import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { signOut } from "@/app/auth/actions";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Profile — Agent World",
};

export default async function ProfilePage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/");

  const name = user.user_metadata?.name ?? "—";
  const email = user.email ?? "—";
  const avatar = user.user_metadata?.avatar_url as string | undefined;
  const joinedAt = new Date(user.created_at).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="max-w-2xl mx-auto px-6 py-16">
      <div className="mb-10">
        <div className="text-aw-muted text-xs uppercase tracking-widest mb-3 font-medium">Account</div>
        <h1 className="text-3xl font-bold text-aw-text tracking-tight">Profile</h1>
      </div>

      <div className="border border-aw-border rounded-xl p-8 mb-6">
        <div className="flex items-center gap-5 mb-8">
          {avatar ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={avatar}
              alt={name}
              className="w-14 h-14 rounded-full border border-aw-border"
            />
          ) : (
            <div className="w-14 h-14 rounded-full bg-aw-surface border border-aw-border flex items-center justify-center text-aw-muted text-xl font-bold">
              {name[0]?.toUpperCase() ?? "?"}
            </div>
          )}
          <div>
            <div className="text-aw-text font-semibold text-lg">{name}</div>
            <div className="text-aw-muted text-sm">{email}</div>
          </div>
        </div>

        <div className="divide-y divide-aw-border">
          <div className="py-3 flex justify-between text-sm">
            <span className="text-aw-muted">Member since</span>
            <span className="text-aw-text">{joinedAt}</span>
          </div>
          <div className="py-3 flex justify-between text-sm">
            <span className="text-aw-muted">Worlds shared</span>
            <span className="text-aw-text">0</span>
          </div>
          <div className="py-3 flex justify-between text-sm">
            <span className="text-aw-muted">Forum posts</span>
            <span className="text-aw-text">0</span>
          </div>
        </div>
      </div>

      <form action={signOut}>
        <button
          type="submit"
          className="text-sm text-aw-muted border border-aw-border px-4 py-2 rounded-lg hover:bg-aw-surface transition-colors"
        >
          Sign out
        </button>
      </form>
    </div>
  );
}
