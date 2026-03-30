import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { UserMenu } from "./UserMenu";
import { githubAvatar } from "./Avatar";

const links = [
  { href: "/install", label: "Install" },
  { href: "/worlds", label: "Worlds" },
  { href: "/forum", label: "Forum" },
];

function PixelCharIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="none" aria-hidden="true">
      <rect x="4" y="0" width="8" height="6" fill="currentColor"/>
      <rect x="5" y="2" width="2" height="2" fill="white"/>
      <rect x="9" y="2" width="2" height="2" fill="white"/>
      <rect x="3" y="7" width="10" height="5" fill="currentColor"/>
      <rect x="3" y="13" width="4" height="3" fill="currentColor"/>
      <rect x="9" y="13" width="4" height="3" fill="currentColor"/>
    </svg>
  );
}

export default async function Nav() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  let avatarSrc: string | null = null;
  let unreadMessages = 0;
  if (user) {
    const [{ data: profile }, { count }] = await Promise.all([
      supabase.from("profiles").select("github_url").eq("id", user.id).single(),
      supabase
        .from("direct_messages")
        .select("id", { count: "exact", head: true })
        .eq("recipient_id", user.id)
        .is("read_at", null),
    ]);
    avatarSrc =
      githubAvatar(profile?.github_url) ??
      (user.user_metadata?.avatar_url as string | null) ??
      null;
    unreadMessages = count ?? 0;
  }

  const name =
    user?.user_metadata?.name ??
    user?.user_metadata?.user_name ??
    user?.email?.split("@")[0] ??
    "Profile";

  return (
    <nav className="border-b border-aw-border bg-white sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-semibold text-aw-text tracking-tight text-sm">
          <PixelCharIcon />
          Agent World
        </Link>
        <div className="flex items-center gap-6 text-sm text-aw-muted">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="hover:text-aw-text transition-colors"
            >
              {l.label}
            </Link>
          ))}
          {user ? (
            <>
              <Link href="/messages" className="relative hover:text-aw-text transition-colors">
                Messages
                {unreadMessages > 0 && (
                  <span className="absolute -top-1.5 -right-3 text-[10px] font-bold bg-aw-text text-white rounded-full w-4 h-4 flex items-center justify-center leading-none">
                    {unreadMessages > 9 ? "9+" : unreadMessages}
                  </span>
                )}
              </Link>
              <UserMenu name={name} avatarSrc={avatarSrc} />
            </>
          ) : (
            <Link
              href="/login"
              className="text-sm font-medium bg-aw-text text-white px-3 py-1.5 rounded-lg hover:bg-aw-accent-hover transition-colors"
            >
              Sign in
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
