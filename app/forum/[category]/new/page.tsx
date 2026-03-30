import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { getCategory } from "@/lib/forum";
import { createThread } from "@/app/forum/actions";
import { MarkdownEditor } from "@/components/MarkdownEditor";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await params;
  const cat = getCategory(category);
  return { title: cat ? `New thread — ${cat.name} — Agent World` : "Forum — Agent World" };
}

export default async function NewThreadPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const cat = getCategory(category);
  if (!cat) notFound();

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <div className="mb-6">
        <Link href={`/forum/${cat.slug}`} className="text-sm text-aw-muted hover:text-aw-text transition-colors">
          ← {cat.name}
        </Link>
      </div>

      <h1 className="text-2xl font-bold text-aw-text tracking-tight mb-8">New thread</h1>

      <form action={createThread} className="space-y-5">
        <input type="hidden" name="category" value={cat.slug} />

        <div>
          <label className="block text-sm font-medium text-aw-text mb-1.5">Title</label>
          <input
            name="title"
            type="text"
            required
            placeholder="What's this about?"
            className="w-full border border-aw-border rounded-lg px-3 py-2.5 text-sm text-aw-text bg-aw-bg placeholder:text-aw-muted focus:outline-none focus:border-aw-text transition-colors"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-aw-text mb-1.5">Body</label>
          <MarkdownEditor name="body" placeholder="Write your post... Markdown supported." rows={10} required />
        </div>

        <div className="flex gap-3">
          <button
            type="submit"
            className="text-sm font-medium bg-aw-text text-aw-bg px-5 py-2.5 rounded-lg hover:bg-aw-accent-hover transition-colors"
          >
            Post thread
          </button>
          <Link
            href={`/forum/${cat.slug}`}
            className="text-sm text-aw-muted border border-aw-border px-5 py-2.5 rounded-lg hover:bg-aw-surface transition-colors"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
