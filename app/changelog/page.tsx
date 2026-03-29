import type { Metadata } from "next";
import { releases, type ReleaseStatus } from "@/lib/changelog";

export const metadata: Metadata = {
  title: "Changelog — Agent World",
};

const statusConfig: Record<ReleaseStatus, { label: string; color: string }> = {
  complete: { label: "shipped", color: "text-aw-green border-aw-green/40 bg-aw-green/5" },
  "in-progress": { label: "in progress", color: "text-aw-gold border-aw-gold/40 bg-aw-gold/5" },
  planned: { label: "planned", color: "text-aw-muted border-aw-border bg-transparent" },
};

export default function ChangelogPage() {
  return (
    <div className="max-w-2xl mx-auto px-6 py-16">
      <div className="mb-12">
        <div className="text-aw-gold text-xs uppercase tracking-widest mb-3">Changelog</div>
        <h1 className="text-3xl font-bold text-aw-text mb-4">Release history</h1>
        <p className="text-aw-muted">
          Agent World follows a milestone-based release model. Each version ships
          a focused set of capabilities.
        </p>
      </div>

      <div className="space-y-8">
        {releases.map((release) => {
          const status = statusConfig[release.status];
          return (
            <div
              key={release.version}
              className="border border-aw-border bg-aw-surface rounded-lg p-6"
            >
              <div className="flex items-start justify-between mb-3 gap-4">
                <div>
                  <span className="text-aw-gold font-mono font-bold text-sm mr-3">
                    {release.version}
                  </span>
                  <span className="text-aw-text font-semibold">{release.title}</span>
                </div>
                <span
                  className={`text-xs border px-2 py-0.5 rounded flex-shrink-0 ${status.color}`}
                >
                  {status.label}
                </span>
              </div>
              <p className="text-aw-muted text-sm mb-4">{release.summary}</p>
              {release.status === "complete" && (
                <ul className="space-y-1">
                  {release.highlights.map((h) => (
                    <li key={h} className="flex items-start gap-2 text-sm text-aw-muted">
                      <span className="text-aw-gold mt-0.5 flex-shrink-0">◆</span>
                      {h}
                    </li>
                  ))}
                </ul>
              )}
              {release.status === "planned" && (
                <ul className="space-y-1">
                  {release.highlights.map((h) => (
                    <li key={h} className="flex items-start gap-2 text-sm text-aw-muted/60">
                      <span className="text-aw-border mt-0.5 flex-shrink-0">◇</span>
                      {h}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
