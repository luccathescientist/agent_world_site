"use client";

export function QuoteButton({ authorName, body }: { authorName: string; body: string }) {
  function handleQuote() {
    // Strip existing blockquotes to avoid quoting a quote
    const stripped = body
      .split("\n")
      .filter((line) => !line.startsWith(">"))
      .join("\n")
      .trim();
    const preview = stripped.length > 300 ? stripped.slice(0, 300) + "…" : stripped;
    const markdown = `> **${authorName}** wrote:\n${preview
      .split("\n")
      .map((l) => `> ${l}`)
      .join("\n")}\n\n`;

    window.dispatchEvent(new CustomEvent("aw:quote", { detail: { markdown } }));
  }

  return (
    <button
      type="button"
      onClick={handleQuote}
      className="text-xs text-aw-muted hover:text-aw-text cursor-pointer underline underline-offset-2 transition-colors"
    >
      Quote
    </button>
  );
}
