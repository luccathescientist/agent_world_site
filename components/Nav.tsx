import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { signOut } from "@/app/auth/actions";

const links = [
  { href: "/install", label: "Install" },
  { href: "/changelog", label: "Changelog" },
  { href: "/worlds", label: "Worlds" },
  { href: "/forum", label: "Forum" },
];

export default async function Nav() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <nav className="border-b border-aw-border bg-white sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
        <Link href="/" className="font-semibold text-aw-text tracking-tight text-sm">
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
          <a
            href="https://github.com/luccathescientist/agent_world"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-aw-text transition-colors"
          >
            GitHub
          </a>
          {user ? (
            <div className="flex items-center gap-3">
              <Link
                href="/profile"
                className="text-aw-text font-medium hover:text-aw-muted transition-colors"
              >
                {user.user_metadata?.name ?? user.email?.split("@")[0] ?? "Profile"}
              </Link>
              <form action={signOut}>
                <button
                  type="submit"
                  className="text-aw-muted hover:text-aw-text transition-colors"
                >
                  Sign out
                </button>
              </form>
            </div>
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
