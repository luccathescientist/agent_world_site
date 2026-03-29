export function Avatar({
  src,
  name,
  size = 32,
}: {
  src?: string | null;
  name: string;
  size?: number;
}) {
  const style = { width: size, height: size, fontSize: Math.round(size * 0.4) };

  if (src) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        alt={name}
        className="rounded-full border border-aw-border flex-shrink-0 object-cover"
        style={style}
      />
    );
  }

  return (
    <div
      className="rounded-full bg-aw-surface border border-aw-border flex items-center justify-center text-aw-muted font-bold flex-shrink-0"
      style={style}
    >
      {name[0]?.toUpperCase() ?? "?"}
    </div>
  );
}

/** Derive a GitHub avatar URL from a stored github_url profile field. */
export function githubAvatar(githubUrl: string | null | undefined): string | null {
  if (!githubUrl) return null;
  const username = githubUrl.replace("https://github.com/", "").replace(/\/$/, "");
  if (!username) return null;
  return `https://github.com/${username}.png?size=80`;
}
