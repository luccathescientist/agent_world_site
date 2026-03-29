import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import Link from "next/link";
import { deleteWorld } from "@/app/worlds/actions";
import type { World } from "@/lib/types";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const supabase = await createClient();
  const { data } = await supabase.from("worlds").select("title").eq("id", id).single();
  return { title: data ? `${data.title} — Agent World` : "World — Agent World" };
}

export default async function WorldDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: world } = await supabase
    .from("worlds")
    .select("*, profiles(github_url)")
    .eq("id", id)
    .single();

  if (!world) notFound();

  const { data: { user } } = await supabase.auth.getUser();
  const isOwner = user?.id === (world as World).user_id;

  const w = world as World & { profiles: { github_url: string | null } | null };
  const githubUrl = w.profiles?.github_url ?? null;
  const createdAt = new Date(w.created_at).toLocaleDateString("en-US", {
    year: "numeric", month: "long", day: "numeric",
  });

  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <div className="mb-6">
        <Link href="/worlds" className="text-sm text-aw-muted hover:text-aw-text transition-colors">
          ← Worlds
        </Link>
      </div>

      {w.screenshot_url && (
        <div className="border border-aw-border rounded-xl overflow-hidden mb-8">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={w.screenshot_url}
            alt={w.title}
            className="w-full"
            style={{ imageRendering: "pixelated" }}
          />
        </div>
      )}

      <div className="mb-8">
        <h1 className="text-2xl font-bold text-aw-text tracking-tight mb-2">{w.title}</h1>
        {w.description && (
          <p className="text-aw-muted leading-relaxed">{w.description}</p>
        )}
        <div className="flex items-center gap-4 mt-3">
          <span className="text-aw-muted text-xs">Shared {createdAt}</span>
          {githubUrl && (
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-aw-muted hover:text-aw-text transition-colors underline underline-offset-2"
            >
              {githubUrl.replace("https://github.com/", "@")}
            </a>
          )}
        </div>
      </div>

      <div className="flex gap-3">
        {isOwner && (
          <form action={deleteWorld.bind(null, w.id)}>
            <button
              type="submit"
              className="text-sm text-aw-muted border border-aw-border px-4 py-2.5 rounded-lg hover:bg-red-50 hover:text-aw-red hover:border-red-200 transition-colors"
            >
              Delete
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
