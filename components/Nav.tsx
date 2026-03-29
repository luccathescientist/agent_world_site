import Link from "next/link";

const links = [
  { href: "/install", label: "Install" },
  { href: "/changelog", label: "Changelog" },
  { href: "/worlds", label: "Worlds" },
  { href: "/forum", label: "Forum" },
];

export default function Nav() {
  return (
    <nav className="border-b border-aw-border bg-white sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
        <Link href="/" className="font-semibold text-aw-text tracking-tight text-sm">
          Agent World
        </Link>
        <div className="flex items-center gap-6 text-sm text-aw-muted">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="hover:text-aw-text transition-colors"
            >
              {l.label}
            </Link>
          ))}
          <a
            href="https://github.com/luccathescientist/agent_world"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-aw-text transition-colors"
          >
            GitHub
          </a>
        </div>
      </div>
    </nav>
  );
}
