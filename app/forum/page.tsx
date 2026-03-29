import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Forum — Agent World",
};

const categories = [
  { icon: "◆", name: "General", description: "Discussion about Agent World" },
  { icon: "◈", name: "Show & Tell", description: "Share your office layouts and setups" },
  { icon: "◇", name: "Sprites & Assets", description: "Custom sprites, tilesets, and configs" },
  { icon: "◉", name: "Feature Requests", description: "Ideas for what to build next" },
  { icon: "◎", name: "Installation Help", description: "Troubleshooting and setup questions" },
];

export default function ForumPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <div className="mb-10">
        <div className="text-aw-gold text-xs uppercase tracking-widest mb-3">Community</div>
        <h1 className="text-3xl font-bold text-aw-text mb-4">Forum</h1>
        <p className="text-aw-muted">
          Ask questions, share your setup, and talk about what you&apos;re building.
        </p>
      </div>

      <div className="border border-aw-border bg-aw-surface rounded-lg p-8 mb-8 text-center">
        <p className="text-aw-muted mb-4 text-sm">
          Forum accounts require Google sign-in. Community features are coming soon.
        </p>
        <button
          disabled
          className="text-sm bg-aw-gold/20 text-aw-gold/50 font-semibold px-6 py-2 rounded cursor-not-allowed"
        >
          Sign in with Google (coming soon)
        </button>
      </div>

      <div className="space-y-3">
        {categories.map((cat) => (
          <div
            key={cat.name}
            className="border border-aw-border bg-aw-surface rounded-lg px-5 py-4 flex items-center gap-4 opacity-60"
          >
            <span className="text-aw-gold text-lg flex-shrink-0">{cat.icon}</span>
            <div>
              <div className="text-aw-text text-sm font-semibold">{cat.name}</div>
              <div className="text-aw-muted text-xs">{cat.description}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
