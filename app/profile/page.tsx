import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { signOut } from "@/app/auth/actions";
import { updateProfile } from "@/app/profile/actions";
import { redirect } from "next/navigation";

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

  const { data: profile } = await supabase
    .from("profiles")
    .select("github_url")
    .eq("id", user.id)
    .single();

  const { saved } = await searchParams;

  const name = user.user_metadata?.name ?? user.user_metadata?.user_name ?? "—";
  const email = user.email ?? "—";
  const avatar = user.user_metadata?.avatar_url as string | undefined;
  const provider = user.app_metadata?.provider as string | undefined;
  const joinedAt = new Date(user.created_at).toLocaleDateString("en-US", {
    year: "numeric", month: "long", day: "numeric",
  });

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
          {avatar ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={avatar} alt={name} className="w-14 h-14 rounded-full border border-aw-border" />
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
