import type { Metadata } from "next";
import { releases, type ReleaseStatus } from "@/lib/changelog";

export const metadata: Metadata = {
  title: "Changelog — Agent World",
};

const statusConfig: Record<ReleaseStatus, { label: string; classes: string }> = {
  complete:     { label: "shipped",      classes: "text-aw-green bg-green-50 border-green-200" },
  "in-progress":{ label: "in progress",  classes: "text-amber-600 bg-amber-50 border-amber-200" },
  planned:      { label: "planned",      classes: "text-aw-muted bg-aw-surface border-aw-border" },
};

export default function ChangelogPage() {
  return (
    <div className="max-w-2xl mx-auto px-6 py-16">
      <div className="mb-12">
        <div className="text-aw-muted text-xs uppercase tracking-widest mb-3 font-medium">Changelog</div>
        <h1 className="text-3xl font-bold text-aw-text mb-4 tracking-tight">Release history</h1>
        <p className="text-aw-muted leading-relaxed">
          Agent World follows a milestone-based release model. Each version ships
          a focused set of capabilities.
        </p>
      </div>

      <div className="space-y-4">
        {releases.map((release) => {
          const status = statusConfig[release.status];
          return (
            <div key={release.version} className="border border-aw-border rounded-xl p-6">
              <div className="flex items-start justify-between mb-3 gap-4">
                <div className="flex items-center gap-3">
                  <span className="text-aw-text font-mono font-bold text-sm">{release.version}</span>
                  <span className="text-aw-text font-semibold">{release.title}</span>
                </div>
                <span className={`text-xs border px-2 py-0.5 rounded-full flex-shrink-0 ${status.classes}`}>
                  {status.label}
                </span>
              </div>
              <p className="text-aw-muted text-sm mb-4">{release.summary}</p>
              <ul className="space-y-1.5">
                {release.highlights.map((h) => (
                  <li key={h} className={`flex items-start gap-2 text-sm ${release.status === "planned" ? "text-aw-muted/60" : "text-aw-muted"}`}>
                    <span className={`mt-0.5 flex-shrink-0 font-bold ${release.status === "complete" ? "text-aw-green" : "text-aw-border"}`}>
                      {release.status === "complete" ? "✓" : "·"}
                    </span>
                    {h}
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
}
