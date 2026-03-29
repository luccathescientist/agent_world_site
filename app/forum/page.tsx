import type { Metadata } from "next";

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

export default function ForumPage() {
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
        <p className="text-aw-muted mb-4 text-sm">
          Forum accounts require Google sign-in. Community features are coming soon.
        </p>
        <button
          disabled
          className="text-sm font-medium bg-aw-surface border border-aw-border text-aw-muted px-5 py-2.5 rounded-lg cursor-not-allowed"
        >
          Sign in with Google — coming soon
        </button>
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
