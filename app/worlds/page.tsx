import type { Metadata } from "next";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { Pagination } from "@/components/Pagination";
import type { World } from "@/lib/types";

export const metadata: Metadata = {
  title: "Worlds — Agent World",
};

const PAGE_SIZE = 18; // divisible by 2 and 3 for the grid

export default async function WorldsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page: pageParam } = await searchParams;
  const page = Math.max(1, parseInt(pageParam ?? "1", 10) || 1);
  const from = (page - 1) * PAGE_SIZE;
  const to = from + PAGE_SIZE - 1;

  const supabase = await createClient();
  const [
    { data: { user } },
    { data: worlds, count },
  ] = await Promise.all([
    supabase.auth.getUser(),
    supabase
      .from("worlds")
      .select("*", { count: "exact" })
      .order("created_at", { ascending: false })
      .range(from, to),
  ]);

  const total = count ?? 0;

  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <div className="flex items-start justify-between mb-10">
        <div>
          <div className="text-aw-muted text-xs uppercase tracking-widest mb-3 font-medium">Community</div>
          <h1 className="text-3xl font-bold text-aw-text tracking-tight mb-2">Worlds</h1>
          <p className="text-aw-muted leading-relaxed max-w-xl">
            Browse office layouts and agent world configurations shared by the community.
          </p>
        </div>
        {user && (
          <Link
            href="/worlds/new"
            className="flex-shrink-0 text-sm font-medium bg-aw-text text-white px-4 py-2.5 rounded-lg hover:bg-aw-accent-hover transition-colors"
          >
            Share your world
          </Link>
        )}
      </div>

      {!worlds || worlds.length === 0 ? (
        <div className="border border-aw-border rounded-xl p-16 text-center">
          <p className="text-aw-muted mb-6 text-sm">No worlds shared yet. Be the first.</p>
          {user ? (
            <Link
              href="/worlds/new"
              className="text-sm font-medium bg-aw-text text-white px-5 py-2.5 rounded-lg hover:bg-aw-accent-hover transition-colors"
            >
              Share your world →
            </Link>
          ) : (
            <p className="text-aw-muted text-sm">Sign in to share your world.</p>
          )}
        </div>
      ) : (
        <>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {(worlds as World[]).map((world) => (
              <Link
                key={world.id}
                href={`/worlds/${world.id}`}
                className="border border-aw-border rounded-xl overflow-hidden hover:border-aw-muted transition-colors group"
              >
                <div className="aspect-video bg-aw-surface overflow-hidden">
                  {world.screenshot_url ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={world.screenshot_url}
                      alt={world.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      style={{ imageRendering: "pixelated" }}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-aw-muted text-sm">
                      No screenshot
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <div className="text-aw-text font-semibold text-sm mb-1 truncate">{world.title}</div>
                  {world.description && (
                    <div className="text-aw-muted text-xs line-clamp-2">{world.description}</div>
                  )}
                  <div className="text-aw-muted text-xs mt-3">
                    {new Date(world.created_at).toLocaleDateString("en-US", {
                      month: "short", day: "numeric", year: "numeric",
                    })}
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <Pagination page={page} total={total} pageSize={PAGE_SIZE} basePath="/worlds" />
        </>
      )}
    </div>
  );
}
