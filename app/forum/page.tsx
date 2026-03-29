import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Forum — Agent World",
};

const categories = [
  { name: "General", description: "Discussion about Agent World" },
  { name: "Show & Tell", description: "Share your office layouts and setups" },
  { name: "Sprites & Assets", description: "Custom sprites, tilesets, and configs" },
  { name: "Feature Requests", description: "Ideas for what to build next" },
  { name: "Installation Help", description: "Troubleshooting and setup questions" },
];

export default async function ForumPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <div className="mb-10">
        <div className="text-aw-muted text-xs uppercase tracking-widest mb-3 font-medium">Community</div>
        <h1 className="text-3xl font-bold text-aw-text mb-4 tracking-tight">Forum</h1>
        <p className="text-aw-muted leading-relaxed">
          Ask questions, share your setup, and talk about what you&apos;re building.
        </p>
      </div>

      <div className="border border-aw-border rounded-xl p-8 mb-6 text-center">
        {user ? (
          <p className="text-aw-muted text-sm">
            Threaded discussions are coming soon. You&apos;re signed in as{" "}
            <span className="text-aw-text font-medium">{user.email}</span>.
          </p>
        ) : (
          <>
            <p className="text-aw-muted mb-4 text-sm">
              Forum accounts require Google sign-in. Discussions are coming soon.
            </p>
            <Link
              href="/login"
              className="text-sm font-medium bg-aw-text text-white px-5 py-2.5 rounded-lg hover:bg-aw-accent-hover transition-colors"
            >
              Sign in
            </Link>
          </>
        )}
      </div>

      <div className="divide-y divide-aw-border border border-aw-border rounded-xl overflow-hidden opacity-50">
        {categories.map((cat) => (
          <div key={cat.name} className="px-5 py-4 flex items-center justify-between">
            <div>
              <div className="text-aw-text text-sm font-medium">{cat.name}</div>
              <div className="text-aw-muted text-xs mt-0.5">{cat.description}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
