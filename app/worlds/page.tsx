import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Worlds — Agent World",
};

export default function WorldsPage() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <div className="mb-10">
        <div className="text-aw-gold text-xs uppercase tracking-widest mb-3">Community</div>
        <h1 className="text-3xl font-bold text-aw-text mb-4">Worlds</h1>
        <p className="text-aw-muted max-w-xl">
          Browse office layouts, tilemap configurations, and agent worlds
          shared by the community.
        </p>
      </div>

      <div className="border border-aw-border bg-aw-surface rounded-lg p-12 text-center">
        <div className="text-4xl mb-4 text-aw-border">◈</div>
        <p className="text-aw-muted mb-6">
          Community sharing is coming soon. Sign in with Google to be notified
          when it launches.
        </p>
        <Link
          href="/forum"
          className="text-aw-gold text-sm border border-aw-gold/40 px-5 py-2 rounded hover:bg-aw-gold/10 transition-colors"
        >
          Discuss in the forum →
        </Link>
      </div>
    </div>
  );
}
