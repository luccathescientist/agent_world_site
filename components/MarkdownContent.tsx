"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export function MarkdownContent({ body }: { body: string }) {
  return (
    <div className="prose prose-sm max-w-none text-aw-text prose-headings:text-aw-text prose-a:text-aw-text prose-a:underline prose-blockquote:border-aw-border prose-blockquote:text-aw-muted prose-code:text-aw-text prose-code:bg-aw-surface prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:before:content-none prose-code:after:content-none prose-pre:bg-aw-surface prose-pre:border prose-pre:border-aw-border">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{body}</ReactMarkdown>
    </div>
  );
}
