import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Worlds — Agent World",
};

export default function WorldsPage() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <div className="mb-10">
        <div className="text-aw-muted text-xs uppercase tracking-widest mb-3 font-medium">Community</div>
        <h1 className="text-3xl font-bold text-aw-text mb-4 tracking-tight">Worlds</h1>
        <p className="text-aw-muted max-w-xl leading-relaxed">
          Browse office layouts, tilemap configurations, and agent worlds
          shared by the community.
        </p>
      </div>

      <div className="border border-aw-border rounded-xl p-16 text-center">
        <p className="text-aw-muted mb-6 text-sm">
          Community sharing is coming soon. Sign in with Google to be notified when it launches.
        </p>
        <Link
          href="/forum"
          className="text-sm font-medium border border-aw-border text-aw-text px-5 py-2.5 rounded-lg hover:bg-aw-surface transition-colors"
        >
          Discuss in the forum →
        </Link>
      </div>
    </div>
  );
}
