"use client";

export function QuoteButton({
  replyId,
  authorName,
  body,
}: {
  replyId: string;
  authorName: string;
  body: string;
}) {
  function handleQuote() {
    // Strip existing blockquotes and aw-ref markers to avoid nested quoting
    const stripped = body
      .split("\n")
      .filter((line) => !line.startsWith(">"))
      .join("\n")
      .replace(/\[\]\(aw-ref:[0-9a-f-]+\)/g, "")
      .trim();
    const preview = stripped.length > 300 ? stripped.slice(0, 300) + "…" : stripped;
    // Embed reply ID so the server can detect if the original was later edited
    const markdown = `[](aw-ref:${replyId})\n> **${authorName}** wrote:\n${preview
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
