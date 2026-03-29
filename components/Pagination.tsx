import Link from "next/link";

export function Pagination({
  page,
  total,
  pageSize,
  basePath,
}: {
  page: number;
  total: number;
  pageSize: number;
  basePath: string;
}) {
  const totalPages = Math.ceil(total / pageSize);
  if (totalPages <= 1) return null;

  const href = (p: number) => `${basePath}?page=${p}`;

  return (
    <div className="flex items-center justify-between mt-6 text-sm">
      <span className="text-aw-muted text-xs">
        Page {page} of {totalPages}
      </span>
      <div className="flex gap-2">
        {page > 1 ? (
          <Link
            href={href(page - 1)}
            className="border border-aw-border px-3 py-1.5 rounded-lg text-aw-muted hover:bg-aw-surface transition-colors text-xs"
          >
            ← Prev
          </Link>
        ) : (
          <span className="border border-aw-border px-3 py-1.5 rounded-lg text-aw-border text-xs cursor-default">
            ← Prev
          </span>
        )}
        {page < totalPages ? (
          <Link
            href={href(page + 1)}
            className="border border-aw-border px-3 py-1.5 rounded-lg text-aw-muted hover:bg-aw-surface transition-colors text-xs"
          >
            Next →
          </Link>
        ) : (
          <span className="border border-aw-border px-3 py-1.5 rounded-lg text-aw-border text-xs cursor-default">
            Next →
          </span>
        )}
      </div>
    </div>
  );
}
