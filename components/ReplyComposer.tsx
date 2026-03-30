"use client";

import { useEffect, useState } from "react";
import { MarkdownEditor } from "./MarkdownEditor";
import { createReply } from "@/app/forum/actions";
import type { CategorySlug } from "@/lib/forum";

export function ReplyComposer({
  threadId,
  category,
}: {
  threadId: string;
  category: CategorySlug;
}) {
  const [key, setKey] = useState(0);
  const [defaultValue, setDefaultValue] = useState("");

  useEffect(() => {
    const handler = (e: Event) => {
      const { markdown } = (e as CustomEvent<{ markdown: string }>).detail;
      setDefaultValue(markdown);
      setKey((k) => k + 1);
      document.getElementById("reply-composer")?.scrollIntoView({ behavior: "smooth", block: "center" });
    };
    window.addEventListener("aw:quote", handler);
    return () => window.removeEventListener("aw:quote", handler);
  }, []);

  async function submitReply(formData: FormData) {
    await createReply(threadId, category, formData);
    setDefaultValue("");
    setKey((k) => k + 1);
  }

  return (
    <form id="reply-composer" action={submitReply} className="space-y-4">
      <MarkdownEditor
        key={key}
        name="body"
        defaultValue={defaultValue}
        placeholder="Write a reply... Markdown supported."
        rows={6}
        required
      />
      <button
        type="submit"
        className="text-sm font-medium bg-aw-text text-aw-bg px-5 py-2.5 rounded-lg hover:bg-aw-accent-hover transition-colors"
      >
        Post reply
      </button>
    </form>
  );
}
