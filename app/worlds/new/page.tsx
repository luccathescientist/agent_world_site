import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { createWorld } from "@/app/worlds/actions";

export const metadata: Metadata = {
  title: "Share a World — Agent World",
};

const errorMessages: Record<string, string> = {
  title_required: "A title is required.",
  invalid_json: "The game_state.json file could not be parsed. Make sure it's valid JSON.",
  save_failed: "Something went wrong saving your world. Please try again.",
};

export default async function NewWorldPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/");

  const { error } = await searchParams;

  return (
    <div className="max-w-2xl mx-auto px-6 py-16">
      <div className="mb-10">
        <div className="text-aw-muted text-xs uppercase tracking-widest mb-3 font-medium">Community</div>
        <h1 className="text-3xl font-bold text-aw-text tracking-tight mb-2">Share your world</h1>
        <p className="text-aw-muted leading-relaxed">
          Upload your office layout and a screenshot so others can see what you&apos;ve built.
        </p>
      </div>

      {error && (
        <div className="border border-red-200 bg-red-50 text-aw-red text-sm rounded-lg px-4 py-3 mb-6">
          {errorMessages[error] ?? "An unexpected error occurred."}
        </div>
      )}

      <form action={createWorld} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-aw-text mb-1.5" htmlFor="title">
            Title <span className="text-aw-red">*</span>
          </label>
          <input
            id="title"
            name="title"
            type="text"
            required
            placeholder="My Agent World"
            className="w-full border border-aw-border rounded-lg px-3 py-2.5 text-sm text-aw-text bg-white placeholder:text-aw-muted focus:outline-none focus:border-aw-text transition-colors"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-aw-text mb-1.5" htmlFor="description">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            rows={3}
            placeholder="What's interesting about your setup?"
            className="w-full border border-aw-border rounded-lg px-3 py-2.5 text-sm text-aw-text bg-white placeholder:text-aw-muted focus:outline-none focus:border-aw-text transition-colors resize-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-aw-text mb-1.5" htmlFor="screenshot">
            Screenshot
          </label>
          <input
            id="screenshot"
            name="screenshot"
            type="file"
            accept="image/png,image/jpeg,image/gif,image/webp"
            className="w-full border border-aw-border rounded-lg px-3 py-2.5 text-sm text-aw-muted bg-white file:mr-3 file:border-0 file:bg-aw-surface file:text-aw-text file:text-xs file:font-medium file:px-3 file:py-1 file:rounded file:cursor-pointer"
          />
          <p className="text-aw-muted text-xs mt-1.5">PNG, JPG, GIF or WebP. Take a screenshot of your world canvas.</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-aw-text mb-1.5" htmlFor="game_state">
            game_state.json
          </label>
          <input
            id="game_state"
            name="game_state"
            type="file"
            accept=".json,application/json"
            className="w-full border border-aw-border rounded-lg px-3 py-2.5 text-sm text-aw-muted bg-white file:mr-3 file:border-0 file:bg-aw-surface file:text-aw-text file:text-xs file:font-medium file:px-3 file:py-1 file:rounded file:cursor-pointer"
          />
          <p className="text-aw-muted text-xs mt-1.5">
            Found at <code className="text-aw-code-text bg-aw-code-bg px-1 rounded">assets/tiles/office_world/game_state.json</code> in your Agent World directory.
          </p>
        </div>

        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            className="text-sm font-medium bg-aw-text text-white px-5 py-2.5 rounded-lg hover:bg-aw-accent-hover transition-colors"
          >
            Share world
          </button>
          <a
            href="/worlds"
            className="text-sm font-medium border border-aw-border text-aw-muted px-5 py-2.5 rounded-lg hover:bg-aw-surface transition-colors"
          >
            Cancel
          </a>
        </div>
      </form>
    </div>
  );
}
